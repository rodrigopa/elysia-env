import { Elysia, t } from 'elysia';
import { envPlugin } from '../src';

const env = t.Object({
  TOKEN: t.Numeric(),
});

const app = new Elysia()
  .decorate('env', envPlugin(env))
  .get('/', ({ env }) => `Hello World ${env.TOKEN}`)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
