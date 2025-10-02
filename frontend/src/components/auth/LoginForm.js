import React, { useState } from 'react';
import styled from 'styled-components';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria a lógica de autenticação
    console.log('Login com:', { email, password, rememberMe });
  };

  return (
    <FormContainer>
      <FormTitle>Entrar na sua conta</FormTitle>
      
      <FormGroup>
        <Label>E-mail</Label>
        <InputContainer>
          <EmailIcon />
          <Input 
            type="email" 
            placeholder="seu.email@exemplo.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
      </FormGroup>

      <FormGroup>
        <LabelContainer>
          <Label>Senha</Label>
          <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>
        </LabelContainer>
        <InputContainer>
          <PasswordIcon />
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="********" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggle 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </PasswordToggle>
        </InputContainer>
      </FormGroup>

      <RememberContainer>
        <CheckboxContainer>
          <Checkbox 
            type="checkbox" 
            id="remember" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <CheckboxLabel htmlFor="remember">Lembrar-me</CheckboxLabel>
        </CheckboxContainer>
      </RememberContainer>

      <LoginButton onClick={handleSubmit}>Entrar</LoginButton>

      <Divider>
        <DividerText>Ou continue com</DividerText>
      </Divider>

      <SocialButtonsContainer>
        <SocialButton className="google">
          <GoogleIcon />
          Google
        </SocialButton>
        <SocialButton className="github">
          <GithubIcon />
          GitHub
        </SocialButton>
      </SocialButtonsContainer>

      <SignupPrompt>
        Não tem conta? <SignupLink href="#">Cadastre-se agora</SignupLink>
      </SignupPrompt>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(25, 25, 25, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-light);
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ForgotPassword = styled.a`
  font-size: 0.8rem;
  color: var(--primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
  }
  
  &::placeholder {
    color: var(--text-gray);
  }
`;

const EmailIcon = styled.span`
  position: absolute;
  left: 0.8rem;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23AAAAAA'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const PasswordIcon = styled.span`
  position: absolute;
  left: 0.8rem;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23AAAAAA'%3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.8rem;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
`;

const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
  accent-color: var(--primary);
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: var(--text-light);
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DividerText = styled.span`
  padding: 0 1rem;
  color: var(--text-gray);
  font-size: 0.9rem;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-light);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.google {
    &:hover {
      background-color: rgba(219, 68, 55, 0.1);
      border-color: rgba(219, 68, 55, 0.3);
    }
  }
  
  &.github {
    &:hover {
      background-color: rgba(36, 41, 46, 0.1);
      border-color: rgba(36, 41, 46, 0.3);
    }
  }
`;

const GoogleIcon = styled.span`
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23DB4437' d='M12 5c1.617 0 3.101.554 4.286 1.474l3.637-3.47C17.665 1.021 14.844 0 12 0 7.392 0 3.397 2.6 1.386 6.41l4.141 3.199C6.753 7.2 9.257 5 12 5z'/%3E%3Cpath fill='%234285F4' d='M23.896 12.284c0-.81-.103-1.58-.252-2.337H12v4.51h6.723c-.31 1.61-1.192 2.975-2.543 3.894l4.012 3.095c2.347-2.142 3.704-5.294 3.704-9.162z'/%3E%3Cpath fill='%23FBBC05' d='M5.418 14.483c-.24-.712-.382-1.473-.382-2.266 0-.79.142-1.55.382-2.26L1.386 6.41C.547 8.142 0 10.042 0 12.217c0 2.176.547 4.076 1.386 5.806l4.032-3.54z'/%3E%3Cpath fill='%2334A853' d='M12 24c3.183 0 5.865-1.022 7.822-2.759l-4.012-3.095c-1.106.749-2.54 1.19-4.08 1.19-2.743 0-5.247-2.2-6.108-5.113L1.386 17.76C3.397 21.57 7.392 24 12 24z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const GithubIcon = styled.span`
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFFFFF'%3E%3Cpath d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const SignupPrompt = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-gray);
`;

const SignupLink = styled.a`
  color: var(--primary);
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default LoginForm;