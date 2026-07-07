import { LuClock, LuUser, LuCalendar } from 'react-icons/lu'
import { getSession } from '@/lib/session'
import { LogoutButton } from '@/components/LogoutButton'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="bg-green-800 text-white px-4 py-3 flex items-center justify-between">
      <div>
        <p className="font-semibold text-sm">Municipalidad Distrital de Hualhuas</p>
        <p className="text-xs text-green-100">Empadronamiento Cementerio General</p>
      </div>

      <div className="flex items-center gap-4">
        {!session && (
          <div className="hidden sm:flex items-center gap-4 text-xs text-green-100">
            <span className="flex items-center gap-1">
              <LuCalendar className="w-4 h-4" />
              Lunes - Viernes 
            </span>
            <span className="flex items-center gap-1">
              <LuClock className="w-4 h-4" />
              8:30 AM - 4:30 PM
            </span>
          </div>
        )}

        {session && (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-green-100">
              <LuUser className="w-4 h-4" />
              {session.usuario}
            </span>
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  )
}