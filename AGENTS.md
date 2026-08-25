# Loop — instruções para agentes

## Stack fixa

- Expo SDK 54, React Native, Expo Router e TypeScript;
- pnpm workspaces e Turborepo;
- NestJS com Fastify;
- Prisma com PostgreSQL hospedado no Supabase;
- Supabase Auth como provedor de identidade.

## Regras de implementação

- Não atualizar Expo, trocar pnpm, migrar a arquitetura ou criar apps/packages sem solicitação explícita.
- Leia o código real e a documentação relevante antes de alterar qualquer área.
- Preserve o monorepo, os padrões existentes e a UI quando a tarefa não for visual.
- Prefira a menor mudança correta; não adicione bibliotecas, camadas, repositories genéricos, CQRS ou microservices sem necessidade concreta.
- Não avance o roadmap além do solicitado. Após milestones importantes, atualize a documentação afetada.

## Segurança

- Supabase Auth é responsável por identidade e senha. O Nest nunca recebe nem armazena senha.
- O mobile nunca contém service role, senha do banco ou Google Client Secret.
- Nunca registre access token, refresh token, senha, Authorization header, connection string ou secret.
- Ownership sempre deriva da identidade validada pelo token; nunca confie em `userId`, `ownerId` ou `authUserId` enviados pelo cliente.
- `.env` não é versionado. `.env.example` contém apenas nomes e placeholders seguros.
- Tabelas de domínio são acessadas pelo mobile exclusivamente pela API Nest, nunca diretamente pelo PostgreSQL/Supabase.

## Forma de trabalho

Para mudanças significativas:

```text
ler AGENTS.md
↓
ler docs relevantes
↓
inspecionar o código real
↓
implementar a menor mudança coerente
↓
validar com os scripts existentes
↓
atualizar a documentação necessária
```
