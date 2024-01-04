import { api } from './api';

export async function createManutencao(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/manutencao/create', {
        descricao: data.descricao, 
        custo: data.custo, 
        data: data.data,
        oficinaId: data.oficinaId,
        caminhaoId: data.caminhaoId
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getManutencao(ord){
    const accessToken = sessionStorage.getItem('token');
    let defaut = 'decrescente'
    if(ord) defaut = ord;
    const result = await api.get(`/manutencao/getAll?ordenacao=${defaut}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }        
    });
    return result;
}

export async function updateManutencao(data){
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


export async function deleteManutencao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/oficina/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};