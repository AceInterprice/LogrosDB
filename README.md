# 🚀 Backend Logros API

API desarrollada con Node.js, Express y MySQL para gestión de autenticación de usuarios.

---

## 📦 Instalación

Clona el repositorio y ejecuta:

'npm install'

## Crea un .env

Crea un archivo .env en la raíz del proyecto con las siguientes variables:

port=
host=
db_host=
db_user=
db_password=
db_name=
db_port=
jwt_secret=

## Enpoinds

Prefijo para el uso de autentifiacion: /api/auth

POST /api/auth/registro es para el registro, y el Json que se envia es de esta forma: 
{
  "names": "example",
  "first_last_name": "example",
  "second_last_name": "example",
  "email": "example@email.com",
  "password": "examplePassword"
}

POST /api/auth/inicio_sesion para el inicio de secion: 
{
  "email": "example@email.com",
  "password": "examplePassword"
}

Para ver si la base de datos esta conectada usa este enpoint: GET /api/health
debe devolver esto: 
{
  "server": "ok",
  "database": "connected"
}

## Ejecución del proyecto

ejecuta el proyecto en modo dev: 
'npm run dev'

el servidor estara disponible en: http://localhost:3000

