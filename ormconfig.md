
### Configuração em ts 
{
"type" : "postgres",
"host" : "localhost",
"port" : 5432,
"username" : "postgres",
"password" : "aqui vem sua senha",
"database" : "api-vendas",
"entities": ["./src/modules/**/typeorm/entities/*.ts"],
"migrations": [
"./src/shared/typeorm/migrations/*.ts"
],
"cli": {
"migrationsDir": "./src/shared/typeorm/migrations"
}
}


### Configuração em js

{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "aqui vem sua senha",
  "database": "api-vendas",
  "entities": ["./dist/modules/**/typeorm/entities/*.js"],
  "migrations": [
    "./dist/shared/typeorm/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./dist/shared/typeorm/migrations"
  }
}
