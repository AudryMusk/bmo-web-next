'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'
import SubmitButton from './SubmitButton'

export default function LoginForm({ loginAction }) {
  const [state, formAction] = useFormState(loginAction, null)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-200 bg-white">
          <div className="grid md:grid-cols-2">

            <form action={formAction} className="p-6 md:p-8 flex flex-col gap-5">
              <div className="flex flex-col items-center gap-3 text-center">
                <img src="/bmo-logo.png" alt="B-MO" className="h-10 w-auto" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Bienvenue</h1>
                  <p className="text-slate-400 text-sm mt-1">Connectez-vous au CMS de B-MO</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="admin@bmo.com" required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:border-primary focus:ring-primary/15 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">Mot de passe</label>
                <input
                  id="password" name="password" type="password"
                  placeholder="••••••••" required
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:border-primary focus:ring-primary/15 transition-colors"
                />
              </div>

              {state?.error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {state.error}
                </p>
              )}

              <SubmitButton
                loadingText="Connexion..."
                className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer border-none text-sm"
              >
                Se connecter
              </SubmitButton>

              <p className="text-center text-xs text-slate-400">
                Pas encore de compte ?{' '}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  S'inscrire
                </Link>
              </p>

              <div className="flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-slate-400 tracking-wide">Agrément BCEAO B00/SSMP/00369-2022</span>
              </div>
            </form>

            {/* Panneau droit brand B-MO */}
            <div
              className="relative hidden md:flex flex-col items-center justify-center p-8 overflow-hidden"
              style={{
                backgroundColor: '#0A0A0A',
                backgroundImage: 'radial-gradient(circle, #C9961A 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.72) 100%)' }}
              />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <img
                  src="/bmo-logo-mini.png" alt="B-MO"
                  style={{ height: '72px', width: 'auto', filter: 'drop-shadow(0 0 22px rgba(201,150,26,0.5))' }}
                />
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-white font-semibold text-base tracking-wide">B-MO</p>
                  <p className="text-white/45 text-xs leading-relaxed max-w-[180px]">
                    Solution de paiement digital et de mobile banking au Bénin.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2.5 w-full">
                  {[
                    { val: '158+', lbl: 'Agences' },
                    { val: '8',    lbl: 'Distributeurs' },
                    { val: '30+',  lbl: 'GAB UBA' },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} className="flex flex-col items-center gap-0.5 rounded-xl p-2.5"
                      style={{ background: 'rgba(201,150,26,0.08)', border: '1px solid rgba(201,150,26,0.22)' }}>
                      <span className="text-base font-extrabold" style={{ color: '#C9961A' }}>{val}</span>
                      <span className="text-[9px] text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>{lbl}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: 'rgba(201,150,26,0.45)' }}>
                  Partenaire UBA · BCEAO
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
