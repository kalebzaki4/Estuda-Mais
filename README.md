# Estuda+ Frontend: O Seu Companheiro de Estudos Interativo e Inteligente

Bem-vindo ao repositório frontend do **Estuda+**! Esta aplicação web interativa, desenvolvida com **React** e estilizada com **Tailwind CSS**, foi meticulosamente criada para transformar a sua experiência de aprendizagem. Com um design intuitivo, foco na usabilidade e funcionalidades inteligentes, o Estuda+ é o seu parceiro definitivo para organizar, explorar e monitorar o seu percurso de estudos de forma eficaz e motivadora.

## 📚 Tabela de Conteúdos

1.  [🌟 Destaques e Funcionalidades Principais](#-destaques-e-funcionalidades-principais)
2.  [🚀 Tecnologias e Ferramentas](#-tecnologias-e-ferramentas)
3.  [🛠️ Como Configurar e Rodar o Projeto Localmente](#%EF%B8%8F-como-configurar-e-rodar-o-projeto-localmente)
    * [Pré-requisitos](#pré-requisitos)
    * [Instalação](#instalação)
    * [Rodar o Aplicativo](#rodar-o-aplicativo)
4.  [🌐 Deploy no GitHub Pages](#-deploy-no-github-pages)
5.  [🎨 Paleta de Cores](#-paleta-de-cores)
6.  [📈 Status do Projeto e Próximos Passos](#-status-do-projeto-e-próximos-passos)
7.  [🤝 Contribuição](#-contribuição)
8.  [📄 Licença](#-licença)
9.  [📧 Contacto](#-contacto)

## 🌟 Destaques e Funcionalidades Principais

O Estuda+ oferece um conjunto robusto e crescente de funcionalidades, desenhadas para otimizar a sua jornada de estudos:

* **Autenticação Segura**:
    * **Login**: Acesso simplificado e seguro à sua conta pessoal.
    * **Registo**: Crie a sua nova conta de forma rápida e intuitiva, com validações inteligentes.
* **Dashboard Dinâmico e Personalizado (Início)**:
    * **Visão Geral Diária**: Um resumo conciso do seu tempo de estudo e progresso recente.
    * **Resumo dos Seus Tópicos de Estudo**: Acompanhe visualmente o tempo dedicado e o progresso em cada área de conhecimento.
    * **Atividade Recente dos Amigos**: Mantenha-se conectado e motivado pela atividade de estudo da sua rede de amigos.
* **Exploração de Cursos Abrangente**:
    * Uma vasta biblioteca de cursos, com foco em recursos "Grátis" e curadoria de conteúdo.
    * Integração direta com plataformas externas, como vídeos do YouTube, para um aprendizado flexível e diversificado.
* **Temporizador Pomodoro Integrado**:
    * Ferramenta de gestão de tempo essencial para otimizar o foco, combater a procrastinação e aumentar a produtividade nas suas sessões de estudo.
* **Monitorização Detalhada do Progresso**:
    * Métricas claras e visualizações sobre o seu tempo total de estudo, cursos concluídos e pontos de experiência (XP) acumulados.
    * Secção de **Conquistas** para celebrar os seus marcos de aprendizagem e manter a motivação em alta.
* **Gestão de Perfil de Utilizador**:
    * Visualize e edite as suas informações pessoais e preferências.
    * Acompanhe a sua lista de amigos e as suas interações.
* **Resumo de Estudos Detalhado e Interativo**:
    * Aprofunde-se em qualquer tópico de estudo com uma página dedicada que exibe:
        * Uma descrição aprofundada do conteúdo.
        * Um registo cronológico das suas atividades recentes de estudo.
        * Links diretos para recursos relevantes no YouTube, cuidadosamente selecionados.
* **Design Responsivo e Acessível**:
    * A interface adapta-se perfeitamente a qualquer tamanho de ecrã, proporcionando uma excelente experiência de utilizador em dispositivos desktop, tablets e telemóveis.
* **Tema Escuro Moderno e Ergonómico**:
    * Uma paleta de cores cuidadosamente selecionada (preto, roxo e branco) para reduzir a fadiga ocular durante longas sessões de estudo e proporcionar uma estética elegante e focada.

## 🚀 Tecnologias e Ferramentas

Este projeto foi construído utilizando as seguintes tecnologias de ponta, escolhidas pela sua robustez, flexibilidade e capacidade de criar experiências de utilizador de alta qualidade:

* **Frontend**:
    * **React**: A biblioteca JavaScript líder para a construção de interfaces de utilizador dinâmicas e reativas. Escolhido pela sua arquitetura baseada em componentes, que facilita a manutenção e escalabilidade do código.
    * **Tailwind CSS**: Um framework CSS utilitário que permite a construção rápida de designs personalizados e responsivos diretamente no HTML, promovendo um desenvolvimento ágil e consistente.
    * **gh-pages**: Uma ferramenta simples e eficaz para automatizar o processo de deploy do frontend diretamente para o GitHub Pages.

## 🛠️ Como Configurar e Rodar o Projeto Localmente

Siga estas instruções detalhadas para ter uma cópia do projeto rodando em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

* **Node.js** (versão 14 ou superior, que inclui o npm): [Baixar Node.js](https://nodejs.org/en/)
* **Git**: [Baixar Git](https://git-scm.com/downloads)

### Instalação

1.  **Clone o repositório:**
    Abra o seu terminal (PowerShell, Git Bash, CMD, etc.) e execute o comando para clonar o projeto:
    ```bash
    git clone [https://github.com/](https://github.com/)<SEU_USUARIO_GITHUB>/estuda-mais-frontend.git
    ```
    *(Substitua `<SEU_USUARIO_GITHUB>` pelo seu nome de utilizador do GitHub e `estuda-mais-frontend` pelo nome real do seu repositório).*

2.  **Navegue até o diretório do projeto frontend:**
    Após a clonagem, entre na pasta do projeto:
    ```bash
    cd estuda-mais-frontend
    ```
    *(Se você clonou para um diretório específico, como `C:\Users\kalebzaki\Downloads\Estuda +\estuda-mais\frontend`, certifique-se de navegar para ele).*

3.  **Instale as dependências:**
    No diretório do projeto, instale todas as bibliotecas e pacotes necessários:
    ```bash
    npm install
    # Ou, se preferir Yarn:
    # yarn install
    ```

### Rodar o Aplicativo

No diretório do projeto (`estuda-mais-frontend`), você pode iniciar o aplicativo em modo de desenvolvimento:

```bash
npm start
# Ou, se o seu projeto foi criado com Vite:
# npm run dev
