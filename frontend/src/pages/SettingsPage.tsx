import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function SettingsPage() {
  const [prefix, setPrefix] = useState('MHA')
    const [email, setEmail] = useState('')
      const [msg, setMsg] = useState('')

        const handlePasswordReset = async () => {
            if (!email) { setMsg('Enter an email first'); return }
                const { error } = await supabase.auth.resetPasswordForEmail(email)
                    setMsg(error ? error.message : 'Password reset email sent!')
                      }

                        return (
                            <div className="p-8 max-w-2xl">
                                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
                                        {msg && <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">{msg}</div>}
                                              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                                                      <h2 className="font-semibold text-gray-900 mb-4">Complaint Number Prefix</h2>
                                                              <div className="flex items-center gap-4">
                                                                        <input value={prefix} onChange={e => setPrefix(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-32" placeholder="MHA" />
                                                                                  <span className="text-sm text-gray-500">Format: {prefix}-2026-0001</span>
                                                                                          </div>
                                                                                                </div>
                                                                                                      <div className="bg-white rounded-xl border border-gray-200 p-6">
                                                                                                              <h2 className="font-semibold text-gray-900 mb-4">Password Reset</h2>
                                                                                                                      <div className="flex gap-4">
                                                                                                                                <input type="email" placeholder="User email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                                                                                                                                          <button onClick={handlePasswordReset} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                                                                                                                                                      Send Reset Email
                                                                                                                                                                </button>
                                                                                                                                                                        </div>
                                                                                                                                                                              </div>
                                                                                                                                                                                  </div>
                                                                                                                                                                                    )
                                                                                                                                                                                    }