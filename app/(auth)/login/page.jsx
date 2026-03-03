import LoginForm from '@/components/admin/LoginForm'
import { loginAction } from '@/actions/auth'

export const metadata = { title: 'Connexion — CMS B-MO' }

export default function LoginPage() {
  return <LoginForm loginAction={loginAction} />
}
