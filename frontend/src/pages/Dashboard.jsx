import React from 'react'
import BackgroundDecor from '../components/visual/BackgroundDecor'
import OrbitEstudaPlus from '../components/visual/OrbitEstudaPlus'
import BrandPanel from '../components/visual/BrandPanel'
import PressableButton from '../components/ui/PressableButton'
import Divider from '../components/ui/Divider'

export default function Dashboard() {
  return (
    <BackgroundDecor className="min-h-screen text-white">
      <section className="container mx-auto px-6 py-10">
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 items-center">
          <div className="relative">
            <OrbitEstudaPlus className="-z-10" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Bem-vindo ao seu painel</h1>
            <p className="text-white/80 mb-6 max-w-2xl">Veja recomendações, progresso de estudos e atalhos para cursos e comunidades. Esta página é apenas um exemplo de layout; nada no login/cadastro foi alterado.</p>
            <div className="flex gap-3">
              <PressableButton className="bg-[#6A3AF2] hover:bg-[#5b31d4] px-5 py-3">Explorar cursos</PressableButton>
              <PressableButton className="bg-white/10 hover:bg-white/20 px-5 py-3">Ver comunidade</PressableButton>
            </div>
            <Divider label="Atalhos" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Favoritos','Continuar','Novo curso','Certificados','Eventos','Mentorias'].map((x) => (
                <div key={x} className="rounded-xl bg-white/5 border border-white/10 p-4">{x}</div>
              ))}
            </div>
          </div>
          <BrandPanel className="md:ml-auto" />
        </div>
      </section>
    </BackgroundDecor>
  )
}