"""Demostración local de inferencia: ejecuta el regresor seleccionado fuera de Jupyter."""
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs
import html
import json
import os
import numpy as np
import pandas as pd
import joblib

RUTA = Path(os.environ.get("PFI_MODELO", Path(__file__).resolve().parent / "artefactos_modelo" / "modelo_final.joblib"))
if not RUTA.exists():
    raise FileNotFoundError("Modelo no encontrado. Configurar variable PFI_MODELO con ruta local al modelo_final.joblib")
# Cargar SOLO artefactos creados en el entorno institucional confiable.
obj = joblib.load(RUTA)
modelo, features, ref = obj["modelo"], obj["features"], obj["referencia_2024"]
referencias = ref.loc[(ref["N_REFERENCIA"] >= 20) & ref["P50_REF"].notna()].copy()
referencias = referencias.reset_index(drop=True)
if referencias.empty:
    raise RuntimeError("El modelo no tiene GRD con referencias elegibles.")

def vista(resultado="", error=""):
    opciones = "".join(f'<option value="{i}">{html.escape(str(r.GRD))[:70]} · severidad {r.SEVERIDAD} (N={int(r.N_REFERENCIA)})</option>'
                      for i,r in referencias.head(300).iterrows())
    return f"""<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Estimación de estancia · Inferencia en vivo</title><style>
body{{font:16px/1.5 system-ui,Arial;background:#071420;color:#f4f8fa;margin:0;padding:30px}}
main{{max-width:780px;margin:auto}} h1{{font-size:35px}} small,p{{color:#b8ceda}}
form,.card{{background:#102b3b;border:1px solid #284858;border-radius:14px;padding:22px;margin:16px 0}}
label{{display:block;margin:12px 0 5px;color:#b8ceda}}
input,select,button{{width:100%;border-radius:8px;padding:12px;font:inherit}}
input,select{{background:#173c4d;border:1px solid #3b6676;color:white}}
button{{background:#73dec9;border:0;font-weight:800;margin-top:20px;cursor:pointer;color:#072b30}}
.output{{font-size:32px;color:#73dec9;font-weight:700}} .error{{color:#ffaaa4}}
</style><main><small>MACHINE LEARNING I · REGRESIÓN</small><h1>Estimación de días restantes</h1>
<p>Inferencia real del modelo entrenado. Introduce un escenario hipotético que no haya sido usado durante entrenamiento.</p>
<form method="POST"><label>GRD y severidad</label><select name="ref" required>{opciones}</select>
<label>Edad (años)</label><input type="number" min="0" max="110" name="edad" value="50" required>
<label>Sexo</label><select name="sexo"><option>Femenino</option><option>Masculino</option></select>
<label>Día actual de hospitalización</label><input type="number" min="0" max="60" name="dia" value="3" required>
<button>Calcular predicción</button></form><div class="card"><div class="output">{html.escape(resultado)}</div>
<div class="error">{html.escape(error)}</div><p>Resultado estimativo: requiere validación prospectiva y no sustituye evaluación médica.</p></div>
<p>Servicio disponible únicamente en el computador local; no se envían datos a GitHub.</p></main></html>"""

class Aplicacion(BaseHTTPRequestHandler):
    def do_GET(self):
        b=vista().encode("utf-8");self.send_response(200);self.send_header("Content-Type","text/html; charset=utf-8");self.send_header("Content-Length",str(len(b)));self.end_headers();self.wfile.write(b)
    def do_POST(self):
        try:
            size=int(self.headers.get("Content-Length","0"))
            if size>4096: raise ValueError("Solicitud demasiado grande.")
            args=parse_qs(self.rfile.read(size).decode("utf-8"))
            i=int(args["ref"][0]);edad=float(args["edad"][0]);dia=float(args["dia"][0]);sexo=args["sexo"][0]
            if i<0 or i>=min(len(referencias),300): raise ValueError("Referencia inexistente.")
            if not 0<=edad<=110 or not 0<=dia<=60 or sexo not in ("Femenino","Masculino"): raise ValueError("Entrada fuera de rango.")
            r=referencias.iloc[i]
            fila=pd.DataFrame([{"DIA_ACTUAL":dia,"EDAD":edad,"SEXO":sexo,"GRD":r["GRD"],"SEVERIDAD":r["SEVERIDAD"],"PESO_MODELO":r["PESO_REF"],"NORMA_MODELO":r["NORMA_REF"],"P50_REF":r["P50_REF"]}])
            est=max(0.,float(modelo.predict(fila[features])[0]))
            salida=f"{est:.1f} días restantes · {est+dia:.1f} días de estancia total estimada"
            cuerpo=vista(salida)
        except Exception as e:
            cuerpo=vista(error=str(e))
        b=cuerpo.encode("utf-8");self.send_response(200);self.send_header("Content-Type","text/html; charset=utf-8");self.send_header("Content-Length",str(len(b)));self.end_headers();self.wfile.write(b)

if __name__=="__main__":
    print("Abra http://127.0.0.1:8765")
    HTTPServer(("127.0.0.1",8765),Aplicacion).serve_forever()
