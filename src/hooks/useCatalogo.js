import { useState, useEffect } from 'react'

export function useCatalogo() {
  const [catalogo, setCatalogo] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/catalogo')
      if (!res.ok) throw new Error(`Error ${res.status}`)
      setCatalogo(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function save(newCatalogo) {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/catalogo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCatalogo, null, 2),
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      setCatalogo(newCatalogo)
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setSaving(false)
    }
  }

  function agregar(alimento) {
    const key = Date.now().toString()
    return save({ ...catalogo, [key]: { ...alimento, key } })
  }

  function editar(key, datos) {
    return save({ ...catalogo, [key]: { ...catalogo[key], ...datos } })
  }

  function eliminar(key) {
    const nuevo = { ...catalogo }
    delete nuevo[key]
    return save(nuevo)
  }

  return { catalogo, agregar, editar, eliminar, loading, saving, error, reload: load }
}
