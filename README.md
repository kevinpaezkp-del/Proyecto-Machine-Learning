# Estimación de estancia hospitalaria · Machine Learning I

Presentación académica interactiva, organizada en diez momentos para sustentar un proyecto de regresión supervisada bajo **CRISP-DM**.

**[Abrir presentación web](https://kevinpaezkp-del.github.io/Proyecto-Machine-Learning/)**

## Recorrido de sustentación

| # | Tema | Evidencia |
| --- | --- | --- |
| 01 | Problema y decisión | Objetivo, stakeholders, métrica de negocio |
| 02 | Boletín y fuentes | Boletín de Gestión Clínica, CMBD, GRD y censo/cargos |
| 03 | Análisis exploratorio | Distribución de estancia, P25/P50/P75/P90/P95 y valores extremos |
| 04 | Variables | Ocho predictores, codificación, escalado y redundancia |
| 05 | Diseño experimental | Cohortes 2024/2025/2026, GroupKFold por episodio |
| 06 | Comparación de modelos | Tabla CV con entrenamiento, variabilidad, RMSE y R²; test 2026 separado |
| 07 | Errores según estancia | MAE por grupos ≤3, 4–7, 8–14, 15–28 y >28 días restantes |
| 08 | Sesgos y límites | Sexo, severidad, ponderación por episodio y riesgos |
| 09 | Tablero y calculadora | Corte agregado de 132 estimaciones; censo y calculadora pedagógicos |
| 10 | Decisión y roles | Cracks, Líderes, Jefes/jefas; propuesta de valor y piloto |

## Resultados principales

- **37.053 episodios** de 2024 a 2026.
- **Random Forest** seleccionado por menor MAE CV de 2025: **5,98 días**, desviación ±0,16.
- **Prueba temporal 2026**: MAE **6,19 días**, R² **0,241**; referencia P50: MAE **6,62 días**.
- El error crece hasta **28,66 días** cuando los días restantes reales superan 28; el sesgo es de **−23,98 días**.
- Corte operativo real agregado: **132 estimaciones de 228 hospitalizaciones**, mediana **6,8 días restantes**.
- **Precaución**: el desempeño promedio cambia si la evaluación da igual peso a cada episodio en lugar de cada snapshot.

## Cómo funciona la web

Interfaz HTML/CSS/JavaScript sin frameworks ni servicios externos. Navegación por menú o flechas del teclado. Tablas de entrenamiento y prueba, intervalos de error, auditoría por subgrupos, censo con buscador y filtros, y calculadora ilustrativa.

**El censo de 132 filas y la calculadora son ejemplos pedagógicos de interfaz.** Las cifras globales del corte son resultados agregados observados. Los renglones de la tabla no corresponden a registros de pacientes y la calculadora no ejecuta el regresor entrenado. Para dos inferencias reales fuera de Jupyter existe el servicio local `app_demo.py`, que necesita el modelo institucional `.joblib` en un equipo autorizado.

## Documentos de apoyo

- [Ficha de datos](docs/ficha_datos.md)
- [Bitácora de ejecución](docs/ejecucion_integral.md)
- [Variables y tipos](docs/diccionario_modelo.md)
- [Métricas CV](datos/metricas_cv.csv)
- [Prueba temporal 2026](datos/metricas_test_2026.csv)
- [Corte operativo agregado](datos/corte_operativo.json)
- [Guía de sustentación](docs/guia_sustentacion.md)
- [Lista para Canvas](docs/lista_entrega_canvas.md)

## Publicación

GitHub Actions despliega **solo** `index.html`, `assets/site.css`, `assets/site.js`, `robots.txt` y `.nojekyll`. Esta separación evita alojar el cuaderno con rutas internas o el modelo entrenado en GitHub Pages. Publicar un repositorio hace visibles sus archivos y su historial aunque Pages use solo un subconjunto.

Para retirar el sitio: Settings → Pages → Unpublish site. Si se desea cerrar el repositorio, Settings → General → Change repository visibility → Private; tener en cuenta que no deshace copias ya descargadas.

## Interpretación

El modelo apoya planeación y priorización del seguimiento; **no determina ni autoriza altas clínicas**. Se requieren validación prospectiva del GRD provisional, seguimiento de calidad y medición del impacto real antes de despliegue institucional.
