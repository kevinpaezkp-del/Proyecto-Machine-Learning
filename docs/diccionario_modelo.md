# Diccionario resumido del modelo de regresión

| Campo analítico | Tipo | Qué significa | Transformación | Uso |
| --- | --- | --- | --- | --- |
| DIA_ACTUAL | Numérica (días) | Días transcurridos desde el ingreso hasta el snapshot | Validación no negativa; StandardScaler si aplica | Predictora |
| EDAD | Numérica (años) | Edad al ingreso, derivada del CMBD | Imputación mediana dentro de Pipeline; escalado si aplica | Predictora |
| SEXO | Categórica | Sexo reportado y normalizado | OneHotEncoder dentro del Pipeline | Predictora y auditoría |
| GRD | Categórica | Grupo relacionado con el diagnóstico | OneHotEncoder | Predictora |
| SEVERIDAD | Ordinal | Nivel de severidad del GRD | Imputación mediana/escalado según modelo | Predictora |
| PESO_MODELO | Numérica | Peso relativo del GRD | Ajuste por Pipeline | Predictora |
| NORMA_MODELO | Numérica (días) | Norma de estancia asociada | Ajuste por Pipeline | Predictora |
| P50_REF | Numérica (días) | Mediana histórica de estancia 2024, para GRD-severidad | Faltantes imputados en Pipeline | Predictora |
| RESTANTE_REAL | Numérica (días) | Estancia final menos día actual | Cálculo retrospectivo | **Etiqueta; nunca predictora** |
| _episodio | Texto (clave) | Identificador para agrupar snapshots | Normalización, excluida de X | **Solo partición y cruce** |

Las variables Edad, Sexo, GRD y severidad son ejemplos de distintos niveles de medición; las codificaciones y transformaciones dependen de la familia de modelo. Para un diccionario físico de todas las columnas de origen, consultar el anexo Excel de la entrega académica.
