import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/header";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { createCaminhao, deleteCaminhao, getCaminhoes, updateCaminhao } from "../../services/caminhao-service";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

export function Caminhao() {    
    const { logout } = useContext(AuthContext);
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isCreated, setIsCreated] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [ordemId, setOrdemId] = useState('decrescente');
    const [caminhoes, setCaminhoes] = useState();
    const [modeloCaminhaoEdit, setModeloCaminhaoEdit] = useState('modelo');   
    const [idCaminhaoEdit, setIdCaminhaoEdit] = useState(null);

    useEffect(()=>{
        findCaminhoes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function findCaminhoes(){
        try {
            const result = await getCaminhoes(ordemId);
            setCaminhoes(result.data)
        } catch (error) {
            logout();            
        }
    }

    async function addCaminhao(data){
        try {
            const dataHoje = new Date();
            const dataSelecionada = new Date(data.ano);
            if(dataSelecionada > dataHoje){
                toast.error('Data invalida');

            }else{
                await createCaminhao({
                    modelo: data.modelo,
                    placa: data.placa,
                    ano: data.ano                
                });
                setIsCreated(false);
                toast.success('Caminhão criado com sucesso');
                findCaminhoes();
            }
        } catch (error) {
            toast.error(error)            
        }
    }

    async function editCaminhao(data){
        try {            
            const dataHoje = new Date();
            const dataSelecionada = new Date(data.ano);
            if(dataSelecionada > dataHoje){
                toast.error('Data invalida');

            }else{
                await updateCaminhao({
                    id: idCaminhaoEdit,
                    modelo: data.modelo,
                    placa: data.placa,
                    ano: data.ano
                });
                await findCaminhoes();
                setIsUpdated(false);
                toast.success('Caminhão editado com sucesso!');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    async function delCaminhao(){
        try {
            await deleteCaminhao(idCaminhaoEdit)
            setIsDeleted(false);
            toast.success('Caminhão editado com sucesso!');
            await findCaminhoes();
        } catch (error) {
            toast.error(error);            
        }
    }

    const handleOrdem = () =>{
        if( ordemId === 'crescente'){
            setOrdemId('decrescente');
            findCaminhoes();
        } else {
            setOrdemId('crescente');
            findCaminhoes();
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
                            Cadastrar Caminhão
                        </Button>
                    </Col>
                </Row>
            </div>
            <Col md={10} className="table-responsive m-auto">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="cursor-pointer" onClick={handleOrdem} style={{ width: '10%' }}>Id</th>
                            <th scope="col" style={{ width: '30%' }}>Caminhão</th>
                            <th scope="col" style={{ width: '30%' }}>placa</th>
                            <th scope="col" style={{ width: '30%' }}>Ano</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                    {caminhoes && caminhoes.length > 0 ? (
                        caminhoes.map((caminhao)=>(
                            <tr key={caminhao.id}>
                                <th scope="col">{caminhao.id}</th>
                                <th scope="col">{caminhao.modelo}</th>
                                <th scope="col">{caminhao.placa}</th>
                                <th scope="col">{caminhao.ano}</th>
                                <th scope="col" className="p-1">
                                    <Button scope="col" onClick={()=>{
                                        setModeloCaminhaoEdit(caminhao.modelo);
                                        setIdCaminhaoEdit(caminhao.id);
                                        setIsUpdated(true);
                                    }}>Editar</Button>
                                </th>
                                <th scope="col" className="p-1">
                                    <Button className="btn btn-danger" scope="col"
                                    onClick={()=>{
                                        setIsDeleted(true);
                                        setModeloCaminhaoEdit(caminhao.modelo);
                                        setIdCaminhaoEdit(caminhao.id);
                                    }}>
                                        Deletar
                                    </Button>
                                </th>
                                
                                
                            </tr>

                        ))
                    ):(
                        <p>Não há caminhões</p>
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
                        Cadastrar novo caminhão
                    </Modal.Title>
                </Modal.Header>
                <form
                    className="m-auto w-100"
                    noValidate
                    onSubmit={handleSubmit(addCaminhao)}
                >
                    <Modal.Body>
                        <Input 
                            label='Caminhão'
                            type='text'
                            placeholder='Digite qual caminhão'
                            name='modelo'
                            error={errors.modelo}
                            validations={register('modelo', {
                                required:{
                                    value: true,
                                    message:'Nome do caminhão obrigatório!'
                                }
                            })}
                        />
                        <Input 
                            label='Placa do caminhão'
                            type='text'
                            name='placa'
                            placeholder='Placa do caminhão'
                            error={errors.placa}
                            validations={register('placa', {
                                required:{
                                    value: true,
                                    message:'Placa do caminhão é obrigatoria!'
                                }
                            })}
                        />
                        <Input 
                            label='Ano do caminhão'
                            type='date'
                            name='ano'
                            error={errors.ano}
                            validations={register('ano', {
                                required:{
                                    value: true,
                                    message:'Ano do caminhão é obrigatorio!'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsCreated(false);
                                reset();
                            }}
                        >
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Modal.Footer>
                
                </form>
            </Modal>
            
            {/* Modal de Editar */}
            <Modal
                show={isUpdated}
                onHide={() => setIsUpdated(false)}
            >
                <Modal.Header className="justify-content-center text-primary">
                    <Modal.Title>
                        Editar {modeloCaminhaoEdit}
                    </Modal.Title>
                </Modal.Header>
                <form
                    className="m-auto w-100"
                    noValidate
                    onSubmit={handleSubmit(editCaminhao)}
                >
                    <Modal.Body>
                        <Input 
                            label='Caminhão'
                            type='text'
                            placeholder='Modelo do caminhão'
                            name='modelo'
                            error={errors.modelo}
                            validations={register('modelo', {
                                required:{
                                    value: true,
                                    message:'Nome do caminhão obrigatório!'
                                }
                            })}
                        />
                        <Input 
                            label='Placa'
                            type='text'
                            name='placa'
                            placeholder='Placa do caminhão'
                            error={errors.placa}
                            validations={register('placa', {
                                required:{
                                    value: true,
                                    message:'Placa do caminhão é obrigatoria!'
                                }
                            })}
                        />
                        <Input 
                            label='Ano do caminhão'
                            type='date'
                            name='ano'
                            error={errors.ano}
                            validations={register('ano', {
                                required:{
                                    value: true,
                                    message:'Ano do caminhão é obrigatorio!'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setIsUpdated(false)}
                        >
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                    </Modal.Footer>                
                </form>
            </Modal>

            {/* Modal de Confirmar Delete */}
            <Modal
                show={isDeleted}
                onHide={() => setIsDeleted(false)}
            >
                <Modal.Header>
                    <Modal.Title>
                        Excluir: {modeloCaminhaoEdit}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setIsDeleted(false)}>Não excluir
                    </Button>
                    <Button
                        variant='danger'
                        onClick={()=>delCaminhao()}>Sim, excluir
                    </Button>
                </Modal.Footer>
            </Modal>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </main>
    );
}
