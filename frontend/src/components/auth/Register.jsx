import AuthLayout from './AuthLayout.jsx';
import RegisterForm from './RegisterForm.jsx';

const Register = () => {
  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Comece sua jornada com conteúdo de qualidade"
      footerLinks={[{ to: '/login', label: 'Já tenho conta' }]}
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;