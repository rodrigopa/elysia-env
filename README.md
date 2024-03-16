# Elysia Env

## Installing
```bash
bun add elysia-env
```

Example code:
```typescript
const env = t.Object({
  TOKEN: t.String(),
});

declare module 'elysia' {
  class Elysia {
    public env: Static<typeof env>;
  }
}

const app = new Elysia()
  .decorate('env', envPlugin(env))
  .get('/', ({ env }) => `Hello World ${env.TOKEN}`)
  .listen(3000);
```
