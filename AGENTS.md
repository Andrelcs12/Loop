# Loop — Instruções para Agentes de IA

Este documento define o contexto técnico, arquitetural e de produto que deve orientar qualquer agente de IA trabalhando no projeto **Loop**.

Antes de realizar mudanças relevantes, leia este arquivo e preserve as decisões existentes.

---

# 1. Produto

O Loop é um aplicativo B2C mobile-first que busca reduzir a fricção entre:

> **ter coisas para fazer**

e

> **começar a executar a melhor próxima ação possível.**

A tese central é:

> **As pessoas não precisam de mais uma lista de tarefas. Elas precisam saber o que fazer agora.**

O objetivo principal não é criar um gerenciador de tarefas extremamente completo.

O objetivo é ajudar o usuário a responder:

> **O que eu deveria fazer agora?**

---

# 2. Princípios do produto

Priorize:

1. execução;
2. simplicidade;
3. velocidade;
4. baixo esforço cognitivo;
5. clareza;
6. utilidade real.

Evite adicionar funcionalidades simplesmente porque são comuns em outros aplicativos de produtividade.

Antes de criar algo novo, pergunte:

- isso ajuda o usuário a decidir ou começar?
- isso reduz fricção?
- existe necessidade real agora?
- pode ser implementado de forma mais simples?

---

# 3. Filosofia de engenharia

O projeto deve permanecer simples enquanto o produto ainda está sendo validado.

Evitar:

- abstração prematura;
- overengineering;
- packages sem uso real;
- camadas arquiteturais desnecessárias;
- dependências adicionadas sem necessidade;
- sistemas genéricos para problemas que ainda não existem.

Preferir:

```text
problema real
→ implementação mínima
→ validação
→ evolução
```

Não construir infraestrutura baseada apenas em possibilidades futuras.

---

# 4. Monorepo

O projeto utiliza:

- pnpm;
- pnpm workspaces;
- Turborepo;
- TypeScript.

Estrutura principal:

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

Não criar novos apps ou packages sem necessidade concreta.

---

# 5. Mobile

Caminho:

```text
apps/mobile
```

Stack:

- React Native;
- Expo;
- Expo Router;
- TypeScript;
- NativeWind.

O mobile é a experiência principal do produto.

Priorize sempre a experiência mobile ao tomar decisões de produto.

Estrutura esperada:

```text
apps/mobile/
├── app/
├── assets/
├── components/
├── features/
├── hooks/
├── lib/
├── app.json
└── package.json
```

---

# 6. Web

Caminho:

```text
apps/web
```

Stack:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS.

A web deve inicialmente servir principalmente para:

- landing page;
- apresentação do produto;
- autenticação quando necessário;
- configurações futuras;
- experiências que façam mais sentido em desktop.

Não transformar a aplicação web na experiência principal sem uma decisão explícita de produto.

---

# 7. Backend

Ainda não adicionar arquitetura backend complexa antecipadamente.

Possibilidades futuras incluem:

- NestJS;
- PostgreSQL;
- Supabase;
- API dedicada.

A decisão deve ser tomada a partir dos requisitos reais da primeira versão.

Não criar `apps/api` apenas porque provavelmente será necessário no futuro.

---

# 8. Packages

## `@loop/design-tokens`

Responsável pelos tokens de identidade visual.

Pode conter:

```text
colors
typography
spacing
radius
```

Não colocar componentes React nesse package.

Não colocar CSS dependente de Next.js ou React Native.

Os tokens devem permanecer independentes de framework sempre que possível.

---

## `@loop/types`

Responsável por tipos compartilhados de domínio.

Exemplos:

```ts
TaskPriority;
TaskStatus;
Task;
```

Evitar criar modelos especulativos.

Somente adicionar tipos quando houver uso concreto.

---

## `@loop/utils`

Responsável por funções puras reutilizáveis.

Exemplo:

```ts
minutesToLabel(90);
// "1h 30min"
```

Não colocar:

- acesso a banco;
- código React;
- dependências de framework;
- estado global.

---

## `@loop/config`

Responsável por configurações compartilhadas.

Inicialmente:

- TypeScript;
- configurações comuns realmente reutilizadas.

Evitar transformar esse package em depósito de arquivos diversos.

---

# 9. UI compartilhada

Não criar inicialmente:

```text
packages/ui
```

Os componentes visuais de web e mobile podem ser diferentes.

Exemplo:

```text
apps/web/components/button.tsx
apps/mobile/components/button.tsx
```

Compartilhar:

- tokens;
- tipos;
- regras;
- schemas;
- funções.

Não forçar compartilhamento de componentes entre DOM e React Native.

---

# 10. Design

O Loop deve transmitir:

- clareza;
- calma;
- modernidade;
- precisão;
- foco.

Evitar excesso de:

- gradients;
- sombras;
- elementos decorativos;
- animações longas;
- informação simultânea;
- interfaces extremamente coloridas.

O design deve colocar o foco em:

```text
contexto atual
+
melhor próxima ação
+
ação principal
```

---

# 11. Tipografia

Fonte principal inicial:

```text
Inter
```

A configuração da fonte deve ser específica de cada plataforma.

Exemplo:

```text
Next.js
→ next/font

Expo
→ expo-font
```

O package de design tokens deve apenas definir a identidade tipográfica.

---

# 12. Cores

