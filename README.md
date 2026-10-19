# Estimar para anticipar · Proyecto Machine Learning I

**Presentación web interactiva** del proyecto de regresión para estimación de días restantes de estancia hospitalaria. La exposición está diseñada para 10 minutos e incluye análisis de datos, selección de modelo, métricas de validación y un corte operativo agregado.

## Ver el sitio
Una vez habilitado GitHub Pages, el enlace de la presentación será:

https://kevinpaezkp-del.github.io/Proyecto-Machine-Learning/

También puede abrirse localmente descargando el repositorio y abriendo `index.html` en un navegador.

## Activar publicación temporal
1. Abrir [Settings → Pages](https://github.com/kevinpaezkp-del/Proyecto-Machine-Learning/settings/pages).
2. En **Build and deployment → Source**, seleccionar **GitHub Actions**.
3. Si el plan de GitHub no admite Pages para repositorios privados, cambiar la visibilidad a pública desde **Settings → General → Danger Zone → Change repository visibility**. Esta operación hace visible el repositorio completo y su historial.
4. Abrir [Actions → Publicar presentacion academica](https://github.com/kevinpaezkp-del/Proyecto-Machine-Learning/actions/workflows/pages.yml) y pulsar **Run workflow**, rama `main`.
5. Confirmar el enlace real en **Settings → Pages → Visit site**.

El flujo de publicación está configurado para subir **solo** `index.html`, `robots.txt` y `.nojekyll`; excluye documentación, el código del despliegue local y cualquier archivo de modelo.

## Desactivarlo
En **Settings → Pages** utilizar **Unpublish site** (si está disponible) o desactivar la fuente de publicación. Si el repositorio se hizo público temporalmente, revertir la visibilidad a privada en **Settings → General**. La despublicación no revierte copias que otros ya hayan podido guardar.

## Resultados metodológicos
- Se evaluaron episodios de 2024–2026.
- Random Forest fue seleccionado mediante validación cruzada de 2025 por MAE promedio.
- MAE CV: 5,98 días; MAE retrospectivo 2026: 6,19 días; R²: 0,241.
- Un corte de 228 hospitalizaciones obtuvo 132 estimaciones agregadas (57,9 % de cobertura).
- Una evaluación prospectiva sigue siendo necesaria para medir el desempeño diario y efectos operativos.

## Archivos
- `index.html`: presentación y tablero integrado; sin llamadas a APIs de registros clínicos.
- `datos/`: series agregadas de modelos y corte.
- `docs/`: ficha estadística y justificación.
- `app_demo.py`: aplicación local de demostración, que **necesita** un modelo guardado en un equipo autorizado; no funciona desde Pages.

## Alcance y difusión
No se publican registros individuales, fuentes CMBD ni modelos entrenados. Se muestran estadísticas agregadas observadas. El sitio solicita a buscadores que eviten indexarlo; esto **no restringe** quién puede acceder con el enlace. La publicación de resultados institucionales sigue sujeta a las condiciones de uso y autorizaciones correspondientes.
