# Crud NestJS

## Technologies
- NestJS
- MySQL / TypeORM
- Docker / Docker compose
- Eslint / Prettier

## Routes

### Authentication
To obtain a JWT to call other routes you must register/login.
```
POST /auth/register

BODY
  {
      login: string
      password: string
  }

RESPONSE
  {
      jwt: string
  }
```

```
POST /auth/login

BODY
  {
      login: string
      password: string
  }

RESPONSE
  {
      jwt: string
  }
```

### Product
This route is protected, you must have JWT in `Authorization` header.

Informations about product are retrieved from [API OpenFoodFact](https://fr.openfoodfacts.org/data)

```
GET /product/[:id]
````
