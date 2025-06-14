'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ListsPage() {
  const router = useRouter()
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')
  const [editListId, setEditListId] = useState(null)
  const [editListName, setEditListName] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchLists = async () => {
    const res = await fetch('http://127.0.0.1:8000/api-taskmanager/list/', {
      headers: { Authorization: `Token ${token}` },
    })
    const data = await res.json()
    setLists(data)
  }

  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      fetchLists()
    }
  }, [])

  const handleCreate = async e => {
    e.preventDefault()
    if (!newListName.trim()) return
    const res = await fetch('http://127.0.0.1:8000/api-taskmanager/list/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({ nombre: newListName }),
    })
    if (res.ok) {
      setNewListName('')
      fetchLists()
    }
  }

  const handleEdit = async id => {
    if (!editListName.trim()) return
    const res = await fetch(`http://127.0.0.1:8000/api-taskmanager/list/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({ nombre: editListName }),
    })
    if (res.ok) {
      setEditListId(null)
      setEditListName('')
      fetchLists()
    }
  }

  const handleDelete = async id => {
    await fetch(`http://127.0.0.1:8000/api-taskmanager/list/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    })
    fetchLists()
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-8">Mis Listas</h2>

      <form
        onSubmit={handleCreate}
        className="w-full max-w-md flex gap-3 mb-10"
        aria-label="Crear nueva lista"
      >
        <input
          type="text"
          value={newListName}
          onChange={e => setNewListName(e.target.value)}
          placeholder="Nueva lista"
          required
          className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Crear
        </button>
      </form>

      <ul className="w-full max-w-md space-y-6">
        {lists.map(list => (
          <li
            key={list.id}
            className="bg-gray-800 p-5 rounded-2xl shadow-lg text-white flex flex-col gap-3"
          >
            {editListId === list.id ? (
              <>
                <input
                  type="text"
                  value={editListName}
                  onChange={e => setEditListName(e.target.value)}
                  className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out hover:bg-gray-600"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(list.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditListId(null)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <strong className="text-xl">{list.nombre}</strong>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      setEditListId(list.id)
                      setEditListName(list.nombre)
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => router.push(`/lists/${list.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                  >
                    Ver tareas
                  </button>
                </div>
              </>
            )}

            {list.tareas && list.tareas.length > 0 && (
              <ul className="mt-3 pl-4 list-disc list-inside text-gray-300">
                {list.tareas.map(t => (
                  <li key={t.id} className="truncate">
                    {t.titulo}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
