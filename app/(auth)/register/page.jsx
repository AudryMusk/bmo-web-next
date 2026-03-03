import RegisterForm from '@/components/admin/RegisterForm'
import { registerAction } from '@/actions/auth'

export const metadata = { title: 'Inscription — CMS B-MO' }

export default function RegisterPage() {
  return <RegisterForm registerAction={registerAction} />
}
