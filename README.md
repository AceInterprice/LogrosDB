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

**Actualizaciones**
 Correo (Resend)
RESEND_API_KEY=re_12345...


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


## Actualizaciones Recientes (Módulo Auth & User)
Se ha reestructurado la API para cumplir con estándares de seguridad industrial y requisitos específicos de negocio:

🔒 Seguridad y Validaciones
Restricción de Dominio: La API ahora solo acepta registros con correos @gmail.com.

Política de Contraseñas: Validación estricta de 8 a 20 caracteres en register y reset-password.

Sistema OTP (One-Time Password): Se implementó la recuperación de contraseña mediante un código de 6 dígitos enviado vía Resend, eliminando vulnerabilidades de redirección.

Gestión de Roles: Sistema de jerarquía donde el rol USER es automático, pero se permite la creación de ADMIN bajo supervisión.

👤 Mejoras en el Módulo de Usuarios
Buscador Inteligente: El endpoint de Admin permite buscar por names, first_last_name o second_last_name en una sola consulta (?search=).

Perfiles Enriquecidos: Se añadió soporte para profile_image_url (Cloudinary ready).

**Unificación de los 4 Módulos**
En lugar de crear código separado, ahora Notes, Tasks, Achievements y Experiences funcionan con una lógica maestra. Esto garantiza que si corriges algo en uno, se mejora en todos automáticamente.

Notes (Notas): Gestión de títulos y descripciones personales.

Tasks (Tareas): Control de pendientes con estados (PENDING/COMPLETED) y fechas de entrega.

Achievements (Logros): Registro de metas alcanzadas con fecha de obtención.

Experiences (Experiencias): Historial profesional detallando empresa, cargo y periodos de tiempo.

