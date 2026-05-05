import { useState } from 'react'
import { useCatalogo } from '../hooks/useCatalogo'

const FORM_EMPTY = { nombre: '', proteina: '', carbs: '', grasa: '', calorias: '' }

export default function Catalogo() {
  const { catalogo, agregar, editar, eliminar, loading, saving, error, reload } = useCatalogo()
  const [form, setForm] = useState(FORM_EMPTY)
  const [editingKey, setEditingKey] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  const alimentos = Object.values(catalogo)
    .filter(a => a.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre.trim()) return

    const datos = {
      nombre: form.nombre.trim(),
      proteina: parseFloat(form.proteina) || 0,
      carbs: parseFloat(form.carbs) || 0,
      grasa: parseFloat(form.grasa) || 0,
      calorias: parseFloat(form.calorias) || 0,
    }

    try {
      if (editingKey) {
        await editar(editingKey, datos)
        setEditingKey(null)
      } else {
        await agregar(datos)
      }
      setForm(FORM_EMPTY)
    } catch {
      // error ya está en el hook
    }
  }

  function handleEditar(alimento) {
    setEditingKey(alimento.key)
    setForm({
      nombre: alimento.nombre,
      proteina: String(alimento.proteina),
      carbs: String(alimento.carbs),
      grasa: String(alimento.grasa),
      calorias: String(alimento.calorias),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancelar() {
    setEditingKey(null)
    setForm(FORM_EMPTY)
  }

  if (loading) {
    return (
      <div className="page">
        <h1 className="page-title">Catálogo de Alimentos</h1>
        <p className="loading-msg">Cargando catálogo...</p>
      </div>
    )
  }

  const totalAlimentos = Object.keys(catalogo).length

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Catálogo de Alimentos</h1>
        {saving && <span className="saving-msg">Guardando...</span>}
      </div>

      {error && (
        <div className="error-msg">
          {error}
          <button className="btn btn-ghost btn-sm" onClick={reload}>Reintentar</button>
        </div>
      )}

      <div className="card">
        <h2 className="section-title">
          {editingKey ? 'Editar alimento' : 'Nuevo alimento'}
        </h2>
        <form className="catalogo-form" onSubmit={handleSubmit}>
          <input
            className="input"
            name="nombre"
            placeholder="Nombre (ej: Pollo pecho 100g)"
            value={form.nombre}
            onChange={handleChange}
            autoComplete="off"
            disabled={saving}
            required
          />
          <div className="macro-inputs">
            <div className="macro-field">
              <label className="macro-label macro-protein">Proteína (g)</label>
              <input className="input" name="proteina" type="number" min="0" step="0.1"
                placeholder="0" value={form.proteina} onChange={handleChange} disabled={saving} />
            </div>
            <div className="macro-field">
              <label className="macro-label macro-carbs">Carbs (g)</label>
              <input className="input" name="carbs" type="number" min="0" step="0.1"
                placeholder="0" value={form.carbs} onChange={handleChange} disabled={saving} />
            </div>
            <div className="macro-field">
              <label className="macro-label macro-fat">Grasa (g)</label>
              <input className="input" name="grasa" type="number" min="0" step="0.1"
                placeholder="0" value={form.grasa} onChange={handleChange} disabled={saving} />
            </div>
            <div className="macro-field">
              <label className="macro-label macro-cal">Calorías</label>
              <input className="input" name="calorias" type="number" min="0" step="1"
                placeholder="0" value={form.calorias} onChange={handleChange} disabled={saving} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? 'Guardando...' : editingKey ? 'Guardar cambios' : 'Agregar alimento'}
            </button>
            {editingKey && (
              <button className="btn btn-ghost" type="button" onClick={handleCancelar} disabled={saving}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {totalAlimentos > 0 && (
        <div className="card">
          <div className="catalogo-header">
            <input
              className="input"
              placeholder="Buscar alimento..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
            <span className="catalogo-count">{alimentos.length} / {totalAlimentos}</span>
          </div>

          <div className="alimentos-list">
            {alimentos.length === 0 ? (
              <p className="empty-msg">Sin resultados para "{busqueda}"</p>
            ) : (
              alimentos.map(a => (
                <div key={a.key} className={`alimento-row${editingKey === a.key ? ' alimento-row--editing' : ''}`}>
                  <div className="alimento-info">
                    <span className="alimento-nombre">{a.nombre}</span>
                    <div className="alimento-macros">
                      <span className="macro-protein">{a.proteina}g prot</span>
                      <span className="macro-carbs">{a.carbs}g carbs</span>
                      <span className="macro-fat">{a.grasa}g grasa</span>
                      <span className="macro-cal">{a.calorias} kcal</span>
                    </div>
                  </div>
                  <div className="alimento-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => handleEditar(a)} disabled={saving}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminar(a.key)} disabled={saving}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
