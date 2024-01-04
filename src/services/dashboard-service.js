import { api } from './api';

export async function getCountOficinas(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/dashboard/oficina/count`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSomaDeUmaOficina(id){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/dashboard/oficina/countOne/${id}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getCountCaminhoes(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/dashboard/caminhao/count`,{
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

export async function getSomaManutencao(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/dashboard/manutencao/count`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}