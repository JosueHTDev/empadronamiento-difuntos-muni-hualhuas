'use client'

import { LuLogOut } from 'react-icons/lu'
import { logoutAction } from '@/actions/auth.actions'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center gap-1 text-sm bg-green-900 hover:bg-green-950 px-3 py-1.5 rounded transition-colors"
      >
        <LuLogOut className="w-4 h-4" />
        Cerrar sesión
      </button>
    </form>
  )
}