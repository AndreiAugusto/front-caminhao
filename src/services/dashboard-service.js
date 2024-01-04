import { api } from './api';

export async function getSomaDeUmaOficina(id){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/dashboard/oficina/countOne/${id}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSomaDeUmCaminhao(id){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/dashboard/caminhao/countOne/${id}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}