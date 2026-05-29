import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const navItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/complaints', label: 'Complaints' },
    { to: '/agents', label: 'Agents' },
    { to: '/dnc', label: 'DNC List' },
    { to: '/templates', label: 'Templates' },
    { to: '/reports', label: 'Reports' },
    { to: '/settings', label: 'Settings' },
]

export default function Layout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-xl font-bold text-white">CompliantIQ</h1>
                    <p className="text-slate-400 text-xs mt-1">Compliance Management</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex items-center px-3 py-2 rounded-lg text-sm bg-blue-600 text-white'
                                    : 'flex items-center px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white'
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white text-left"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}