# Banco de dados

`auth.users` (Supabase) é a fonte de identidade. `public.users.authUserId` faz a ligação única com o usuário de domínio.

| Model | Responsabilidade e relações |
| --- | --- |
| `User` | Perfil do domínio, `authUserId` único, `setupCompleted`; possui um `UserSetup` e vários `Commitment`. |
| `UserSetup` | Preferências persistidas do onboarding; relação 1:1 com `User` por `userId` único. |
| `Commitment` | Compromisso inicial criado pelo Setup; pertence a `User` e pode estar ligado uma vez ao `UserSetup`. |
| `Task` | Tarefa de produto; pertence a `User`, usa prioridade e status fechados. |

`Task` usa os enums `TaskPriority` (`LOW`, `MEDIUM`, `HIGH`) e `TaskStatus` (`PENDING`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`). O status inicial é `PENDING`. Os índices `(userId, status)` e `(userId, deadline)` atendem às listagens previstas.

As relações têm FKs explícitas e índices para as consultas atuais. RLS está ativo nas tabelas de domínio. O mobile não as acessa diretamente: toda operação passa pelo Nest autenticado e pelo Prisma.

Migrations locais: `create_users`, `add_user_setup_and_commitments` e `add_tasks`. O histórico do Prisma foi sincronizado com o banco já migrado.
