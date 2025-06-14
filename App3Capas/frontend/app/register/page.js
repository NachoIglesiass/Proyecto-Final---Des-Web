'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await fetch('http://127.0.0.1:8000/api-account/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        alert('Registro exitoso. Ya podés iniciar sesión.')
        router.push('/login')
      } else {
        setError(data.error || 'Error en el registro')
      }
    } catch {
      setError('Error de red')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Registro</h2>

        {error && (
          <div className="bg-red-500 text-white border border-red-700 p-4 mb-4 rounded-lg shadow-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-400 ease-in-out hover:bg-gray-600 hover:border-2 hover:border-blue-500 hover:shadow-2xl hover:scale-105 focus:scale-105"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-400 ease-in-out hover:bg-gray-600 hover:border-2 hover:border-blue-500 hover:shadow-2xl hover:scale-105 focus:scale-105"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-400 ease-in-out hover:bg-gray-600 hover:border-2 hover:border-blue-500 hover:shadow-2xl hover:scale-105 focus:scale-105"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none w-full"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
