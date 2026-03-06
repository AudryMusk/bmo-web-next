import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import useAuthStore from "@/auth/AuthStore"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [apiError, setApiError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    setApiError(null)
    setIsLoading(true)

    try {
      const { data } = await api.post('/login', { email, password })
      

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
                    <h1 className="text-2xl font-bold">Bienvenue</h1>
                    <p className="text-muted-foreground text-balance">
                      Connectez-vous au CMS de B-MO
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

                  {apiError && <FieldError>{apiError}</FieldError>}

                  <Field>
                    <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
                      {isLoading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                  </Field>

                  <FieldDescription className="text-center">
                    Pas encore de compte ?{' '}
                    <Link to="/register">S'inscrire</Link>
                  </FieldDescription>

                </FieldGroup>
              </form>

              <div className="bg-muted relative hidden md:block">
                <img
                  src="https://img.freepik.com/premium-photo/cartoon-man-with-backpack-binoculars-standing-top-mountain_1057-44561.jpg?w=1080"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}