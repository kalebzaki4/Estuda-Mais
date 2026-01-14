import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.css'
import HighlightsCarousel from '../components/ui/HighlightsCarousel.jsx'
import { LuBookOpen, LuShieldCheck, LuTrendingUp, LuUsers, LuTrophy, LuStar } from 'react-icons/lu'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto text-center ${styles.heroContainer}`}>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-500/20 backdrop-blur-sm mb-6">
              <LuBookOpen size={40} className="text-brand-300" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Bem-vindo ao <span className="text-brand-300">Estuda +</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              A plataforma de aprendizado contínuo que transforma sua jornada educacional. 
              Acesse conteúdos personalizados, acompanhe seu progresso e alcance seus objetivos.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${styles.ctaGroup}`}>
              <Link
                to="/signup"
                className="px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
              >
                Comece Agora
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques Section - Carousel Placeholder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-800 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 animate-slide-in-up">
            Destaques do Estuda+
          </h2>
          <div className="relative w-full overflow-hidden rounded-2xl shadow-soft border border-white/10 h-96">
            {/* Highlights carousel component */}
            <div id="home-highlights" className="p-3 md:p-6">
              <HighlightsCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Por que escolher o Estuda+?
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-in-up ${styles.featureGrid}`}>
            <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg group ${styles.featureCard}`}>
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <LuTrendingUp size={24} className="text-brand-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Progresso Personalizado</h3>
              <p className="text-white/70">
                Acompanhe seu desenvolvimento com métricas detalhadas e conteúdo adaptado ao seu ritmo.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <LuUsers size={24} className="text-brand-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Comunidade Ativa</h3>
              <p className="text-white/70">
                Conecte-se com outros estudantes, compartilhe conhecimento e cresça juntos.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <LuTrophy size={24} className="text-brand-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Certificações</h3>
              <p className="text-white/70">
                Ganhe certificados reconhecidos ao concluir cursos e comprove suas habilidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-white/10 animate-slide-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-white/70 mb-6">
              Junte-se a milhares de estudantes que estão transformando seus conhecimentos com o Estuda+.
            </p>
            <div className="flex items-center justify-center gap-2 text-white/80 mb-6 animate-bounce-in">
              <LuShieldCheck size={20} />
              <span>Segurança e privacidade garantidas</span>
            </div>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}