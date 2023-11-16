import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/header";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { createManutencao, getManutencao } from "../../services/manutencao-service";
import { getCaminhoes } from "../../services/caminhao-service";
import { getOficinas } from "../../services/oficina-service";

export function Manutencao(){
    const { logout } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isCreated, setIsCreated] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [ordemId, setOrdemId] = useState('decrescente');
    const [manutencoes, setManutencoes] = useState(false);
    const [descManutencao, setDescManutencao] = useState('Descrição');   
    const [idManutencao, setIdManutencao] = useState(null);
    const [caminhoes, setCaminhoes] = useState([]);
    const [oficinas, setOficinas] = useState([]);

    
    useEffect(()=>{
        findManutencao();
        buscarCaminhoes();
        buscarOficinas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    
    async function buscarOficinas(){
        try {
            const response = await getOficinas(); 
            setOficinas(response.data);
        } catch (error) {
            logout();     
        }
    };

    async function buscarCaminhoes(){
        try {
            const response = await getCaminhoes(); 
            setCaminhoes(response.data);
        } catch (error) {
            logout();     
        }
    };

    async function findManutencao(){
        try {
            const result = await getManutencao(ordemId);
            setManutencoes(result.data);
        } catch (error) {
            logout();            
        }
    }
        
    const handleOrdem = () =>{
        if( ordemId === 'crescente'){
            setOrdemId('decrescente');
            findManutencao();
        } else {
            setOrdemId('crescente');
            findManutencao();
        }
    }

    async function addManutencao(data){
        try {
            console.log(data)
            // await createManutencao({
            //     descricao: data.descricao,
            //     custo: data.custo,
            //     data: data.data,
            //     caminhaoId: data.caminhaoId,
            //     oficinaId: data.oficinaId
            // });
            setIsCreated(false);
            toast.success('Manutenção criada com sucesso');
            findManutencao();
        } catch (error) { 
            toast.error(error)            
        }
    }

    return (
        <main className="main-container">
            <Header/>
            <div className="p-3">
                <Row>
                    <Col md={12} className="mt-2 d-flex justify-content-center">
                        <Button
                        onClick={()=>setIsCreated(true)}>
                            Cadastrar Manutenção
                        </Button>
                    </Col>
                </Row>
            </div>

            <Col md={10} className="table-responsive m-auto">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '5%' }}
                             className="cursor-pointer"
                             onClick={handleOrdem}>Id</th>
                            <th scope="col" >Descrição</th>
                            <th scope="col">Custo</th>
                            <th scope="col">Data</th>
                            <th scope="col">Caminhão</th>
                            <th scope="col">Oficina</th>
                            <th scope="col" style={{ width: '5%' }}></th>
                            <th scope="col" style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {manutencoes && manutencoes.length > 0 ? (
                            manutencoes.map((manutencao)=>(
                                <tr key={manutencao.id}>
                                    <th scope="col">{manutencao.id}</th>
                                    <th>{manutencao.descricao}</th>
                                    <th>{manutencao.custo.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}</th>
                                    <th>{manutencao.data}</th>
                                    <th>{manutencao.caminhaoId}</th>
                                    <th>{manutencao.oficinaId}</th>

                                {/* botoes */}
                                <th scope="col" className="p-1">
                                    <Button scope="col" onClick={()=>{
                                        setDescManutencao(manutencao.descricao);
                                        setIdManutencao(manutencao.id);
                                        setIsUpdated(true);
                                    }}>Editar</Button>
                                </th>
                                <th scope="col" className="p-1">
                                    <Button className="btn btn-danger" scope="col"  
                                    onClick={()=>{
                                        setIsDeleted(true);
                                        setDescManutencao(manutencao.descricao);
                                        setIdManutencao(manutencao.id);
                                    }}>
                                        Deletar
                                    </Button>
                                </th> 

                                </tr>
                            ))
                        ):(
                            <p>Não há manutenções</p>
                        )}

                    </tbody>
                </table>
            </Col>

            {/* Modal de Criar */}
            <Modal
                show={isCreated}
                onHide={() => {
                    setIsCreated(false);
                    reset();
                }}
            >
                <Modal.Header className="justify-content-center text-primary">
                    <Modal.Title>
                        Cadastrar nova manutenção
                    </Modal.Title>
                </Modal.Header>
                <form
                    className="m-auto w-100"
                    noValidate
                    onSubmit={handleSubmit(addManutencao)}
                >
                    <Modal.Body>
                        <Input 
                            label='Descrição'
                            type='text'
                            placeholder='Digite a descrição'
                            name='descricao'
                            error={errors.descricao}
                            validations={register('descricao', {
                                required:{
                                    value: true,
                                    message:'Descrição da manutenção obrigatório!'
                                }
                            })}
                        />
                        <Input 
                            label='Custo'
                            type='number'
                            placeholder='Insira o valor'
                            name='custo'
                            error={errors.custo}
                            validations={register('custo', {
                                required:{
                                    value: true,
                                    message:'Custo obrigatório!'
                                }
                            })}
                        />
                        <Input 
                            label='Data'
                            type='date'
                            name='data'
                            error={errors.data}
                            validations={register('data', {
                                required:{
                                    value: true,
                                    message:'Data obrigatório!'
                                }
                            })}
                        />
                        <Form.Group className='mb-4'>
                            <Form.Label className="mb-0">Caminhão</Form.Label>
                            <Form.Control
                                as="select"
                                placeholder='Caminhão'
                                name='caminhaoId'
                                isInvalid={!!errors.caminhaoId}
                                {...register('caminhaoId', {
                                    required: {
                                        value: true,
                                        message: 'Caminhão obrigatório!'
                                    }
                                })}
                            >
                                <option value="">Selecione um caminhão</option>
                                {caminhoes.map(caminhao => (
                                    <option key={caminhao.id} value={caminhao.id}>
                                        {caminhao.modelo}
                                    </option>
                                ))}
                            </Form.Control>
                            {errors.caminhaoId &&
                                <Form.Control.Feedback type="invalid">
                                    {errors.caminhaoId.message}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                        <Form.Group className='mb-4'>
                            <Form.Label className="mb-0">Oficina</Form.Label>
                            <Form.Control
                                as="select"
                                placeholder='Oficina'
                                name='oficinaId'
                                isInvalid={!!errors.oficinaId}
                                {...register('oficinaId', {
                                    required: {
                                        value: true,
                                        message: 'Oficina obrigatório!'
                                    }
                                })}
                            >
                                <option value="">Selecione uma oficina</option>
                                {oficinas.map(oficina => (
                                    <option key={oficina.id} value={oficina.id}>
                                        {oficina.nomeOficina}
                                    </option>
                                ))}
                            </Form.Control>
                            {errors.oficinaId &&
                                <Form.Control.Feedback type="invalid">
                                    {errors.oficinaId.message}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setIsCreated(false)}
                        >
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </main>
    )
}