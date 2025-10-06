import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

// Ícones para os cursos
const ProgrammingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const FrontendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const DataScienceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
    <path d="M20 2a10 10 0 1 0 10 10H20V2z" transform="translate(-8 0)"></path>
    <path d="M2 12a10 10 0 1 0 10 10V12H2z"></path>
    <path d="M12 12a10 10 0 1 0 10 10V12H12z"></path>
  </svg>
);

const DevOpsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
    <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
    <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
    <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
    <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
    <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
  </svg>
);

const UXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const MobileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const InnovationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a044ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// Componente de login
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha na autenticação');
      }

      // Armazenar o token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirecionar para a página principal
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Ocorreu um erro durante o login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-login-column">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Já estuda com a gente?</h2>
            <p>Faça seu login e boa aula!</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-container" style={{ position: 'relative' }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Seu email"
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#a044ff',
                  opacity: '0.7'
                }}>
                  @
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-container" style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Sua senha"
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#a044ff',
                  opacity: '0.7'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
              </div>
              <Link to="/forgot-password" className="auth-link">Esqueci minha senha</Link>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Entrando...' : 'ENTRAR'}
            </button>
            
            <button type="button" className="auth-social-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              ENTRAR COM GOOGLE
            </button>
            
            <button type="button" className="auth-social-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              ENTRAR COM GITHUB
            </button>
          </form>

          <div className="auth-footer">
            Primeiro acesso? <Link to="/register">Crie sua conta</Link>
          </div>
        </div>
      </div>

      <div className="auth-presentation-column">
        <div className="presentation-header">
          <h2>Ainda não estuda com a gente?</h2>
          <p>São mais de mil cursos nas seguintes áreas:</p>
        </div>

        <div className="courses-grid">
          <div className="course-card">
            <div className="course-icon">
              <ProgrammingIcon />
            </div>
            <div className="course-title">ESCOLA PROGRAMAÇÃO</div>
            <div className="course-description">Lógica de programação, .NET, Automação e Produtividade</div>
            <div className="course-tags">
              <span className="course-tag">C#</span>
              <span className="course-tag">.NET</span>
              <span className="course-tag">Python</span>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">
              <FrontendIcon />
            </div>
            <div className="course-title">ESCOLA FRONT-END</div>
            <div className="course-description">HTML e CSS, React, Vue.js</div>
            <div className="course-tags">
              <span className="course-tag">HTML</span>
              <span className="course-tag">CSS</span>
              <span className="course-tag">React</span>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">
              <DataScienceIcon />
            </div>
            <div className="course-title">ESCOLA DATA SCIENCE</div>
            <div className="course-description">SQL e Banco de Dados, Engenharia de Dados, Análise de Dados</div>
            <div className="course-tags">
              <span className="course-tag">SQL</span>
              <span className="course-tag">Python</span>
              <span className="course-tag">BI</span>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">
              <AIIcon />
            </div>
            <div className="course-title">ESCOLA INTELIGÊNCIA ARTIFICIAL</div>
            <div className="course-description">IA para Cientistas, IA para Programadores, IA para Negócios</div>
            <div className="course-tags">
              <span className="course-tag">Machine Learning</span>
              <span className="course-tag">Deep Learning</span>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">
              <DevOpsIcon />
            </div>
            <div className="course-title">ESCOLA DEVOPS</div>
            <div className="course-description">Linux, PHP/Ops, SRE</div>
            <div className="course-tags">
              <span className="course-tag">Linux</span>
              <span className="course-tag">Docker</span>
              <span className="course-tag">Kubernetes</span>
            </div>
          </div>

          <div className="course-card">
            <div className="course-icon">
              <UXIcon />
            </div>
            <div className="course-title">ESCOLA UX & DESIGN</div>
            <div className="course-description">UI Design, Design Systems, UX Writing</div>
            <div className="course-tags">
              <span className="course-tag">Figma</span>
              <span className="course-tag">Design</span>
              <span className="course-tag">UX</span>
            </div>
          </div>
        </div>

        <button className="cta-button">Ainda não estuda com a gente? Matricule-se agora!</button>
      </div>
    </div>
  );
};

export default Login;