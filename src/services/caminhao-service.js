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

export async function getCaminhoes(ord){
    const accessToken = sessionStorage.getItem('token');
    let defaut = 'decrescente'
    if(ord) defaut = ord;
    const result = await api.get(`/caminhao/getAll?ordenacao=${defaut}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }        
    });
    return result;
}

export async function updateCaminhao(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/caminhao/update/${data.id}`,{
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