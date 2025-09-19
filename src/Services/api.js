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
            details: error
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
            details: error
        };
    }
};

