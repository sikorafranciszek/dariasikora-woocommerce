import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <LoginForm />
    </div>
  );
}
