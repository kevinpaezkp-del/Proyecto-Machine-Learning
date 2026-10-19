# Ficha de datos — Estimación de estancia hospitalaria

## Procedencia
- Organización de origen: institución prestadora de servicios de salud de alta complejidad en Bogotá.
- Fuentes: Boletín de Gestión Clínica enriquecido con agrupación GRD y conjunto mínimo básico de datos (CMBD).
- Período de observación: 2024–2026; fecha de corte académico: octubre de 2026.
- Tipo: registros reales clínico-administrativos procesados para análisis estadístico.
- Acceso a archivos originales: mediante los procedimientos de autorización de la institución. No se distribuyen archivos de pacientes.

## Población y calidad
- Episodios: **37.053**; 2024: 14.096; 2025: 13.855; 2026: 9.102.
- Egresos del mismo día con estancia 0: **945**, considerados válidos.
- Cruce de la base de hospitalizaciones con datos demográficos: 99,99 %.
- Entrenamiento: 42.657 observaciones de 13.855 episodios (snapshots).
- Evaluación: 28.829 observaciones de 9.102 episodios.
- GRD y severidad proceden de la preparación clínica; la disponibilidad prospectiva del GRD es una limitación metodológica.

## Variables modeladas
| Variable | Tipo | Descripción |
| --- | --- | --- |
| DIA_ACTUAL | Numérica | Días transcurridos al corte |
| EDAD | Numérica | Edad |
| SEXO | Categórica | Sexo informado |
| GRD | Categórica | Grupo relacionado con diagnóstico |
| SEVERIDAD | Ordinal | Nivel de severidad |
| PESO_MODELO | Numérica | Peso relativo de grupo |
| NORMA_MODELO | Numérica | Norma de estancia |
| P50_REF | Numérica | Mediana histórica de 2024 por grupo y severidad |
| RESTANTE_REAL | Numérica | Etiqueta calculada retrospectivamente, nunca predictora |

## Preparación y evaluación
Imputación y escalado cuando aplica, codificación categórica y validación cruzada por episodio dentro de Pipeline. Referencia histórica construida sobre 2024, selección de regresor en 2025 y evaluación retrospectiva sobre 2026.

**Nota:** los números publicados son agregados. No constituyen autorización para descargar ni reproducir historias clínicas, censos, cargos o identificadores individuales.