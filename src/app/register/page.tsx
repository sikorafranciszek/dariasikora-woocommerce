import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <RegisterForm />
    </div>
  );
}
