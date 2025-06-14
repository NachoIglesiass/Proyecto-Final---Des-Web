'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ListDetailPage() {
  const { listId } = useParams()
  const router = useRouter()
  const [list, setList] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [editTaskId, setEditTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchList = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api-taskmanager/list/${listId}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    if (res.status === 401) return router.push('/login')
    const data = await res.json()
    setList(data)
  }

  useEffect(() => {
    if (token) fetchList()
  }, [listId])

  const handleCreateTask = async e => {
    e.preventDefault()
    const res = await fetch('http://127.0.0.1:8000/api-taskmanager/task/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: newTaskTitle,
        descripcion: newTaskDescription,
        lista: listId,
      }),
    })
    if (res.ok) {
      setNewTaskTitle('')
      setNewTaskDescription('')
      fetchList()
    }
  }

  const handleDeleteTask = async taskId => {
    await fetch(`http://127.0.0.1:8000/api-taskmanager/task/${taskId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    })
    fetchList()
  }

  const handleToggleComplete = async task => {
    await fetch(`http://127.0.0.1:8000/api-taskmanager/task/${task.id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: task.titulo,
        descripcion: task.descripcion,
        completada: !task.completada,
        lista: listId,
      }),
    })
    fetchList()
  }

  const handleEditTask = task => {
    setEditTaskId(task.id)
    setEditTitle(task.titulo)
    setEditDescription(task.descripcion)
  }

  const handleUpdateTask = async () => {
    await fetch(`http://127.0.0.1:8000/api-taskmanager/task/${editTaskId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: editTitle,
        descripcion: editDescription,
        lista: listId,
      }),
    })
    setEditTaskId(null)
    setEditTitle('')
    setEditDescription('')
    fetchList()
  }

  const handleAddComment = async (taskId, text) => {
    if (!text.trim()) return
    await fetch('http://127.0.0.1:8000/api-taskmanager/comment/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tarea: taskId, texto: text }),
    })
    fetchList()
  }

  const handleAddTag = async (taskId, tagName) => {
    if (!tagName.trim()) return
    const res = await fetch('http://127.0.0.1:8000/api-taskmanager/tag/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: tagName, tareas: [taskId] }),
    })
    if (res.ok) fetchList()
  }

  const handleDeleteComment = async commentId => {
    await fetch(`http://127.0.0.1:8000/api-taskmanager/comment/${commentId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    })
    fetchList()
  }

  const handleDeleteTag = async tagId => {
    await fetch(`http://127.0.0.1:8000/api-taskmanager/tag/${tagId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    })
    fetchList()
  }

  if (!list) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Cargando lista...
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10">Lista: {list.nombre}</h2>

      {/* Formulario nueva tarea */}
      <form onSubmit={handleCreateTask} className="w-full max-w-xl space-y-4 mb-10">
        <h3 className="text-2xl font-semibold">Agregar tarea</h3>
        <input
          placeholder="Título"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none"
        />
        <textarea
          placeholder="Descripción"
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition"
        >
          Crear tarea
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className="w-full max-w-4xl space-y-8">
        {list.tareas.map(task => (
          <li key={task.id} className="bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center">
              <div>
                {editTaskId === task.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 mb-2"
                    />
                    <textarea
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 mb-2"
                    />
                    <button
                      onClick={handleUpdateTask}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditTaskId(null)}
                      className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="text-xl font-bold">
                      <input
                        type="checkbox"
                        checked={task.completada}
                        onChange={() => handleToggleComplete(task)}
                        className="mr-2"
                      />
                      {task.titulo}
                    </h4>
                    <p className="text-gray-300">{task.descripcion}</p>
                    <p className="text-sm text-gray-400">
                      Creada: {new Date(task.fecha_creacion).toLocaleString()}
                    </p>
                  </>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditTask(task)}
                  className="text-yellow-400 hover:text-yellow-600 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>

            {/* Comentarios */}
            <h5 className="mt-4 font-semibold">Comentarios</h5>
            <ul className="mb-2">
              {task.comentarios.map(c => (
                <li key={c.id} className="flex justify-between items-center">
                  <span>{c.texto}</span>
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <input
              placeholder="Nuevo comentario"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddComment(task.id, e.target.value)
                  e.target.value = ''
                }
              }}
              className="w-full p-2 rounded bg-gray-700 placeholder-gray-400 mb-4"
            />

            {/* Etiquetas */}
            <h5 className="font-semibold">Etiquetas</h5>
            <ul className="flex flex-wrap gap-2 mb-2">
              {task.etiquetas.map(tag => (
                <li
                  key={tag.id}
                  className="bg-blue-700 px-2 py-1 rounded text-sm flex items-center gap-2"
                >
                  #{tag.nombre}
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-red-300 hover:text-red-500 text-xs"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <input
              placeholder="Nueva etiqueta"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddTag(task.id, e.target.value)
                  e.target.value = ''
                }
              }}
              className="w-full p-2 rounded bg-gray-700 placeholder-gray-400"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
