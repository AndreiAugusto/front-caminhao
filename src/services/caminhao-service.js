import { api } from './api';

export async function createCaminhao(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/caminhao/create', {
        modelo: data.modelo,
        placa: data.placa,
        ano: data.ano
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}