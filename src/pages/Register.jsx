import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '@/auth/AuthStore'
import api from '@/api/axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Field, FieldDescription, FieldError, FieldGroup, FieldLabel,
} from '@/components/ui/field'

export default function Register() {
    const navigate = useNavigate()
    const { login } = useAuthStore()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setApiError(null)

        if (password !== confirmPassword) {
            setApiError("Les mots de passe ne correspondent pas")
            return
        }

        setIsLoading(true)

        try {
            const { data } = await api.post('/register', { email, password })
            // axios parse le JSON automatiquement et throw si status >= 400

            login(data.token)
            navigate('/dashboard')

        } catch (error) {
            setApiError(error.response?.data?.error ?? "Erreur réseau, réessaie.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">

                    <Card className="overflow-hidden p-0">
                        <CardContent className="grid p-0 md:grid-cols-2">

                            <form onSubmit={handleSubmit} className="p-6 md:p-8">
                                <FieldGroup>

                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h1 className="text-2xl font-bold">Créer un compte</h1>
                                        <p className="text-muted-foreground text-balance">
                                            Rejoignez le CMS BestCash
                                        </p>
                                    </div>

                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="eve.holt@reqres.in"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">Confirmer le mot de passe</FieldLabel>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </Field>

                                    {apiError && <FieldError>{apiError}</FieldError>}

                                    <Field>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full cursor-pointer"
                                        >
                                            {isLoading ? 'Création en cours...' : 'Créer mon compte'}
                                        </Button>
                                    </Field>

                                    <FieldDescription className="text-center">
                                        Déjà un compte ?{' '}
                                        <Link to="/login">Se connecter</Link>
                                    </FieldDescription>

                                </FieldGroup>
                            </form>

                            <div className="bg-muted relative hidden md:block">
                                <img
                                    src="/placeholder.svg"
                                    alt=""
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>

                        </CardContent>
                    </Card>

                    <FieldDescription className="px-6 text-center">
                        En continuant, vous acceptez nos{' '}
                        <a href="#">Conditions d'utilisation</a> et notre{' '}
                        <a href="#">Politique de confidentialité</a>.
                    </FieldDescription>

                </div>
            </div>
        </div>
    )
}
