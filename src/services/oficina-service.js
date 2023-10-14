import { api } from './api';

export async function createOficina(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/oficina/create', {
        nomeOficina: data.nomeOficina
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getOficinas(ord){
    const accessToken = sessionStorage.getItem('token');
    let defaut = 'decrescente'
    if(ord) defaut = ord;
    const result = await api.get(`/oficina/getAll?ordenacao=${defaut}`,{
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


export async function deleteCaminhao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/caminhao/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};