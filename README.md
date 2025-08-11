# HU-11 Auth Sprint Demo (Node.js + Express + SQLite + JWT)

Este demo cumple los criterios de aceptación de la HU-11:
- Registro con correo y contraseña
- Validación de campos obligatorios y formato de correo
- Login con mantenimiento de sesión mediante JWT en cookie httpOnly (durante la visita)
- Manejo claro de errores de autenticación
- Almacenamiento seguro de contraseñas (bcrypt)

## Backend
Requisitos: Node 18+

```bash
cd backend
cp .env.example .env
npm install
npm run dev  # o npm start
```
Servirá en `http://localhost:3000`

Endpoints:
- POST /api/auth/register { email, password, name? }
- POST /api/auth/login { email, password } (setea cookie)
- POST /api/auth/logout
- GET /api/auth/me  (requiere cookie de sesión)

## Frontend (estático simple)
Abra `frontend/index.html` en su navegador.
Si su backend no está en `http://localhost:3000`, edite en consola:
```js
localStorage.setItem('API_URL','https://su-backend')
```
y recargue la página.

## Pruebas
```bash
cd backend
npm test
```

## Despliegues sugeridos
- Backend: Render, Railway, Fly.io
- Frontend: GitHub Pages, Netlify, Vercel
