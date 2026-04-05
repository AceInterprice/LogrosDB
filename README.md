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

## Actualizaciones

Se agregaron nuevos enpoint que son para users que se dividen por roles
en el router de Usuarios podras observar cuales son:
Admin
REQUEST RECIBIDO: GET /api/users
REQUEST RECIBIDO: PATCH /api/users/1
REQUEST RECIBIDO: DELETE /api/users/2
User
REQUEST RECIBIDO: GET /api/users/me

Nota: los que son para usuarios tienen la parte del me. para poder pasar el token por postman, activa la parte del bearer token

tambien se cuenta que para la aparte del get hay un filtrado por nombre, email y role. 
ejemplo: 
REQUEST RECIBIDO: GET /api/users?role=USER


