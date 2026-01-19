import { useState, useEffect } from 'react'
import { SiGoogle, SiGithub } from 'react-icons/si'
import { LuBookOpen, LuShieldCheck } from 'react-icons/lu'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { isValidEmail, getPasswordIssues } from '../utils/validators'
import { useAuth } from '../contexts/AuthContextCore.jsx'
import styles from '../styles/Login.module.css'
import * as FM from 'framer-motion'

export default function Login() {
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [touched, setTouched] = useState({ email: false, password: false })
    const [errors, setErrors] = useState({ email: '', password: '', general: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const Motion = FM.motion
    const AnimatePresence = FM.AnimatePresence

    const container = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.05, delayChildren: 0.05 } },
        exit: { opacity: 0 }
    }
    const panelVariant = {
        initial: { y: 20, opacity: 0, scale: 0.985, filter: 'blur(8px)' },
        animate: { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 380, damping: 24 } },
        exit: { y: -16, opacity: 0, scale: 0.99, transition: { duration: 0.28, ease: 'easeIn' } }
    }
    const leftVariant = { initial: { x: -16, opacity: 0, scale: 0.99 }, animate: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 26 } } }
    const rightVariant = { initial: { x: 16, opacity: 0, scale: 0.99 }, animate: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 26, delay: 0.03 } } }
    const childVariant = { initial: { opacity: 0, y: 14, scale: 0.985 }, animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } } }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const oauthError = urlParams.get('error');
        if (oauthError) {
            let errorMessage = "Erro de autenticação OAuth. Tente novamente.";
            if (oauthError === "oauth_failed") {
                errorMessage = "Falha na autenticação OAuth. Por favor, tente novamente.";
            } else if (oauthError === "email_already_registered") {
                errorMessage = "Este e-mail já está registrado com outro provedor. Por favor, use o login social correspondente ou faça login com e-mail/senha.";
            } else if (oauthError === "email_not_found") {
                errorMessage = "E-mail não encontrado. Por favor, registre-se ou tente outro provedor.";
            }
            setErrors(prevErrors => ({ ...prevErrors, general: errorMessage }));
        }
    }, [location]);

    return (
        <Motion.main
            className={`page-login ${styles.loginPage} ${styles.pageRoot}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={container}
        >
            <div className={styles.backgroundElements}>
                <div className={styles.floatingOrbs}>
                    <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
                    <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
                    <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
                    <div className={`${styles.floatingOrb} ${styles.floatingOrbLight}`}></div>
                </div>
                <div className={styles.particles}>
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className={`${styles.particle} ${styles.particleWhite} ${styles.particleSnow} ${styles[`particle${i + 1}`]}`}></div>
                    ))}
                </div>
            </div>

            <div className={styles.loginAmbientGlow} aria-hidden="true" />

            <Motion.section
                aria-label="Painel de autenticação"
                className={`${styles.loginPanelRoot} ${styles.loginPanel}`}
                variants={panelVariant}
            >
                <div className={styles.textureSubtle} aria-hidden="true" />

                <Motion.div className={styles.leftPanel} variants={leftVariant}>
                    <div className={`${styles.panelOverlayWrap} ${styles.panelOverlayLight}`} aria-hidden="true" />

                    <div className={styles.leftPanelContent}>
                        <div className={styles.heroIcon}>
                            <Link to="/">
                                <LuBookOpen size={48} className={styles.iconBlack} aria-hidden="true" />
                            </Link>
                        </div>

                        <h2 className={styles.heroTitle}>Conhecimento que inspira</h2>
                        <p className={styles.heroLead}>
                            Aprenda continuamente com conteúdos selecionados e avance na sua jornada.
                        </p>

                        <div className={styles.heroInfo}>
                            <LuShieldCheck aria-hidden="true" />
                            <span>Segurança e privacidade garantidas</span>
                        </div>
                    </div>

                    <div className={`${styles.haloWrap} ${styles.shadowHalo}`} aria-hidden="true" />
                </Motion.div>

                <Motion.div className={`${styles.rightPanel}`} variants={rightVariant}>
                    <div className={`${styles.rightPanelOverlayWrap} ${styles.rightPanelOverlay}`} aria-hidden="true" />

                    <Motion.header className={`${styles.header} ${styles.relativeZ10}`} variants={childVariant}>
                        <h1 className={styles.title}>Entrar</h1>
                        <p className={styles.subtitle}>Bem-vindo de volta. Faça login para continuar.</p>
                        {errors.general && (
                            <div className={`${styles.errorMessageLight} ${styles.errorAlert}`} role="alert">
                                {errors.general}
                            </div>
                        )}
                    </Motion.header>

                    <Motion.div className={`${styles.relativeZ10} ${styles.socialGrid}`} variants={childVariant}>
                        <SocialButton icon={<SiGoogle className={styles.socialIcon} aria-hidden="true" />} label="Entrar com Google" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'} />
                        <SocialButton icon={<SiGithub className={styles.socialIcon} aria-hidden="true" />} label="Entrar com GitHub" onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/github'} />
                    </Motion.div>

                    <Motion.div variants={childVariant}><Divider label="Ou" /></Motion.div>

                    <Motion.form
                        onSubmit={async (e) => {
                            e.preventDefault()
                            setTouched({ email: true, password: true })
                            const newErrors = { email: '', password: '', general: '' }
                            
                            if (!isValidEmail(email)) {
                                newErrors.email = 'Insira um email válido.'
                            }
                            const pwdIssues = getPasswordIssues(password)
                            const blockingIssues = pwdIssues.filter(msg => !msg.startsWith('Recomendado:'))
                            if (blockingIssues.length > 0) {
                                newErrors.password = blockingIssues[0]
                            }
                            
                            if (newErrors.email || newErrors.password) {
                                setErrors(newErrors)
                                return
                            }
                            
                            setLoading(true)
                            setErrors(newErrors) // Limpa erros gerais ao tentar novamente

                            try {
                                const result = await login(email, password);
                                
                                // Verifica se o login retornou sucesso (objeto com token ou flag success)
                                if (result && (result.token || result.success || result.email)) {
                                    navigate("/dashboard");
                                } else {
                                    setErrors({ ...newErrors, general: result?.error || "E-mail ou senha incorretos." });
                                }
                            } catch (err) {
                                console.error("Erro no login:", err);
                                setErrors({ ...newErrors, general: "Erro de conexão com o servidor." });
                            } finally {
                                setLoading(false);
                            }
                        }}
                        className={`${styles.form} ${styles.relativeZ10} ${styles.spaceY4}`}
                        aria-label="Formulário de login"
                        variants={childVariant}
                    >
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                                    className={`${styles.inputBase} ${styles.inputLight} ${touched.email && errors.email ? styles.inputLightError : ''} ${styles.placeholderLight}`}
                                />
                                <span className={styles.inputIcon}>
                                    <FiMail className={styles.iconBlack} aria-hidden="true" />
                                </span>
                            </div>
                            {touched.email && errors.email && (
                                <p className={styles.fieldError}>{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <Motion.div
                                key={showPassword ? "password-visible" : "password-hidden"}
                                className={styles.inputWrapper}
                            >
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                    className={`${styles.inputBase} ${styles.inputLight} ${touched.password && errors.password ? styles.inputLightError : ''} ${styles.placeholderLight}`}
                                />
                                <FiLock className={`${styles.inputIcon} ${styles.iconBlack}`} aria-hidden="true" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className={styles.inputAction}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <Motion.span
                                            key={showPassword ? "eye-off" : "eye-on"}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {showPassword ? <FiEyeOff className={styles.iconBlack} /> : <FiEye className={styles.iconBlack} />}
                                        </Motion.span>
                                    </AnimatePresence>
                                </button>
                            </Motion.div>
                            {touched.password && errors.password && (
                                <p className={styles.fieldError}>{errors.password}</p>
                            )}
                            <div className={styles.rowBetween}>
                                <label className={`inline-flex ${styles.rememberLabel}`}>
                                    <input type="checkbox" />
                                    <span style={{ marginLeft: '8px' }}>Lembrar-me</span>
                                </label>
                                <a href="#" className={styles.link}>Esqueci minha senha</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`${styles.submitButton} ${styles.submitFull}`}
                        >
                            {loading ? <span className={styles.submitSpinner} aria-hidden="true" /> : null}
                            <span>{loading ? 'Entrando...' : 'Entrar'}</span>
                        </button>
                    </Motion.form>

                    <Motion.p className={`${styles.footerText} ${styles.relativeZ10}`} variants={childVariant}>
                        Não tem uma conta?{' '}
                        <Link to="/signup" className={styles.link}>Crie uma agora</Link>
                    </Motion.p>
                </Motion.div>
            </Motion.section>
        </Motion.main>
    )
}

function SocialButton({ icon, label, onClick }) {
    return (
        <button
            type="button"
            className={`${styles.socialButton} ${styles.socialBtn}`}
            aria-label={label}
            onClick={onClick}
        >
            <span className={styles.socialIcon}>{icon}</span>
            <span className={styles.socialLabel}>{label}</span>
        </button>
    )
}

function Divider({ label }) {
    return (
        <div className={styles.dividerWrap} aria-hidden="true">
            <div className={styles.dividerLine} />
            <span className={styles.dividerLabel}>{label}</span>
            <div className={styles.dividerLine} />
        </div>
    )
}