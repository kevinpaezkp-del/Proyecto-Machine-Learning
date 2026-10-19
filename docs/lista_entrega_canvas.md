# Entrega a Canvas y publicación de la presentación

## Paquete Canvas · 22 de octubre, 11:59 p. m.
Entregar en **un solo archivo ZIP**, sin subcarpetas salvo `datos_crudos/`: `informe_PFI.pdf`, `resumen_ejecutivo_EN.pdf` (250–350 palabras), `cuaderno_PFI.ipynb` (ejecutado y reproducible), `ficha_datos.md`, `declaracion_IA.md`, `datos_crudos/COMO_OBTENER_LOS_DATOS.md` y los anexos `anexo_A_enfoque.md` / `anexo_B_datos_reales.md` si se reclaman bonos. Libro Excel y CSV, opcionales pero recomendables como evidencia de auditoría.

**Antes de entregar:** completar integrantes/roles, autorización institucional y declaración de IA por integrante.

## Sustentación · 24 de octubre
- PDF de la presentación antes de 6:00 a. m.
- Enlace al repositorio en el comentario de Canvas.
- Exposición 10 min, preguntas 5 min.
- Para bono de despliegue: ejecutar `app_demo.py` en equipo local junto a `modelo_final.joblib`; mostrar dos casos nuevos y explicar monitoreo y reentrenamiento.

## Activación del sitio GitHub Pages
Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. El repositorio está privado; comprobar si el plan permite Pages desde privados. No volver público sin revisar autorización para mostrar resultados agregados.

## Precauciones de publicación
El cuaderno ejecutado contiene rutas internas y resultados de diagnóstico. El paquete para Canvas puede conservarlo porque no incorpora filas de pacientes; no lo añadas automáticamente a GitHub Pages. Los archivos *.joblib, censos, cargos, SQLite y fuentes clínicas deben quedar únicamente en equipos autorizados.
