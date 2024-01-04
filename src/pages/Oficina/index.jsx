import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header/header";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { createOficina, getOficinas, deleteOficina, updateOficina } from "../../services/oficina-service";
import { getSomaDeUmaOficina } from "../../services/dashboard-service";

export function Oficina() {    
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
    const [oficinas, setOficinas] = useState();
    const [nomeOficinaEdit, setNomeOficinaEdit] = useState('Nome oficina');   
    const [idOficinaEdit, setIdOficinaEdit] = useState(null);

    useEffect(()=>{
        findOficinas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function findOficinas(){
        try {
            const result = await getOficinas(ordemId);
            setOficinas(result.data)
        } catch (error) {
            logout();            
        }
    }

    async function addOficina(data){
        try {
            await createOficina({
                nomeOficina: data.nomeOficina
            });
            setIsCreated(false);
            toast.success('Oficina criada com sucesso');
            reset();
            findOficinas();
        } catch (error) { 
            toast.error(error)
        }
    }

    async function editOficina(data){
        try {
            await updateOficina({
                id: idOficinaEdit,
                nomeOficina: data.nomeOficina
            });
            await findOficinas();
            setIsUpdated(false);
            toast.success('Oficina editada com sucesso!');
        } catch (error) {
            toast.error(error);
        }
    }

    async function delOficina(){
        try {
            const nDeManutuencoesDaOficina = await getSomaDeUmaOficina(idOficinaEdit);
            if(nDeManutuencoesDaOficina.data > 0){
                toast.error('Oficina não pode ser deletada, pois já existe manutenção cadastrada em seu nome!');
                setIsDeleted(false);
            }else{
                await deleteOficina(idOficinaEdit)
                setIsDeleted(false);
                toast.success('Oficina deletada com sucesso!');
                await findOficinas();
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleOrdem = () =>{
        if( ordemId === 'crescente'){
            setOrdemId('decrescente');
            findOficinas();
        } else {
            setOrdemId('crescente');
            findOficinas();
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
                            Cadastrar Oficina
                        </Button>
                    </Col>
                </Row>
            </div>
            <Col md={10} className="table-responsive m-auto">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="cursor-pointer" onClick={handleOrdem} style={{ width: '10%' }}>Id</th>
                            <th scope="col" style={{ width: '80%' }}>Oficina</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                    {oficinas && oficinas.length > 0 ? (
                        oficinas.map((oficina)=>(
                            <tr key={oficina.id}>
                                <th scope="col">{oficina.id}</th>
                                <th scope="col">{oficina.nomeOficina}</th>
                                <th scope="col" className="p-1">
                                    <Button scope="col" onClick={()=>{
                                        setNomeOficinaEdit(oficina.nomeOficina);
                                        setIdOficinaEdit(oficina.id);
                                        setIsUpdated(true);
                                    }}>Editar</Button>
                                </th>
                                <th scope="col" className="p-1">
                                    <Button className="btn btn-danger" scope="col"
                                    onClick={()=>{
                                        setIsDeleted(true);
                                        setNomeOficinaEdit(oficina.nomeOficina);
                                        setIdOficinaEdit(oficina.id);
                                    }}>
                                        Deletar
                                    </Button>
                                </th>                                
                            </tr>

                        ))
                    ):(
                        <p>Não há oficinas</p>
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
                        Cadastrar nova oficina
                    </Modal.Title>
                </Modal.Header>
                <form
                    className="m-auto w-100"
                    noValidate
                    onSubmit={handleSubmit(addOficina)}
                >
                    <Modal.Body>
                        <Input 
                            label='Oficina'
                            type='text'
                            placeholder='Digite qual oficina'
                            name='nomeOficina'
                            error={errors.nomeOficina}
                            validations={register('nomeOficina', {
                                required:{
                                    value: true,
                                    message:'Nome da oficina obrigatório!'
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
                onHide={() => {
                    setIsUpdated(false);
                    reset();
                }}
            >
                <Modal.Header className="justify-content-center text-primary">
                    <Modal.Title>
                        Editar {nomeOficinaEdit}
                    </Modal.Title>
                </Modal.Header>
                <form
                    className="m-auto w-100"
                    noValidate
                    onSubmit={handleSubmit(editOficina)}
                >
                    <Modal.Body>
                        <Input 
                            label='Oficina'
                            type='text'
                            placeholder='Nome da Oficina'
                            name='nomeOficina'
                            error={errors.nomeOficina}
                            validations={register('nomeOficina', {
                                required:{
                                    value: true,
                                    message:'Nome da oficina obrigatório!'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsUpdated(false);
                                reset();
                            }}
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
                onHide={() => {
                    setIsDeleted(false);
                    reset();
                }}
            >
                <Modal.Header>
                    <Modal.Title>
                        Excluir: {nomeOficinaEdit}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setIsDeleted(false)}>Não excluir
                    </Button>
                    <Button
                        variant='danger'
                        onClick={()=>delOficina()}>Sim, excluir
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
