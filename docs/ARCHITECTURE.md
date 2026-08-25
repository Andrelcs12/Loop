# Arquitetura

```text
Expo Mobile / Web
        ↓
Supabase Auth
        ↓ access token
NestJS + Fastify
        ↓
Prisma
        ↓
Supabase PostgreSQL
```

- Mobile: UI, sessão persistida do Supabase, redirect OAuth e consumo da API.
- Supabase Auth: identidade, login Google e email/senha.
- Nest: autenticação de requests, autorização, ownership e regras de domínio.
- Prisma: acesso tipado e migrations do banco de domínio.
- PostgreSQL: dados do Loop.

`SupabaseAuthGuard` valida o Bearer e coloca a identidade confiável no request; `@CurrentUser()` a disponibiliza aos controllers. `GET /me` sincroniza/retorna o User do domínio. O bootstrap mobile aguarda sessão e `/me` antes de encaminhar para auth, setup ou home.

Web local usa `http://localhost:8081` como origem CORS configurável. OAuth usa redirect web permitido em desenvolvimento e, no development build nativo, `loop://auth/callback`.
