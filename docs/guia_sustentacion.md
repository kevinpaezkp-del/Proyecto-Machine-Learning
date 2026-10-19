# Guía para la sustentación (10 minutos)

| Minuto | Pantalla | Mensaje clave |
| --- | --- | --- |
| 0–1 | Problema | Anticipar permanencia para apoyar planeación y continuidad |
| 1–2 | Datos | 37.053 episodios reales, fuente 2024–2026, 945 estancias cero válidas |
| 2–3 | Preparación | 2024 referencia, 2025 entrenamiento/CV, 2026 evaluación retrospectiva |
| 3–4 | Variables | 8 predictores, demografía + GRD/severidad + referencias, Pipeline |
| 4–5 | Modelos | 8 algoritmos y dos referencias, mismo GroupKFold |
| 5–6 | Validación | RF: CV 5,98 ± 0,16 d, test 6,19 d, R² 0,241 |
| 6–7 | Riesgos | Sobreajuste sin poda; desempeño débil en estancias muy largas |
| 7–8 | Corte | 132 estimaciones de 228 pacientes; sin MAE hasta egreso real |
| 8–9 | Estrategia | Señal para planeación, no orden de alta |
| 9–10 | Conclusión | Piloto prospectivo y gobernanza, límites explícitos |

## Preguntas de jurado
- **¿Por qué Random Forest?** Mínimo MAE CV de 2025 (5,976 días); diferencia marginal frente a XGBoost (5,991), no superioridad estadística demostrada.
- **¿Cuál es el costo del error?** Sobreestimar puede aplazar coordinación; subestimar puede crear expectativas de cama anticipada. El impacto real debe medirse en piloto.
- **¿Hay sobreajuste?** RF: 4,878 días en folds de entrenamiento y 5,976 en CV. Árbol sin poda: 0,080 versus 7,686.
- **¿Por qué no solo P50 histórico?** El modelo mejora MAE por snapshot en 2026, pero la referencia supera al modelo dentro de ±3 días y en MAE por episodio igual-ponderado.
- **¿El GRD es confiable al ingreso?** El GRD final puede usar información futura. Se requiere contraste prospectivo con GRD provisional.
- **¿Tienen evidencia de impacto hospitalario?** Aún no; es una hipótesis de mejora por validar, no un ahorro comprobado.
- **¿La web predice dos casos nuevos?** No. Es un tablero de evidencia; para el bono, usar la aplicación local con el regresor del cuaderno y casos nuevos.
