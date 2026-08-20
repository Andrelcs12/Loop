# Loop

> **Você não precisa de outra lista de tarefas. Precisa saber o que fazer agora.**

O **Loop** é um aplicativo de produtividade B2C, mobile-first, criado para reduzir a fricção entre **ter coisas para fazer** e **começar a executar a melhor próxima ação possível**.

Em vez de funcionar apenas como mais um gerenciador de tarefas, o Loop busca responder uma pergunta simples:

> **O que eu deveria fazer agora?**

---

## O problema

As pessoas já possuem:

- tarefas;
- compromissos;
- hábitos;
- projetos;
- objetivos;
- calendários.

O problema muitas vezes não é falta de organização.

O problema aparece na hora de decidir:

- o que fazer primeiro;
- o que cabe no tempo disponível;
- o que realmente importa agora;
- o que deve ser adiado;
- como reagir quando o dia muda.

O Loop existe para reduzir essa carga de decisão.

---

## Exemplo

```text
10:35

Próximo compromisso
Faculdade · 11:30

Tempo disponível
43 minutos

FAÇA AGORA

Finalizar filtro do dashboard
~30 min
Prioridade alta

[ COMEÇAR ]

Outras opções:
• responder candidatura
• revisar estrutura de dados
```

---

## Princípios do produto

- **Execução acima de organização**
- **Mobile-first**
- **Baixa carga cognitiva**
- **Recomendações claras**
- **Simples antes de inteligente**
- **Útil antes de complexo**

---

## Stack

### Mobile

- React Native
- Expo
- Expo Router
- NativeWind
- TypeScript

### Web

- Next.js
- React
- TypeScript
- Tailwind CSS

### Monorepo

- pnpm
- Turborepo

---

## Estrutura

```text
loop/
├── apps/
│   ├── mobile/
│   └── web/
│
├── packages/
│   ├── design-tokens/
│   ├── types/
│   ├── utils/
│   └── config/
│
├── README.md
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Packages compartilhados

### `@loop/design-tokens`

Tokens visuais compartilhados entre as aplicações:

- cores;
- tipografia;
- espaçamento;
- border radius.

### `@loop/types`

Tipos compartilhados do domínio.

### `@loop/utils`

Funções puras reutilizáveis entre diferentes partes do projeto.

### `@loop/config`

Configurações compartilhadas do monorepo.

---

## Status

O Loop está atualmente em **desenvolvimento inicial**.

O foco atual é construir:

- fundação técnica;
- experiência mobile;
- identidade visual;
- gerenciamento de tarefas;
- fluxo inicial de recomendação **Faça Agora**.

A arquitetura e o produto poderão evoluir conforme o uso real e o feedback dos usuários.

---

## Desenvolvimento

### Requisitos

- Node.js
- pnpm

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev
```

---

## Filosofia

O Loop está sendo construído como um produto real, não como um projeto demonstrativo.

O ciclo esperado é:

```text
hipótese
→ construção
→ uso
→ observação
→ aprendizado
→ melhoria
```

O objetivo não é possuir mais funcionalidades que outros aplicativos.

O objetivo é fazer uma coisa especialmente bem:

> **reduzir o tempo entre decidir e começar.**

---

## Licença

O projeto está em desenvolvimento e não possui autorização para reutilização irrestrita do código, marca ou identidade visual, salvo indicação explícita em contrário.
