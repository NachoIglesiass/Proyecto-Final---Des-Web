'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api-account/login/', {
        username,
        password,
      })
      localStorage.setItem('token', response.data.token)
      router.push('/lists')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Iniciar Sesión</h1>

        {error && (
          <div className="bg-red-500 text-white border border-red-700 p-4 mb-4 rounded-lg shadow-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-400 ease-in-out
                hover:bg-gray-600 hover:border-2 hover:border-blue-500 hover:shadow-2xl hover:scale-105
                focus:scale-105"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-400 ease-in-out
                hover:bg-gray-600 hover:border-2 hover:border-blue-500 hover:shadow-2xl hover:scale-105
                focus:scale-105"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg
                transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none w-full"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-gray-300 text-sm">
              ¿No estás registrado?{' '}
              <a
                href="/register"
                className="text-blue-400 hover:underline hover:text-blue-600"
              >
                Registrate aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
