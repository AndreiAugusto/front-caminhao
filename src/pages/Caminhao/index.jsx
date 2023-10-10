import React from "react";
import { useState } from "react";
import { Header } from "../../components/Header/header";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { createCaminhao } from "../../services/caminhao-service";
import { ToastContainer, toast } from 'react-toastify';

export function Caminhao() {    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isCreated, setIsCreated] = useState(false);

    async function addCaminhao(data){
        try {
            await createCaminhao({
                modelo: data.modelo,
                placa: data.placa,
                ano: data.ano                
            });
            setIsCreated(false);
            toast.success('Caminhão criado com sucesso');
        } catch (error) {
            toast.error(error)            
        }
    }

    return (
        <main className="main-container">
            <Header/>
            <div className="d-flex flex-grow-1">
                <div className="p-3 w-100">
                    <Row>
                        <Col md={12} className="mt-2 d-flex justify-content-center">
                            <Button
                            onClick={()=>setIsCreated(true)}>
                                Cadastrar Caminhão
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <Modal
                show={isCreated}
                onHide={() => setIsCreated(false)}
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
