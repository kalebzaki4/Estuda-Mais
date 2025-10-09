# React + Vite

Este modelo fornece uma configuração mínima para que o React funcione no Vite com HMR e algumas regras ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Babel](https://babeljs.io/) (ou [oxc](https://oxc.rs) quando usado em [rolldown-vite](https://vite.dev/guide/rolldown)) para Atualização Rápida
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/) para Atualização Rápida

## Compilador React

O Compilador React não está habilitado neste modelo devido ao seu impacto no desempenho de desenvolvimento e compilação. Para adicioná-lo, consulte [esta documentação](https://react.dev/learn/react-compiler/installation).

## Expandindo a configuração do ESLint

Se você estiver desenvolvendo um aplicativo de produção, recomendamos usar TypeScript com regras de lint com reconhecimento de tipo habilitadas. Confira o [modelo TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para obter informações sobre como integrar TypeScript e [`typescript-eslint`](https://typescript-eslint.io) ao seu projeto.
