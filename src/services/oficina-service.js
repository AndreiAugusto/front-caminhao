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

export async function updateOficina(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/oficina/update/${data.id}`,{
        nomeOficina: data.nomeOficina
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function deleteOficina(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/oficina/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};