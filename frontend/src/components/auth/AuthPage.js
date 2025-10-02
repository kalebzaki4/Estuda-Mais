import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login'); // eslint-disable-line no-unused-vars

  return (
    <PageContainer>
      <ContentContainer>
        <LeftSection>
          <BrandContainer>
            <BrandLogo>Estuda<span>+</span></BrandLogo>
            <BrandTagline>Sua jornada de aprendizado começa aqui</BrandTagline>
          </BrandContainer>
          
          <FeaturesList>
            <FeatureItem>
              <FeatureIcon className="track" />
              <FeatureText>
                <FeatureTitle>Acompanhamento personalizado</FeatureTitle>
                <FeatureDescription>Monitore seu progresso e receba recomendações baseadas no seu perfil de aprendizado.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon className="community" />
              <FeatureText>
                <FeatureTitle>Comunidade ativa</FeatureTitle>
                <FeatureDescription>Conecte-se com outros estudantes, compartilhe conhecimento e participe de desafios em grupo.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <FeatureIcon className="resources" />
              <FeatureText>
                <FeatureTitle>Recursos exclusivos</FeatureTitle>
                <FeatureDescription>Acesse materiais de estudo, projetos práticos e mentorias com profissionais da área.</FeatureDescription>
              </FeatureText>
            </FeatureItem>
          </FeaturesList>
          
          <TestimonialContainer>
            <QuoteIcon />
            <TestimonialText>O Estuda+ transformou minha forma de estudar tecnologia. Em apenas 6 meses, consegui minha primeira vaga como desenvolvedor!</TestimonialText>
            <TestimonialAuthor>— Carlos Silva, Desenvolvedor Front-end</TestimonialAuthor>
          </TestimonialContainer>
        </LeftSection>
        
        <RightSection>
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </RightSection>
      </ContentContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #121212;
  color: #f5f5f5;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  background: linear-gradient(135deg, #2b1a3d 0%, #1a1a2e 100%);
  
  @media (max-width: 1024px) {
    padding: 2rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 1024px) {
    min-height: 100vh;
  }
`;

const BrandContainer = styled.div`
  margin-bottom: 3rem;
`;

const BrandLogo = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
  
  span {
    color: var(--primary);
  }
`;

const BrandTagline = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(138, 43, 226, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &.track {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238a2be2'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm3-8h-2V7h-2V5h2V3h2v2h2v2h-2z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 28px;
  }
  
  &.community {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238a2be2'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 28px;
  }
  
  &.resources {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238a2be2'%3E%3Cpath d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 28px;
  }
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f5f5f5;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
`;

const TestimonialContainer = styled.div`
  position: relative;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 4px solid var(--primary);
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -12px;
  left: 16px;
  width: 24px;
  height: 24px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '"';
    font-size: 24px;
    font-weight: bold;
    color: white;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
`;

const TestimonialAuthor = styled.p`
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
`;

export default AuthPage;