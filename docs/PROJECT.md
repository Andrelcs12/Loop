# Loop — projeto

O Loop é um aplicativo mobile-first para reduzir a fricção entre ter tarefas e começar a melhor próxima ação.

Estado atual: monorepo com Expo mobile, API Nest/Fastify, Supabase Auth e PostgreSQL via Prisma. Autenticação, usuário de domínio, Setup persistido e Task V1 já estão implementados.

Módulos implementados: autenticação Google e email/senha via Supabase, bootstrap de sessão, `GET /me`, Setup com rascunho/conclusão, Commitment inicial e Tasks persistidas.

Fluxo funcional: login → sessão Supabase → token Bearer → Nest → User do domínio → Setup ou Home conforme `setupCompleted` → criar/listar Tasks pela API.

Milestone atual: validar manualmente o fluxo completo de Task V1. Próximo milestone, depois disso, é execução real de uma Task com histórico.
