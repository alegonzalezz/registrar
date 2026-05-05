# Tasks - App de Macros

## T0 — Setup Inicial
**Objetivo:** Repo configurado, app vacía corriendo en GitHub Pages

- [x] Inicializar proyecto con Vite + React
- [x] Estructura de carpetas: `components/`, `pages/`, `hooks/`, `utils/`, `data/`
- [x] CSS variables globales + implementación dark mode
- [x] Crear repo en GitHub y pushear
- [x] Configurar deploy automático a GitHub Pages (GitHub Actions)

**Entrega:** App vacía pero accesible en `https://alegonzalezz.github.io/registrar`

---

## T1 — Catálogo de Alimentos
**Objetivo:** CRUD de alimentos guardados en localStorage
**Depende de:** T0

- [ ] Modelo de dato: `{ key, nombre, proteina, carbs, grasa, calorias }`
- [ ] Agregar alimento (form con los 5 campos)
- [ ] Listar alimentos
- [ ] Editar alimento existente
- [ ] Eliminar alimento
- [ ] Filtrar/buscar por nombre en tiempo real

**Entrega:** Puedo cargar "Pollo pecho" con sus macros y verlo en la lista

---

## T2 — Integración Google Sheets ⭐ [NUEVA]
**Objetivo:** Conexión funcional con Google Sheets para leer y escribir filas
**Depende de:** T0

> Esta tarea es infraestructura crítica. Registro, Dashboard e Historial dependen de ella.

- [ ] Configurar proyecto en Google Cloud Console (guía paso a paso documentada)
- [ ] Configurar OAuth 2.0 con scope de Google Sheets
- [ ] Flujo de login con Google en la app (botón "Conectar con Google")
- [ ] Guardar access token en localStorage
- [ ] Función `appendRow(rowData)` → agrega fila al sheet
- [ ] Función `readRows(filters?)` → lee filas del sheet
- [ ] Página de Configuración: ingresar Spreadsheet ID, ver estado de conexión
- [ ] Manejo de token expirado (refresh automático)

**Estructura de fila en el sheet:**
`fecha | hora | comida | alimento | cantidad_g | proteina | carbs | grasa | calorias`

**Entrega:** Botón de prueba que agrega una fila hardcodeada al sheet → aparece en Google Sheets

---

## T3 — Registro de Comidas
**Objetivo:** Registrar lo que como durante el día
**Depende de:** T1 + T2

- [ ] Buscador de alimentos en tiempo real (desde localStorage)
- [ ] Seleccionar alimento del catálogo
- [ ] Ingresar cantidad en gramos
- [ ] Calcular macros proporcionales al peso (`valor * cantidad / 100`)
- [ ] Asignar tipo de comida: desayuno / almuerzo / cena / snack
- [ ] Enviar fila a Google Sheets via `appendRow()`
- [ ] Ver lista de comidas del día actual (leídas del sheet)
- [ ] Feedback visual de carga y confirmación de guardado

**Entrega:** Busco "pollo", selecciono, pongo 150g, guardo → aparece nueva fila en el sheet

---

## T4 — Dashboard / Métricas
**Objetivo:** Ver consumo de macros en distintos períodos
**Depende de:** T3

- [ ] Leer comidas del día actual desde el sheet
- [ ] Totales del día: proteína, carbs, grasa, calorías
- [ ] Totales de la semana actual
- [ ] Totales del mes actual
- [ ] Desglose por tipo de comida (desayuno, almuerzo, cena, snack)
- [ ] Visualización con barras o tarjetas por macro

**Entrega:** Hoy comí X proteínas, Y carbs, Z grasas — desglosado por comida

---

## T5 — Goals / Metas
**Objetivo:** Establecer metas diarias y ver el progreso
**Depende de:** T4

- [ ] Form para configurar meta diaria: proteína, carbs, grasa, calorías
- [ ] Persistir metas en localStorage
- [ ] En el Dashboard: mostrar progreso vs meta (barra de progreso + %)
- [ ] Indicador visual cuando se supera una meta

**Entrega:** Meta: 150g proteína — llevo 80g (53%) ████░░░░

---

## T6 — Historial y Gestión
**Objetivo:** Ver y editar comidas pasadas
**Depende de:** T3 + T4

- [ ] Vista de historial filtrable por fecha
- [ ] Editar cantidad o alimento de una entrada existente
- [ ] Eliminar una entrada
- [ ] Cambiar fecha de una entrada

**Entrega:** Veo lo que comí ayer, corrijo una entrada, se actualiza en el sheet

---

## Orden de entrega recomendado

```
T0 → T1 → T2 → T3 → T4 → T5 → T6
```

Cada tarea es una entrega funcional independiente que agrega valor sobre la anterior.
