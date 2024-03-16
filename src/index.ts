import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Static, TObject } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export function envPlugin<T extends TObject>(env: T): Static<T> {
  const variablesMap = Object.keys(env.properties).reduce(
    (obj, cur) => ({ ...obj, [cur]: cur }),
    {},
  );

  const variablesObject = Object.keys(Bun.env).reduce((carry, variableName) => {
    return variablesMap[variableName as keyof typeof variablesMap]
      ? { ...carry, [variableName]: Bun.env[variableName] }
      : carry;
  }, {});

  const variablesValue = Value.Default(env, variablesObject);

  const compiler = TypeCompiler.Compile(env);
  if (!compiler.Check(variablesValue)) {
    console.error('Your .env file is invalid', [...compiler.Errors(variablesValue)]);
    process.exit();
  }

  return variablesObject;
}
