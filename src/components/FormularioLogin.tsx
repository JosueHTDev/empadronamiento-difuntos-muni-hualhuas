'use client'

import { useState, useTransition } from 'react'
import { LuUser, LuLock, LuLoaderCircle, LuEye, LuEyeOff } from 'react-icons/lu'
import { loginAction } from '@/actions/auth.actions'

export function FormularioLogin() {
  const [usuario, setUsuario] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [errores, setErrores] = useState<Record<string, string[]> | null>(null)
  const [isPending, startTransition] = useTransition()

  const hayError = errores !== null

  function handleSubmit(formData: FormData) {
    setErrores(null)

    startTransition(async () => {
      const resultado = await loginAction(formData)

      if (resultado && !resultado.success) {
        setErrores(resultado.errors ?? null)
      }
    })
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-sm space-y-5 p-8 border border-gray-200 rounded-xl shadow-sm bg-white"
    >
      <div className="text-center">
        <div className="w-12 h-12 bg-green-800 rounded-full mx-auto mb-3" />
        <h1 className="text-xl font-bold text-green-900">Acceso administrativo</h1>
        <p className="text-sm text-gray-500 mt-1">
          Municipalidad Distrital de Hualhuas
        </p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <LuUser
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              hayError ? 'text-red-400' : 'text-gray-400'
            }`}
          />
          <input
            name="usuario"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className={`border rounded-lg pl-9 pr-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
              hayError
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-700'
            }`}
          />
        </div>

        <div className="relative">
          <LuLock
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              hayError ? 'text-red-400' : 'text-gray-400'
            }`}
          />
          <input
            name="password"
            type={mostrarPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            className={`border rounded-lg pl-9 pr-9 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
              hayError
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-700'
            }`}
          />
          <button
            type="button"
            onClick={() => setMostrarPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {mostrarPassword ? (
              <LuEyeOff className="w-4 h-4" />
            ) : (
              <LuEye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-green-800 hover:bg-green-900 disabled:bg-gray-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg w-full flex items-center justify-center gap-2 transition-colors"
      >
        {isPending && <LuLoaderCircle className="w-4 h-4 animate-spin" />}
        {isPending ? 'Ingresando...' : 'Ingresar'}
      </button>

      {errores && (
        <ul className="text-red-600 text-xs text-center space-y-1">
          {Object.entries(errores).map(([campo, msgs]) => (
            <li key={campo}>{msgs.join(', ')}</li>
          ))}
        </ul>
      )}
    </form>
  )
}