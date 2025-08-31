import axios from 'axios';

const apiClient = axios.create({
    baseURL:"http://localhost:3000/MeteorMadnes",
    timeout: 1000000,
});


export const Horizons = async (id) => {
    if (!id) {
        return { error: true, msg: "Se requiere un ID de asteroide" };
    }

    try {
        // Usamos template string para inyectar el id en la URL
        return await apiClient.get(`/fetch/horizons/${id}`);
    } catch (error) {
        const msg = error.response?.data?.message || "Error fetching Horizons data";
        return {
            error: true,
            msg,
            details: error
        };
    }
};
