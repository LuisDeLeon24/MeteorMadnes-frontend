import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://meteormadnes-backend.onrender.com",
  timeout: 1000000,
});

export const Horizons = async (id) => {
  if (!id) {
    return { error: true, msg: "Se requiere un ID de asteroide" };
  }

  try {
    return await apiClient.get(`/fetch/horizons/${id}`);
  } catch (error) {
    const msg = error.response?.data?.message || "Error fetching Horizons data";
    return {
      error: true,
      msg,
      details: error,
    };
  }
};

export const searchPneos = async (id) => {
  if (!id) {
    return { error: true, msg: "Se requiere un ID del PNEO" };
  }

  try {
    return await apiClient.get(`/PNeos/search/${id}`);
  } catch (error) {
    const msg = error.response?.data?.message || "Error fetching PNEO data";
    return {
      error: true,
      msg,
      details: error,
    };
  }
};

export const randomPneos = async (id) => {
  try {
    return await apiClient.get(`/PNeos/randomPNEOS`);
  } catch (error) {
    const msg = error.response?.data?.message || "Error fetching PNEOs data";
    return {
      error: true,
      msg,
      details: error,
    };
  }
};

export const formulasDemograficas = async (params) => {
  try {
    return await apiClient.post("/formulas/resumenImpacto", params);
  } catch (error) {
    const msg =
      error.response?.data?.message || "Error en las fórmulas demograficas";
    return { error: true, msg, details: error };
  }
};

export const formulasFisicas = async (params) => {
  try {
    return await apiClient.post('/formulas/datosCompletosAsteroide', params );
  } catch (error) {
    console.error("❌ ERROR DETALLADO:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Headers:", error.response?.headers);
    console.error("URL:", error.config?.url);
    console.error("Payload enviado:", error.config?.data);
  }
};
