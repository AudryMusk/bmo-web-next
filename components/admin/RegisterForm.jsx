'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import SubmitButton from './SubmitButton'

export default function RegisterForm({ registerAction }) {
  const [state, formAction] = useActionState(registerAction, null)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="overflow-hidden rounded-2xl shadow-sm border border-slate-200 bg-white">
          <div className="grid md:grid-cols-2">

            <form action={formAction} className="p-6 md:p-8 flex flex-col gap-5">
              <div className="flex flex-col items-center gap-3 text-center">
                <img src="/bmo-logo.png" alt="B-MO" className="h-10 w-auto" />
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Créer un compte</h1>
                  <p className="text-slate-400 text-sm mt-1">Rejoignez le CMS B-MO</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="votre@email.com" required
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 transition-colors ${state?.fieldErrors?.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-primary/15'}`}
                />
                {state?.fieldErrors?.email && (
                  <p className="text-xs text-red-500">{state.fieldErrors.email[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">Mot de passe</label>
                <input
                  id="password" name="password" type="password"
                  placeholder="••••••••" required
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 transition-colors ${state?.fieldErrors?.password ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-primary/15'}`}
                />
                {state?.fieldErrors?.password && (
                  <p className="text-xs text-red-500">{state.fieldErrors.password[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirmer le mot de passe</label>
                <input
                  id="confirmPassword" name="confirmPassword" type="password"
                  placeholder="••••••••" required
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 transition-colors ${state?.fieldErrors?.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-primary/15'}`}
                />
                {state?.fieldErrors?.confirmPassword && (
                  <p className="text-xs text-red-500">{state.fieldErrors.confirmPassword[0]}</p>
                )}
              </div>

              {state?.error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {state.error}
                </p>
              )}

              <SubmitButton
                loadingText="Inscription..."
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer border-none text-sm"
              >
                S'inscrire
              </SubmitButton>

              <p className="text-center text-xs text-slate-400">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </form>

            <div className="relative hidden md:flex flex-col items-center justify-center p-8 overflow-hidden bg-primary">
              <div className="flex flex-col items-center gap-6 w-full">
                <img src="/bmo-logo-mini.png" alt="B-MO" className="h-16 w-auto brightness-0 invert" />
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-white font-semibold text-base tracking-wide">B-MO</p>
                  <p className="text-white/60 text-xs leading-relaxed max-w-[180px]">
                    Solution de paiement digital et de mobile banking au Bénin.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2.5 w-full">
                  {[
                    { val: '158+', lbl: 'Agences' },
                    { val: '8',    lbl: 'Distributeurs' },
                    { val: '30+',  lbl: 'GAB UBA' },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} className="flex flex-col items-center gap-0.5 rounded-xl p-2.5 bg-white/10 border border-white/15">
                      <span className="text-base font-extrabold text-white">{val}</span>
                      <span className="text-[9px] text-center text-white/50">{lbl}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] tracking-widest uppercase text-white/30">Partenaire UBA · BCEAO</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
