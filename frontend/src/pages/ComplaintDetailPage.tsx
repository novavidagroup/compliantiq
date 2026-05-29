import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ComplaintDetailPage() {
    const { id } = useParams()
    const [complaint, setComplaint] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase.from('complaints').select('*').eq('id', id).single()
            if (data) { setComplaint(data); setStatus(data.status); setNotes(data.notes || '') }
            setLoading(false)
        }
        load()
    }, [id])

    const handleSave = async () => {
        setSaving(true)
        await supabase.from('complaints').update({ status, notes }).eq('id', id)
        setSaving(false)
        setComplaint(c => ({ ...c, status, notes }))
    }

    if (loading) return <div className="p-8 text-gray-500">Loading...</div>
    if (!complaint) return <div className="p-8 text-red-500">Not found.</div>

    return (
        <div className="p-8 max-w-4xl">
            <Link to="/complaints" className="text-blue-600 hover:underline text-sm mb-6 block">Back</Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{complaint.complaint_number}</h1>
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-3">Consumer</h2>
                    <p className="text-sm text-gray-900">{complaint.consumer_name}</p>
                    <p className="text-sm text-gray-500">{complaint.consumer_phone || ''}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-3">Details</h2>
                    <p className="text-sm">Type: {complaint.complaint_type || ''}</p>
                    <p className="text-sm">Due: {complaint.due_date ? new Date(complaint.due_date).toLocaleDateString() : ''}</p>
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Update</h2>
                <select value={status} onChange={e => setStatus(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4">
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="Notes..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4" />
                <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    )
}