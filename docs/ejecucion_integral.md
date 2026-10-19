# Bitácora reproducible de la ejecución

**Fecha del corte y entrenamiento:** 19 de octubre de 2026. Las cifras siguientes proceden de las salidas ejecutadas del cuaderno y se presentan como agregados.

## Control de fuentes
| Indicador | Resultado |
| --- | ---: |
| Episodios analíticos | 37.053 |
| Registros CMBD selectivos | 334.394 |
| Campos histórico enriquecido | 151 |
| Cruce CMBD | 99,99 % |
| Estancias cero válidas | 945 |
| Etiquetas negativas/nulas/no convertibles | 0 |

## Partición
| Cohorte | Episodios | Snapshots |
| --- | ---: | ---: |
| 2024 (referencias) | 14.096 | No aplica |
| 2025 (entrenamiento / GroupKFold) | 13.855 | 42.657 |
| 2026 (test retrospectivo) | 9.102 | 28.829 |

## Modelo ganador
**Random Forest**, con MAE de validación cruzada = **5,9756 ± 0,1579 días**. Segundo: XGBoost = **5,9905 días**. La ventaja no demuestra superioridad estadística. La elección fue por MAE 2025, no por test 2026.

**TrainFold MAE Random Forest = 4,8784 días**. **Árbol sin poda: 0,0797 entrenamiento / 7,6862 CV**, ejemplo evidente de sobreajuste.

## Evaluación retrospectiva temporal
| Métrica | Random Forest | P50 histórica |
| --- | ---: | ---: |
| MAE | 6,1924 días | 6,6161 días |
| MSE | 146,4983 días² | 175,2857 días² |
| RMSE | 12,1036 días | 13,2396 días |
| R² | 0,2413 | 0,0922 |
| Error ≤3 días | 46,81 % | 53,48 % |

## Sensibilidad a la unidad de análisis
El MAE por **snapshot** favorece a Random Forest: 6,192 vs 6,616 días. El MAE **promediado por episodio** favorece levemente a la referencia: 4,779 vs 4,692 días. El resultado no debe expresarse como mejora generalizada para cada episodio.

## Corte operativo de hospitalización
- Hospitalizaciones en el corte: 228.
- Con estimación: 132 (**57,9 %**).
- Días transcurridos, mediana: 12,3.
- Días restantes, mediana: 6,8 (P25 5,1; P75 11,1).
- Estancia total estimada, mediana: 19,3.
- Distribución de 132 estimaciones: 31 en 0–5 días, 52 en 5–10 días y 49 en 10+ días.

La precisión de esos 132 pronósticos no puede calcularse hasta que se observen sus egresos.

## Reproducibilidad
- Semilla: 42.
- GroupKFold por episodio.
- Pipeline para imputación, OneHotEncoder y escalado cuando corresponde.
- Modelos comparados bajo los mismos folds.
- Se permite el examen del código con el cuaderno completo en el material de Canvas; los registros de pacientes originales no se redistribuyen.

**Limitaciones:** GRD final puede usar conocimiento futuro; 2026 se había inspeccionado en la iteración metodológica; error elevado en estancias muy prolongadas; resultados no validan causalmente impacto sobre flujo hospitalario.
