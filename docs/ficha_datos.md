# Ficha de datos — Estimación de estancia hospitalaria

## Procedencia
- Organización de origen: Fundación Cardioinfantil — LaCardio.
- Fuentes: Boletín de Gestión Clínica enriquecido con GRD y CMBD.
- Datos: registros clínico-administrativos reales, período 2024–2026.
- Análisis: 19 de octubre de 2026.
- Acceso: institucional restringido. **La autorización de uso y de difusión de agregados debe verificarse con el responsable correspondiente.**

## Inventario
| Fuente | Registros | Columnas analizadas | Columnas con faltantes |
| --- | ---: | ---: | ---: |
| Boletín enriquecido / GRD | 37.053 | 151 | 77 |
| CMBD demográfico (lectura selectiva) | 334.394 | 5 | 5 |

La cohorte final contiene **37.053 episodios**: 2024 (14.096), 2025 (13.855) y 2026 (9.102). Se conservaron 945 estancias de cero días (egreso el mismo día); no se encontraron etiquetas negativas, nulas o no convertibles. El cruce histórico–CMBD alcanzó 99,99 %.

La fila de entrenamiento representa un **snapshot**; un mismo episodio puede producir varios snapshots en días 0, 1, 3, 7, 14, 30 y 60. Las particiones se hacen por episodio.

## Variables predictoras
| Variable | Tipo | Papel y tratamiento |
| --- | --- | --- |
| DIA_ACTUAL | Numérica | Días transcurridos; estandarizada en regresión lineal/Ridge/MLP |
| EDAD | Numérica | Edad del paciente, imputación de faltantes en Pipeline |
| SEXO | Categórica | Codificación one-hot |
| GRD | Categórica | Grupo diagnóstico, codificación one-hot |
| SEVERIDAD | Numérica | Nivel clínico de severidad |
| PESO_MODELO | Numérica | Peso del GRD |
| NORMA_MODELO | Numérica | Referencia normativa |
| P50_REF | Numérica | Mediana de estancia de 2024 por GRD–severidad |

Las transformaciones se ajustan **dentro del Pipeline** sobre cada conjunto de entrenamiento. No se utiliza la estancia final como predictor.

## Ejemplo de faltantes
P50_REF presenta 955 valores faltantes sobre los 42.657 snapshots de entrenamiento (2,239 %); se resuelve dentro del Pipeline. La tabla completa de tipos y faltantes está en el Excel técnico de la entrega académica.

## Reproducibilidad y alcance
Validación cruzada por episodio con GroupKFold en 2025. Las referencias P50 se calculan con 2024. La evaluación de 2026 es retrospectiva, y ya fue consultada durante el desarrollo, por lo que se necesita un período posterior intacto para una verificación prospectiva.

**Referencia bibliográfica (origen):** Fundación Cardioinfantil — LaCardio. (2026). *Boletín de Gestión Clínica y conjunto mínimo básico de datos (CMBD), 2024–2026* [Base de datos institucional de acceso restringido].
