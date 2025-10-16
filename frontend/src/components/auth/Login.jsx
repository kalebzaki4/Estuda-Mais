import AuthLayout from './AuthLayout.jsx';
import LoginForm from './LoginForm.jsx';

const Login = () => {
  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse sua conta e continue aprendendo"
      footerLinks={[{ to: '/register', label: 'Criar uma conta' }]}
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;