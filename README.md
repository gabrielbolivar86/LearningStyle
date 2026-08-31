# Cuestionario de Perfil de Aprendizaje

Arquitectura:
- **Frontend** (`index.html`, `admin.html`, `style.css`, `config.js`): sitio estático para GitHub Pages.
- **Backend/API** (`Code.gs`, `appsscript.json`): Google Apps Script desplegado como Web App, que lee y escribe en un Google Sheet (tu "excel").

```
📁 backend-apps-script/   → Code.gs, appsscript.json
📁 frontend-github-pages/ → index.html, admin.html, style.css, config.js
```

---

## PARTE 1 — Backend (Google Apps Script)

### 1. Crear la hoja de cálculo
1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva (ej. "BD Perfil de Aprendizaje").
2. Extensiones → Apps Script.
3. Borra el contenido de `Code.gs` que aparece por defecto y pega el contenido del archivo `Code.gs` de este proyecto.
4. En el archivo de manifiesto (ícono de engranaje ⚙️ → "Mostrar archivo de manifiesto"), reemplaza `appsscript.json` por el de este proyecto.

### 2. Configurar la hoja y la contraseña de admin
1. En el editor de Apps Script, en el menú desplegable de funciones (arriba), selecciona `configurarHojas` y presiona ▶️ Ejecutar. Esto crea las pestañas "Codigos" y "Respuestas" con sus encabezados. La primera vez te pedirá autorizar permisos: acéptalos.
2. Abre `Code.gs`, busca la función `establecerPasswordAdmin`, cambia `'MiClaveSegura123'` por la contraseña que quieras usar para el panel admin.
3. Selecciona esa función en el desplegable y ejecútala una vez (▶️). Puedes revisar en "Ejecuciones" que corrió sin errores.
4. (Opcional pero recomendado) Después de ejecutarla, puedes dejar la línea como está o borrar la contraseña del código fuente; ya quedó guardada de forma segura en las Propiedades del Script, no en la hoja.

### 3. Desplegar como Web App
1. Botón azul **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:
   - Ejecutar como: **Yo (tu correo)**
   - Quién tiene acceso: **Cualquier usuario**
4. Implementar → copia la **URL que termina en `/exec`**. Esa es tu API.

⚠️ **Importante**: cada vez que edites `Code.gs`, los cambios NO se aplican automáticamente a la URL ya desplegada. Debes ir a **Implementar → Administrar implementaciones → ✏️ Editar → Nueva versión → Implementar** para que los cambios surtan efecto.

---

## PARTE 2 — Frontend (GitHub Pages)

### 1. Configurar la URL de la API
Abre `config.js` y reemplaza:
```js
API_URL: 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT/exec'
```
con la URL que copiaste en el paso anterior.

### 2. Subir a GitHub
1. Crea un repositorio nuevo en GitHub (puede ser público o privado, pero GitHub Pages gratuito solo publica repos públicos, salvo que tengas GitHub Pro/Team).
2. Sube los archivos `index.html`, `admin.html`, `style.css` y `config.js` a la raíz del repositorio (o a una carpeta `/docs`, como prefieras).
3. Ve a **Settings → Pages**, en "Branch" selecciona la rama y carpeta donde están los archivos, y guarda.
4. En un par de minutos tu sitio estará disponible en algo como:
   `https://tu-usuario.github.io/tu-repositorio/`
   - Cuestionario: `.../index.html`
   - Panel admin: `.../admin.html`

### 3. Probar
1. Entra a `admin.html`, pon tu contraseña, genera un código de prueba con un nombre.
2. Copia ese código, ábrelo en `index.html` (en otra pestaña o navegador de incógnito) y completa el cuestionario.
3. Vuelve al panel admin, actualiza la lista, haz clic en esa persona y revisa el gráfico de perfil.

---

## Notas técnicas importantes

- **CORS**: el frontend llama a la API con `Content-Type: text/plain` (en vez de `application/json`) a propósito — así el navegador no dispara una solicitud "preflight" (OPTIONS), que Apps Script no maneja. El servidor igual interpreta el cuerpo como JSON (`JSON.parse(e.postData.contents)`). No cambies ese header o la API dejará de funcionar desde GitHub Pages.
- **Seguridad de la contraseña admin**: viaja en el cuerpo del POST (no en la URL), pero de todas formas es una validación simple. No es un sistema de autenticación robusto — evita usarlo para datos verdaderamente sensibles.
- **Aleatorización**: las preguntas de Secciones 2 y 3 se mezclan en el navegador de cada persona (`shuffle`), pero siempre se guardan con su ID fijo (`S2_1`, `S3_3`, etc.), así que la rúbrica de corrección nunca se ve afectada por el orden en que se mostraron.
- **Guardado y reanudación**: cada respuesta se guarda de inmediato en `localStorage` del navegador (por si falla el internet) y, con un pequeño retraso, también en el Google Sheet. Al reingresar el mismo código, se combinan ambas fuentes y continúa donde quedó.
- **Tiempo**: se acumula en segundos en la columna `TiempoTotalSegundos` de la hoja "Codigos", sumando cada sesión de actividad. No se muestra al participante.
- **Límite de Google**: Apps Script tiene cuotas de ejecución (normalmente generosas para uso de cuestionarios/formularios pequeños-medianos). Si esperas cientos de personas respondiendo simultáneamente, revisa las [cuotas de Apps Script](https://developers.google.com/apps-script/guides/services/quotas).

---

## Estructura de la base de datos (Google Sheet)

**Hoja "Codigos"**

| Codigo | Nombre | Estado | FechaCreacion | FechaInicio | FechaFin | TiempoTotalSegundos |
|---|---|---|---|---|---|---|

**Hoja "Respuestas"**

| Codigo | S1_1 | S1_2 | S1_3 | S2_1 | S2_2 | S2_3 | S2_4 | S2_5 | S3_1 | S3_2 | S3_3 | S3_4 | UltimaActualizacion |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
