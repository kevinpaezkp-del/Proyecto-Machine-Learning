# Estimar para anticipar · Machine Learning I

Sitio de sustentación (10 momentos / 10 minutos) y resultados agregados del proyecto **Estimación de días restantes de estancia hospitalaria**.

## Contenido
- `index.html`: presentación interactiva sin dependencias externas, compatible con GitHub Pages y ejecución local.
- `README.md`: contexto, reproducción y advertencias metodológicas.
- `.nojekyll`: indica que el sitio no requiere Jekyll.

## Cómo utilizar
Abrir `index.html` en un navegador. Avanzar con las flechas del teclado o la navegación lateral. El botón «PDF / imprimir» permite generar una versión imprimible. Las gráficas resumidas de la página se calculan a partir de resultados agregados de la ejecución.

## Resultados
Evaluación retrospectiva con datos de 2024–2026. Random Forest: MAE CV 5,976 días; MAE test 2026 6,192 días; R² test 0,241; comparación P50 histórico 6,616 días de MAE. El corte operativo contiene 132 estimaciones de 228 episodios, sin error de pronóstico aún observable.

El error por episodio igual-ponderado (4,779 días) no supera la referencia histórica (4,692 días). El resultado favorable de MAE por snapshot no equivale a beneficio clínico demostrado.

## Seguridad de la información
**No incluir** CMBD, boletines clínicos, censos por paciente, reportes de cargos, archivos `.joblib`, ni cuadernos con salidas individuales o rutas internas. El sitio se limita a métricas agregadas. Antes de hacer público el repositorio o GitHub Pages, confirmar autorización institucional para la difusión de resultados agregados.

## Entrega universitaria
Canvas requiere informe PFI PDF, resumen en inglés PDF, cuaderno reproducible, ficha de datos, declaración de IA y, si corresponde, anexos A/B y explicación de acceso a datos originales.

## Alcance del despliegue
La web documenta las predicciones del corte. **No ejecuta el modelo Random Forest** en el navegador; para el bono de inferencia en vivo es necesario mostrar dos casos nuevos en una aplicación que cargue el regresor original fuera de Jupyter.

## GitHub Pages
En el repositorio: Settings → Pages → Build and deployment → Deploy from a branch → main / (root). En GitHub Free podría ser necesario que el repositorio sea público, lo cual debe considerarse *solo tras autorizar la publicación*.
