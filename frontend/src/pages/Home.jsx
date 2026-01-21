import { Link } from 'react-router-dom'
import { FaBookOpen, FaShieldAlt, FaChartLine, FaUsers, FaTrophy } from 'react-icons/fa'
import * as FM from 'framer-motion'
import styles from '../styles/Home.module.css'
import HighlightsCarousel from '../components/ui/HighlightsCarousel.jsx'
import Layout from '../components/layout/Layout.jsx'

const Motion = FM.motion

// Animação principal da página (Entrada/Saída)
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.2, ease: 'easeIn' } 
  }
}

// Animação para itens individuais (Hero)
const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: 'easeOut' } 
  }
}

// Animação para seções ao scrollar
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut',
      staggerChildren: 0.1 
    } 
  }
}

// Animação para cards (Features)
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: 'easeOut' } 
  }
}

export default function Home() {
  return (
    <Motion.div 
      className="w-full"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Layout>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className={`max-w-7xl mx-auto text-center ${styles.heroContainer}`}>
            <div className="mb-8">
              <Motion.div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-500/20 backdrop-blur-sm mb-6"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <FaBookOpen size={40} className="text-brand-300" />
              </Motion.div>
              
              <Motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                Bem-vindo ao <span className="text-brand-300">Estuda +</span>
              </Motion.h1>
              
              <Motion.p 
                className="text-xl text-white/70 max-w-3xl mx-auto mb-8"
                variants={itemVariants}
              >
                A plataforma de aprendizado contínuo que transforma sua jornada educacional. 
                Acesse conteúdos personalizados, acompanhe seu progresso e alcance seus objetivos.
              </Motion.p>
              
              <Motion.div 
                className={`flex flex-col sm:flex-row gap-4 justify-center ${styles.ctaGroup}`}
                variants={itemVariants}
              >
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
              </Motion.div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <Motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto">
            <Motion.h2 
              className="text-3xl font-bold text-center text-white mb-12"
              variants={itemVariants}
            >
              Destaques do Estuda+
            </Motion.h2>
            <Motion.div 
              className="relative w-full overflow-hidden rounded-2xl shadow-soft border border-white/10 h-96"
              variants={itemVariants}
            >
              <div id="home-highlights" className="p-3 md:p-6">
                <HighlightsCarousel />
              </div>
            </Motion.div>
          </div>
        </Motion.section>

        {/* Features Section */}
        <Motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto">
            <Motion.h2 
              className="text-3xl font-bold text-center text-white mb-12"
              variants={itemVariants}
            >
              Por que escolher o Estuda+?
            </Motion.h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${styles.featureGrid}`}>
              {/* Feature 1 */}
              <Motion.div 
                className={`p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 group ${styles.featureCard}`}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaChartLine size={24} className="text-brand-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Progresso Personalizado</h3>
                <p className="text-white/70">
                  Acompanhe seu desenvolvimento com gráficos detalhados e conteúdo cheio de recompensa.
                </p>
              </Motion.div>
              
              {/* Feature 2 */}
              <Motion.div 
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 group"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaUsers size={24} className="text-brand-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Comunidade Ativa</h3>
                <p className="text-white/70">
                  Conecte-se com outros estudantes, compartilhe conhecimento e cresça juntos.
                </p>
              </Motion.div>
              
              {/* Feature 3 */}
              <Motion.div 
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 group"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaTrophy size={24} className="text-brand-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Gamificação</h3>
                <p className="text-white/70">
                  Ganhe conquistas, suba no ranking e mantenha-se motivado todos os dias.
                </p>
              </Motion.div>
            </div>
          </div>
        </Motion.section>

        {/* CTA Section */}
        <Motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Motion.div 
              className="p-8 rounded-2xl bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-white/10"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Pronto para começar sua jornada?
              </h2>
              <p className="text-white/70 mb-6">
                Junte-se a milhares de estudantes que estão transformando seus conhecimentos com o Estuda+.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80 mb-6">
                <FaShieldAlt size={20} />
                <span>Segurança e privacidade garantidas</span>
              </div>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
              >
                Criar Conta Grátis
              </Link>
            </Motion.div>
          </div>
        </Motion.section>
      </Layout>
    </Motion.div>
  )
}
