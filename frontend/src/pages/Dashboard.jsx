import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu';
import Card from '../components/ui/Card';
import TabNavigation from '../components/ui/TabNavigation';
import axios from 'axios';
import {
  MONITORING_PLATFORM_USAGE_ENDPOINT,
  MONITORING_BACKEND_PERFORMANCE_ENDPOINT,
  MONITORING_RESOURCE_MONITORING_ENDPOINT,
} from '../config/apiEndpoints';

const brandPurple = '#7b2ff7';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user-data');
  const [userData, setUserData] = useState(null);
  const [platformUsage, setPlatformUsage] = useState(null);
  const [backendPerformance, setBackendPerformance] = useState(null);
  const [resourceMonitoring, setResourceMonitoring] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'user-data', label: 'Dados do Usuário' },
    { id: 'platform-usage', label: 'Uso da Plataforma' },
    { id: 'backend-performance', label: 'Desempenho do Backend' },
    { id: 'resource-monitoring', label: 'Monitoramento de Recursos' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulação de dados do usuário (ainda não temos um endpoint real para isso)
        setUserData({
          name: 'Usuário Teste',
          email: 'teste@estudamais.com',
          lastLogin: '2023-10-27 10:30',
          accountStatus: 'Ativa',
        });

        const [platformRes, backendRes, resourceRes] = await Promise.all([
          axios.get(MONITORING_PLATFORM_USAGE_ENDPOINT),
          axios.get(MONITORING_BACKEND_PERFORMANCE_ENDPOINT),
          axios.get(MONITORING_RESOURCE_MONITORING_ENDPOINT),
        ]);

        setPlatformUsage(platformRes.data);
        setBackendPerformance(backendRes.data);
        setResourceMonitoring(resourceRes.data);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard.');
        console.error('Erro ao carregar dados do dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-[#0a0a0a] text-white">
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full grid place-items-center bg-[#0a0a0a] text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <main className="page-radial-animated page-login min-h-screen w-full grid place-items-center px-4 relative">
      <div className="background-elements">
        <div className="floating-orbs">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="particles">
          <div className="particle" style={{ left: '10%', animationDelay: '0s' }}></div>
          <div className="particle" style={{ left: '20%', animationDelay: '2s' }}></div>
          <div className="particle" style={{ left: '30%', animationDelay: '4s' }}></div>
          <div className="particle" style={{ left: '40%', animationDelay: '6s' }}></div>
          <div className="particle" style={{ left: '50%', animationDelay: '8s' }}></div>
          <div className="particle" style={{ left: '60%', animationDelay: '10s' }}></div>
          <div className="particle" style={{ left: '70%', animationDelay: '12s' }}></div>
          <div className="particle" style={{ left: '80%', animationDelay: '14s' }}></div>
          <div className="particle" style={{ left: '90%', animationDelay: '16s' }}></div>
        </div>
      </div>

      <div className="absolute -z-0 w-[min(92vw,80rem)] h-[min(38vw,28rem)] card-ambient-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} aria-hidden="true" />

      <section
        aria-label="Dashboard de Monitoramento"
        className="relative w-full max-w-6xl rounded-3xl shadow-soft overflow-hidden bg-surface-800 enter-fade-up"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />

        <div
          className="relative items-center justify-center p-10 animated-gradient"
          style={{ backgroundImage: `linear-gradient(135deg, ${brandPurple}, #6a24d9 60%, #2d0a66)` }}
        >
          <div className="absolute inset-0 opacity-20" aria-hidden="true"
            style={{ background: 'radial-gradient(800px 400px at 20% 20%, rgba(255,255,255,0.15), transparent 60%)' }} />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-glow breathing">
              <LuBookOpen size={48} className="text-white" aria-hidden="true" />
            </div>

            <h2 className="text-white text-3xl font-semibold hover-jitter">Dashboard de Monitoramento</h2>
            <p className="text-white/85 max-w-md">
              Visualize o uso da plataforma, desempenho do backend e monitoramento de recursos.
            </p>

            <div className="mt-6 flex items-center gap-3 text-white/80">
              <LuShieldCheck aria-hidden="true" />
              <span>Dados seguros e atualizados em tempo real</span>
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-16 rounded-full" aria-hidden="true"
            style={{ boxShadow: '0 40px 80px rgba(123,47,247,0.35)' }} />
        </div>

        <div className="relative p-8 sm:p-10">
          <div className="absolute inset-0 ambient-radial pointer-events-none" aria-hidden="true" />

          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="relative z-10 mt-8">
            {activeTab === 'user-data' && userData && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Dados do Usuário</h3>
                <p className="text-white/70">Nome: {userData.name}</p>
                <p className="text-white/70">Email: {userData.email}</p>
                <p className="text-white/70">Último Login: {userData.lastLogin}</p>
                <p className="text-white/70">Status da Conta: {userData.accountStatus}</p>
              </Card>
            )}
            {activeTab === 'platform-usage' && platformUsage && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Uso da Plataforma</h3>
                <p className="text-white/70">Total de Usuários: {platformUsage.totalUsers}</p>
                <p className="text-white/70">Usuários Ativos: {platformUsage.activeUsers}</p>
                <p className="text-white/70">Cursos Concluídos: {platformUsage.coursesCompleted}</p>
                <p className="text-white/70">Aulas Visualizadas: {platformUsage.lessonsViewed}</p>
              </Card>
            )}
            {activeTab === 'backend-performance' && backendPerformance && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Desempenho do Backend</h3>
                <p className="text-white/70">Tempo Médio de Resposta: {backendPerformance.avgResponseTime}</p>
                <p className="text-white/70">Taxa de Erros: {backendPerformance.errorRate}</p>
                <p className="text-white/70">Uptime: {backendPerformance.uptime}</p>
              </Card>
            )}
            {activeTab === 'resource-monitoring' && resourceMonitoring && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Monitoramento de Recursos</h3>
                <p className="text-white/70">Uso da CPU: {resourceMonitoring.cpuUsage}</p>
                <p className="text-white/70">Uso da Memória: {resourceMonitoring.memoryUsage}</p>
                <p className="text-white/70">Uso do Disco: {resourceMonitoring.diskUsage}</p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}