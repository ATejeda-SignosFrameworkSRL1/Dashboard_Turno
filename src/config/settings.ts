const normalizeBaseUrl = (value: string) => {
  let base = (value ?? "").trim();
  if (!base) return "";

  // Mantiene rutas relativas (ej: /TurnosAPI/) para proxy local.
  // Si es host/IP sin protocolo, fuerza http:// para evitar que axios lo trate como ruta relativa.
  if (!base.startsWith("/") && !/^https?:\/\//i.test(base)) {
    base = `http://${base}`;
  }

  return base.replace(/\/?$/, "/");
};

const settings = {
  get baseAPI() {
    const viteEnv = (import.meta as any).env ?? {};
    const fromStorage =
      localStorage.getItem("VITE_APP_BASEURL") ||
      localStorage.getItem("API_URL") ||
      "";
    return normalizeBaseUrl(fromStorage || viteEnv.VITE_APP_BASEURL || "");
  },
};

export default settings;