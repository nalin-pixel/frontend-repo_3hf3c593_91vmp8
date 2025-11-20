import { useEffect, useMemo, useRef, useState } from 'react'

const emptyData = {
  personal: { name: '', phone: '', email: '', address: '' },
  education: [{ school: '', degree: '', year: '' }],
  skills: [''],
  projects: [{ title: '', description: '' }],
  experience: [{ company: '', role: '', period: '', details: '' }],
  summary: '',
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-600">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
      />
    </label>
  )
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-600">{label}</span>
      <textarea
        {...props}
        rows={props.rows || 4}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
      />
    </label>
  )
}

export default function Builder() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('resume-data')
    return saved ? JSON.parse(saved) : emptyData
  })

  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(data))
  }, [data])

  const addItem = (key, item) => setData((d) => ({ ...d, [key]: [...d[key], item] }))
  const removeItem = (key, index) =>
    setData((d) => ({ ...d, [key]: d[key].filter((_, i) => i !== index) }))

  const update = (path, value) => {
    setData((d) => {
      const clone = structuredClone(d)
      let cursor = clone
      for (let i = 0; i < path.length - 1; i++) cursor = cursor[path[i]]
      cursor[path.at(-1)] = value
      return clone
    })
  }

  const printRef = useRef()
  const handleExport = () => {
    const printContent = printRef.current
    const win = window.open('', 'PRINT', 'height=800,width=600')
    win.document.write('<html><head><title>Resume</title>')
    win.document.write(
      '<style>*,*:before,*:after{box-sizing:border-box} body{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;margin:0;padding:24px;background:white;color:#0f172a} .card{max-width:800px;margin:0 auto} .name{font-size:28px;font-weight:700;color:#0f172a} .muted{color:#475569} .section{margin-top:24px} .section h3{margin:0 0 8px 0;font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#0f172a} ul{padding-left:18px;margin:6px 0} li{margin:2px 0} .grid{display:grid;gap:6px} .pill{display:inline-block;padding:6px 10px;border-radius:999px;background:#f1f5f9;margin:4px 6px 0 0}</style>'
    )
    win.document.write('</head><body>')
    win.document.write(printContent.innerHTML)
    win.document.write('</body></html>')
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  const Section = ({ title, children }) => (
    <div className="mt-6">
      <h3 className="text-xs tracking-widest uppercase text-slate-900 mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  )

  const nonEmpty = (v) => (Array.isArray(v) ? v.length > 0 : v && String(v).trim() !== '')

  const preview = useMemo(() => data, [data])

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SectionCard title="Personal Information">
              <Input label="Full Name" value={data.personal.name} onChange={(e) => update(['personal','name'], e.target.value)} />
              <div className="grid sm:grid-cols-2 gap-3">
                <Input label="Phone" value={data.personal.phone} onChange={(e) => update(['personal','phone'], e.target.value)} />
                <Input label="Email" value={data.personal.email} onChange={(e) => update(['personal','email'], e.target.value)} />
              </div>
              <Input label="Address" value={data.personal.address} onChange={(e) => update(['personal','address'], e.target.value)} />
            </SectionCard>

            <SectionCard title="Education">
              {data.education.map((ed, i) => (
                <div key={i} className="grid sm:grid-cols-3 gap-3">
                  <Input label="School" value={ed.school} onChange={(e)=>update(['education', i, 'school'], e.target.value)} />
                  <Input label="Degree" value={ed.degree} onChange={(e)=>update(['education', i, 'degree'], e.target.value)} />
                  <Input label="Year" value={ed.year} onChange={(e)=>update(['education', i, 'year'], e.target.value)} />
                  <div className="sm:col-span-3 flex justify-end">
                    <button onClick={() => removeItem('education', i)} className="text-sm text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem('education', { school: '', degree: '', year: '' })} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Add Education</button>
            </SectionCard>

            <SectionCard title="Skills">
              {data.skills.map((s, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <Input label={`Skill`} value={s} onChange={(e)=>update(['skills', i], e.target.value)} />
                  <button onClick={() => removeItem('skills', i)} className="text-sm text-red-600 mb-2">Remove</button>
                </div>
              ))}
              <button onClick={() => addItem('skills', '')} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Add Skill</button>
            </SectionCard>

            <SectionCard title="Projects">
              {data.projects.map((p, i) => (
                <div key={i} className="grid gap-3">
                  <Input label="Title" value={p.title} onChange={(e)=>update(['projects', i, 'title'], e.target.value)} />
                  <Textarea label="Description" rows={3} value={p.description} onChange={(e)=>update(['projects', i, 'description'], e.target.value)} />
                  <div className="flex justify-end">
                    <button onClick={() => removeItem('projects', i)} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem('projects', { title: '', description: '' })} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Add Project</button>
            </SectionCard>

            <SectionCard title="Work Experience">
              {data.experience.map((w, i) => (
                <div key={i} className="grid gap-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input label="Company" value={w.company} onChange={(e)=>update(['experience', i, 'company'], e.target.value)} />
                    <Input label="Role" value={w.role} onChange={(e)=>update(['experience', i, 'role'], e.target.value)} />
                  </div>
                  <Input label="Period" value={w.period} onChange={(e)=>update(['experience', i, 'period'], e.target.value)} />
                  <Textarea label="Details" rows={3} value={w.details} onChange={(e)=>update(['experience', i, 'details'], e.target.value)} />
                  <div className="flex justify-end">
                    <button onClick={() => removeItem('experience', i)} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem('experience', { company: '', role: '', period: '', details: '' })} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Add Experience</button>
            </SectionCard>

            <SectionCard title="Profile Summary">
              <Textarea label="Summary" rows={4} value={data.summary} onChange={(e)=>update(['summary'], e.target.value)} />
            </SectionCard>

            <div className="flex items-center gap-3">
              <button onClick={handleExport} className="px-4 py-2 rounded-lg bg-slate-900 text-white shadow-sm">Export as PDF</button>
              <button onClick={() => localStorage.setItem('resume-data', JSON.stringify(emptyData)) && setData(emptyData)} className="px-4 py-2 rounded-lg bg-white border border-slate-200">Clear</button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div ref={printRef} className="print:shadow-none">
                <div className="name">{preview.personal.name || 'Your Name'}</div>
                <div className="muted">{[preview.personal.phone, preview.personal.email, preview.personal.address].filter(Boolean).join(' • ')}</div>

                {nonEmpty(preview.summary) && (
                  <div className="section">
                    <h3>Profile</h3>
                    <p className="muted">{preview.summary}</p>
                  </div>
                )}

                {nonEmpty(preview.education.filter(e=>Object.values(e).some(nonEmpty))) && (
                  <div className="section">
                    <h3>Education</h3>
                    <div className="grid">
                      {preview.education.map((e, i) => (
                        (Object.values(e).some(nonEmpty)) && (
                          <div key={i}>
                            <div className="font-medium">{e.school}</div>
                            <div className="muted">{[e.degree, e.year].filter(Boolean).join(' • ')}</div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {nonEmpty(preview.skills.filter(s=>nonEmpty(s))) && (
                  <div className="section">
                    <h3>Skills</h3>
                    <div>
                      {preview.skills.filter(Boolean).map((s, i) => (
                        <span key={i} className="pill">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {nonEmpty(preview.projects.filter(p=>Object.values(p).some(nonEmpty))) && (
                  <div className="section">
                    <h3>Projects</h3>
                    <ul>
                      {preview.projects.map((p, i) => (
                        (Object.values(p).some(nonEmpty)) && (
                          <li key={i}>
                            <span className="font-medium">{p.title}</span>: <span className="muted">{p.description}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}

                {nonEmpty(preview.experience.filter(w=>Object.values(w).some(nonEmpty))) && (
                  <div className="section">
                    <h3>Experience</h3>
                    <div className="grid">
                      {preview.experience.map((w, i) => (
                        (Object.values(w).some(nonEmpty)) && (
                          <div key={i}>
                            <div className="font-medium">{w.role} @ {w.company}</div>
                            <div className="muted">{w.period}</div>
                            {w.details && <div className="muted">{w.details}</div>}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
