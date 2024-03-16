import { Elysia, t } from 'elysia';
import { envPlugin } from '../src';
import type { Static } from '@sinclair/typebox';

const env = t.Object({
  TOKEN: t.Numeric(),
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

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
