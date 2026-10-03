# Tu Voz, Nuestra Mejora

MVP web funcional para participación interna, retroalimentación, encuestas, capacitación y mejora continua. Construido con React + Vite, Firebase y Google Analytics; preparado para GitHub y Netlify.

## Funciones

- Registro, inicio de sesión y recuperación por correo.
- Perfiles y permisos: CEO, gerente/RR. HH., supervisor y empleados.
- Aportes identificados o anónimos, PDF adjunto, edición controlada y trazabilidad de estados.
- Muro de ideas con apoyos y comentarios identificados.
- Encuestas anónimas con control separado de participación.
- Cursos, progreso, evaluación y constancia registrada.
- Dashboard, gráficos y exportación a PDF y Excel.
- Analytics de eventos no sensibles.
- Diseño responsive para escritorio y móvil.

## 1. Requisitos

- Node.js 20 o superior.
- Un proyecto de Firebase.
- Una cuenta de GitHub y un sitio de Netlify.
- Firebase CLI opcional para desplegar reglas: `npm i -g firebase-tools`.

## 2. Firebase

1. En Firebase Console crea un proyecto y registra una aplicación Web.
2. Activa **Authentication > Sign-in method > Email/Password**.
3. Crea **Cloud Firestore** en modo producción.
4. Activa **Storage** si el plan y la región de tu proyecto lo permiten.
5. Activa Google Analytics al crear la aplicación web.
6. Copia `.env.example` como `.env` y pega la configuración web.

```bash
cp .env.example .env
```

Las variables `VITE_*` se incluyen en el bundle del navegador. La configuración web de Firebase identifica el proyecto, pero la seguridad real depende de Authentication, Firestore Rules y Storage Rules. Nunca guardes una clave privada de cuenta de servicio en el repositorio o en una variable `VITE_*`.

## 3. Instalar y ejecutar

```bash
npm install
npm run dev
```

Verificación local:

```bash
npm run lint
npm test
npm run build
npm run preview
```

## 4. Desplegar reglas

Copia `.firebaserc.example` como `.firebaserc`, reemplaza `TU_PROJECT_ID` y ejecuta:

```bash
firebase login
npm run deploy:rules
```

También puedes copiar manualmente `firestore.rules`, `storage.rules` e `firestore.indexes.json` desde Firebase Console.

## 5. Crear los cinco usuarios de demostración

Registra cinco cuentas desde la aplicación. Por seguridad, todas nacen como `employee`. Luego, en Firestore, abre `users/{uid}` y asigna:

- `ceo` para la cuenta CEO.
- `manager` para Gerencia administrativa y RR. HH.
- `supervisor` para Supervisión de Operaciones.
- `employee` para las dos cuentas colaboradoras.

Asigna también `department` y `title`. No permitas que una persona elija un rol privilegiado durante el registro.

Ejemplo de perfiles:

```text
ceo.demo@novagestion.test
manager.demo@novagestion.test
supervisor.demo@novagestion.test
operaciones.demo@novagestion.test
servicio.demo@novagestion.test
```

Usa contraseñas de demostración distintas y no reutilices credenciales personales.

## 6. Cargar datos de ejemplo

1. Inicia sesión con las dos cuentas de empleado y crea aportes e ideas.
2. Crea encuestas desde cualquiera de las cuentas.
3. Crea cursos desde CEO, Gerencia o Supervisión.
4. Desde Gerencia o Supervisión cambia estados para demostrar el flujo.
5. Responde encuestas con varias cuentas para poblar indicadores.

## 7. Publicar en GitHub

```bash
git init
git add .
git commit -m "MVP Tu Voz, Nuestra Mejora"
git branch -M main
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```

Confirma que `.env` no aparezca en `git status`.

## 8. Publicar en Netlify

1. En Netlify selecciona **Add new site > Import an existing project**.
2. Conecta GitHub y selecciona el repositorio.
3. Netlify detectará `npm run build` y `dist` desde `netlify.toml`.
4. En **Site configuration > Environment variables**, crea todas las variables de `.env.example`.
5. Ejecuta un nuevo deploy.
6. En Firebase Authentication, agrega el dominio de Netlify en **Authorized domains**.

`netlify.toml` incluye el fallback SPA `/* -> /index.html` con estado 200 para que React Router funcione al recargar.

## 9. Límites y seguridad del MVP

- PDF máximo: 5 MB.
- El anonimato es visual frente a otros usuarios. La identidad original permanece en el documento para trazabilidad y acceso autorizado. Para anonimato fuerte o cumplimiento regulatorio, hace falta una función backend que separe criptográficamente identidad y contenido.
- El control de roles usa documentos de usuario consultados por las reglas. Para una aplicación empresarial de producción se recomiendan custom claims administrados desde un backend confiable.
- Las respuestas de encuestas no guardan el UID; la participación se guarda aparte. No expongas resultados segmentados con grupos pequeños.
- El “certificado” del MVP es un registro digital de aprobación. Puede ampliarse para generar un PDF verificable y una página pública de validación.
- No se almacenan contenidos sensibles en Google Analytics.
- Revisa diariamente cuotas de Firestore y Storage durante pruebas públicas.

## Estructura

```text
src/
  components/     Componentes reutilizables
  context/        Sesión y perfil
  pages/          Acceso, layout y módulos
  services/       Operaciones Firebase
  __tests__/      Pruebas básicas
firestore.rules   Autorización de datos
storage.rules     PDF y materiales
netlify.toml      Build, SPA y cabeceras
```

## Licencia académica

Proyecto de demostración académica. Sustituye nombres, datos y políticas antes de utilizarlo en una organización real.