Não espalhar hexadecimal arbitrariamente pelos componentes.

Preferir tokens definidos em:

```text
@loop/design-tokens
```

Se uma nova cor for recorrente e fizer parte do sistema visual, adicionar um token apropriado.

Evitar criar tokens para cada pequeno caso isolado.

---

# 13. Espaçamento

Utilizar preferencialmente escala baseada em múltiplos de `4px`.

Exemplo:

```text
4
8
12
16
20
24
32
40
48
64
```

Evitar valores arbitrários sem necessidade visual clara.

---

# 14. Domínio inicial

Uma tarefa poderá inicialmente possuir conceitos como:

```text
id
title
description
priority
status
estimatedMinutes
dueAt
createdAt
updatedAt
```

Prioridades iniciais:

```text
LOW
MEDIUM
HIGH
```

Estados iniciais:

```text
PENDING
IN_PROGRESS
COMPLETED
```

Não adicionar dezenas de estados antecipadamente.

---

# 15. Faça Agora

O coração do produto é a experiência:

```text
FAÇA AGORA
```

A primeira versão da recomendação não precisa utilizar inteligência artificial.

Preferir regras determinísticas inicialmente.

Exemplo:

```text
tarefas pendentes
→ tarefas que cabem no tempo disponível
→ prioridade
→ prazo
→ duração
→ melhor opção
```

Isso deve permanecer:

- previsível;
- testável;
- compreensível;
- explicável.

Inteligência artificial pode ser adicionada posteriormente se houver vantagem concreta.

---

# 16. Uso de IA no desenvolvimento

IA pode:

- criar boilerplate;
- sugerir implementação;
- criar testes;
- revisar código;
- pesquisar documentação;
- identificar bugs;
- propor refactors.

IA não deve decidir automaticamente:

- arquitetura inteira;
- escopo do produto;
- modelos críticos;
- segurança;
- dependências;
- novas abstrações.

Mudanças relevantes devem ser justificadas.

---

# 17. Segurança

Nunca:

- colocar tokens no código;
- colocar chaves privadas em prompts;
- versionar `.env`;
- confiar em dados vindos do cliente;
- expor informações sensíveis em logs.

Sempre:

- validar entrada;
- utilizar variáveis de ambiente;
- aplicar permissões mínimas;
- tratar dados externos como não confiáveis.

---

# 18. Dependências

Antes de instalar nova dependência:

1. verificar se o problema realmente existe;
2. verificar se pode ser resolvido com a stack atual;
3. verificar manutenção e compatibilidade;
4. evitar dependências para problemas triviais.

Não instalar bibliotecas simplesmente para economizar poucas linhas de código.

---

# 19. Qualidade

Depois de mudanças relevantes, executar quando disponível:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Não afirmar que uma mudança está concluída se a validação relevante estiver falhando.

---

# 20. Git

Não realizar commits automaticamente, salvo quando solicitado explicitamente.

Antes de alterar arquitetura relevante:

- revisar estrutura atual;
- preservar padrões existentes;
- evitar renomeações em massa sem necessidade.

Commits devem ser pequenos e semanticamente claros.

Formato preferencial:

```text
feat:
fix:
refactor:
chore:
docs:
test:
```

---

# 21. Código

Priorizar:

- nomes claros;
- funções pequenas;
- tipos explícitos quando aumentarem clareza;
- composição;
- baixo acoplamento;
- código fácil de remover.

Evitar:

- abstrações genéricas prematuras;
- funções gigantes;
- classes sem propósito;
- comentários explicando código ruim;
- `any` sem justificativa.

---

# 22. Organização por feature

Quando uma área crescer, preferir organização orientada a feature.

Exemplo:

```text
features/
└── tasks/
    ├── components/
    ├── hooks/
    ├── services/
    ├── types/
    └── utils/
```

Não criar todas essas pastas antes de existir conteúdo para elas.

---

# 23. Regra para novos arquivos

Não criar arquivo ou diretório apenas para manter uma arquitetura visualmente bonita.

Se existir apenas uma implementação simples, ela pode permanecer próxima de onde é utilizada.

Extraia quando:

- houver reutilização;
- crescer significativamente;
- surgir responsabilidade clara.

---

# 24. Testes

Priorizar testes para:

- regras de domínio;
- recomendação de tarefas;
- cálculos de tempo;
- regras de prioridade;
- casos de borda;
- fluxos críticos.

Evitar testar detalhes internos sem valor.

---

# 25. Documentação

O `README.md` é público e deve permanecer voltado para humanos conhecendo o projeto.

Este `AGENTS.md` é técnico e serve como contexto para agentes de IA.

Se uma decisão arquitetural importante mudar, atualize este arquivo.

---

# 26. Antes de implementar

Ao receber uma tarefa:

1. leia os arquivos relevantes;
2. entenda a arquitetura atual;
3. preserve padrões existentes;
4. implemente a menor solução correta;
5. valide;
6. explique decisões relevantes.

Não reescreva partes não relacionadas ao problema.

---

# 27. Regra principal

Sempre que houver dúvida entre:

```text
mais arquitetura
```

e

```text
menos arquitetura
```

prefira inicialmente:

> **a solução mais simples que preserve qualidade e permita evolução.**

O Loop ainda está em validação.

A prioridade é construir um produto útil, utilizá-lo e aprender com usuários reais.
