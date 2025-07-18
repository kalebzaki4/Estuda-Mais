Estuda+ Frontend
!(https://placehold.co/800x400/8a2be2/ffffff?text=Estuda%2B+Dashboard+Preview)

Bem-vindo ao repositório frontend do Estuda+! Este é um aplicativo web construído com React e Tailwind CSS, projetado para ajudar estudantes a organizar seus estudos, explorar cursos, monitorar seu progresso e interagir com uma comunidade.

🌟 Funcionalidades
Autenticação: Páginas de Login e Registro de usuários.

Dashboard (Início): Visão geral diária do estudo, resumo dos seus tópicos de estudo e atividade recente dos amigos.

Explorar Cursos: Uma seção para descobrir diversos cursos, todos listados como "Grátis" e com links para recursos externos (como YouTube).

Estudar (Pomodoro): Um temporizador Pomodoro integrado para ajudar na gestão do tempo de estudo e foco.

Progresso: Acompanhe suas métricas de estudo, cursos concluídos, pontos de XP e conquistas.

Perfil: Visualize e edite suas informações de perfil, e veja sua lista de amigos.

Resumo de Estudos Detalhado: Clique em um tópico de estudo no resumo para ver detalhes específicos, atividades recentes e links relevantes do YouTube.

Design Responsivo: Interface adaptável para dispositivos móveis e desktop.

Tema Escuro: Paleta de cores focada em preto, roxo e branco para uma experiência visual agradável.

🚀 Tecnologias Utilizadas
React: Biblioteca JavaScript para construção de interfaces de usuário.

Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

gh-pages: Pacote para facilitar o deploy no GitHub Pages.

🛠️ Como Configurar e Rodar o Projeto Localmente
Siga estas instruções para ter uma cópia do projeto rodando em sua máquina local para desenvolvimento e testes.

Pré-requisitos
Certifique-se de ter o Node.js e o npm (ou Yarn) instalados em sua máquina.

Node.js (inclui npm)

Instalação
Clone o repositório:

git clone https://github.com/<SEU_USUARIO_GITHUB>/estuda-mais-frontend.git

(Substitua <SEU_USUARIO_GITHUB> pelo seu nome de usuário do GitHub e estuda-mais-frontend pelo nome real do seu repositório).

Navegue até o diretório do projeto frontend:

cd estuda-mais-frontend

(Ou cd C:\Users\kalebzaki\Downloads\Estuda +\estuda-mais\frontend se você estiver navegando a partir de um diretório diferente).

Instale as dependências:

npm install
# ou
# yarn install

Rodar o Aplicativo
No diretório do projeto (estuda-mais-frontend), você pode rodar o aplicativo em modo de desenvolvimento:

npm start
# ou
# npm run dev (se o seu projeto foi criado com Vite)

O aplicativo será aberto automaticamente no seu navegador em http://localhost:3000 (ou outra porta, se a 3000 estiver ocupada). As alterações no código serão recarregadas automaticamente.

🌐 Deploy no GitHub Pages
Este projeto está configurado para ser facilmente implantado no GitHub Pages usando o pacote gh-pages.

Certifique-se de que o pacote gh-pages está instalado:

npm install --save-dev gh-pages

Configure o homepage no package.json:
Abra package.json e adicione a linha homepage (se ainda não estiver lá), substituindo SEU_USUARIO_GITHUB e NOME_DO_REPOSITORIO pelos valores corretos:

{
  "name": "estuda-mais-frontend",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://<SEU_USUARIO_GITHUB>.github.io/<NOME_DO_REPOSITORIO>",
  "dependencies": {
    // ...
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  // ...
}

(Se você usa Vite, mude gh-pages -d build para gh-pages -d dist)

Faça o deploy:
Certifique-se de que todas as suas alterações estão comitadas e enviadas para a branch main (ou master) no GitHub. Então, execute:

npm run deploy

Este comando irá construir seu aplicativo e enviá-lo para a branch gh-pages do seu repositório. Seu aplicativo estará disponível no URL configurado em homepage em poucos minutos.

🎨 Paleta de Cores
O projeto utiliza uma paleta de cores consistente para um tema escuro:

Pretos/Cinzas Escuros: #121212 (primário), #1e1e1e (secundário), #2a2a2a (terciário) para fundos e elementos.

Roxos: #8a2be2 (principal), #6a1aae (escuro), #b366ff (claro) para destaque e interatividade.

Branco: #ffffff para texto principal e elementos de alto contraste.

Cinza Claro: #b0b0b0 para texto mutado/secundário.

Bordas: #444444.

Cores de Feedback: Verde para sucesso (#28a745), vermelho para erro (#dc3545), azul para informação (#007bff).

🤝 Contribuição
Contribuições são bem-vindas! Se você tiver sugestões ou quiser reportar um problema, por favor, abra uma issue neste repositório.

📄 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
