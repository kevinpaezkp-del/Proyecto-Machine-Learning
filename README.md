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

La exposición usa HTML, CSS y JavaScript estáticos con tablas y gráficos de la ejecución retrospectiva. El tablero de seguimiento presenta 132 filas ilustrativas (no pacientes), con totales agregados reales.

**La calculadora pública usa únicamente la línea base P50 histórica de 2024**, con diez GRD representativos y sus tres severidades. Completa Peso, Norma y P50 a partir del grupo, y estima `max(0, P50_REF−DIA_ACTUAL)`. Edad y sexo se muestran porque son predictores del modelo completo, pero no intervienen en esa línea base.

**El Random Forest real se ejecuta con la aplicación Python local** mediante el archivo `modelo_final.joblib` mantenido fuera del repositorio. Esta separación es necesaria porque GitHub Pages no ejecuta Python/Joblib y no se publica el artefacto entrenado. En la aplicación local pueden introducirse dos escenarios nuevos y observar los ocho predictores, la estimación y sensibilidad a edad/sexo/día (sin interpretarla causalmente).


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
