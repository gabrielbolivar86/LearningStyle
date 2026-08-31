// ==========================================================
// CONFIGURACIÓN DEL FRONTEND
// ==========================================================
// 1. Despliega el proyecto de Apps Script como Web App.
// 2. Copia la URL que termina en /exec y pégala abajo.
// ==========================================================
var CONFIG = {
  API_URL: 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT/exec'
};

// Helper genérico para llamar a la API evitando el preflight de CORS
// (usamos Content-Type: text/plain, no application/json)
function callApi(action, payload) {
  payload = payload || {};
  payload.action = action;
  return fetch(CONFIG.API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  }).then(function (res) {
    if (!res.ok) throw new Error('Error de red: ' + res.status);
    return res.json();
  });
}
