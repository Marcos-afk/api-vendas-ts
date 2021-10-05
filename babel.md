# Gerar o Build com o Babel

> Este post é parte do curso de criação de uma API Restful com Node.js, Express, Typescript, TypeORM, Postgres, Redis, Docker, e muito mais.

Apesar de podermos usar o `tsc` para gerar o build de uma aplicação Typescript, em nossa aplicação usaremos  o **Babel** para converter o código Typescript em Javascript, considerando a versão do Node.js instalado em nosso PC.

Pacotes a serem instalados:

```shell
# Babel
@babel/cli
@babel/core
@babel/node

# Presets
@babel/preset-env
@babel/preset-typescript

# Plugins
@babel/plugin-proposal-decorators
@babel/plugin-proposal-class-properties
babel-plugin-module-resolver
babel-plugin-transform-typescript-metadata
```

Instalação:

```shell
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties babel-plugin-module-resolver babel-plugin-transform-typescript-metadata
```

Após a instalação crie o arquivo `babel.config.js` na pasta raiz do projeto com o seguinte conteúdo:

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@modules": "./src/modules",
        "@config": "./src/config",
        "@shared": "./src/shared"
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
}
```

No arquivo `package.json`, criar o script para geração do build da aplicação:

```json
"build": "babel src --extensions \".js,.ts\" --out-dir dist --copy-files"
```

Rodar o script:

```shell
yarn build
```

Se tudo deu certo, estamos com o build criado na pasta `dist`, com a mesma estrutura interna da pasta `src`, porém com os arquivos convertidos para `.js` e prontos para serem disponibilizados em produção no servidor.

### Testando o funcionamento da aplicação final

Podemos executar a aplicação final ainda em ambiente de desenvolvimento para validação do funcionamento.

Para isso, teremos que ajustar provisoriamente o arquivo `ormconfig.json`, alterando os paths e extensões nas configurações do TypeORM.

Rodar a aplicação:

```shell
node dist/shared/http/server.js
```