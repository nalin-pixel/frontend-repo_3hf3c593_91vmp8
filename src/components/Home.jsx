import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Resume Builder
            </h1>
            <p className="text-lg text-slate-600">
              Create your resume in minutes. Fill a simple form on the left and watch a live preview on the right. Export to PDF and save your progress locally.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/builder"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-slate-900 text-white shadow-sm hover:shadow transition-all"
              >
                Start Building
              </Link>
              <a href="#features" className="px-5 py-3 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50">
                Learn more
              </a>
            </div>
          </div>
          <div className="relative p-6">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-sky-100 to-blue-100 rounded-3xl blur-2xl" />
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <div className="h-64 rounded-xl border border-slate-200 bg-slate-50 grid place-items-center text-slate-500">
                Clean, modern, minimal UI
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Live Preview', desc: 'See your resume update in real-time as you type.' },
            { title: 'Export to PDF', desc: 'Download a polished PDF instantly.' },
            { title: 'Local Save', desc: 'Your data stays in your browser with local storage.' },
            { title: 'Responsive', desc: 'Looks great on phones, tablets and desktops.' },
            { title: 'Minimal Design', desc: 'Soft shadows, rounded corners, generous spacing.' },
            { title: 'Smooth Animations', desc: 'Subtle fade and slide for a premium feel.' },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
