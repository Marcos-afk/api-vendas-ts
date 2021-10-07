
### Configuração em ts 
{
"type" : "postgres",
"host" : "localhost",
"port" : 5432,
"username" : "postgres",
"password" : "aqui vem sua senha",
"database" : "api-vendas",
"entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
"migrations": [
"./src/shared/infra/typeorm/migrations/*.ts"
],
"cli": {
"migrationsDir": "./src/shared/infra/typeorm/migrations"
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
  "entities": ["./src/modules/**/infra/typeorm/entities/*.js"],
  "migrations": [
  "./src/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
  "migrationsDir": "./src/shared/infra/typeorm/migrations"
 }
}
