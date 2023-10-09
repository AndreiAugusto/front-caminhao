import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input } from '../../components/Input/Input';
import { AuthContext } from '../../contexts/AuthContext';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export function Register () {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { loading, createUser } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            if(data.senha !== data.confirmaSenha){
                toast.error('As senhas não coincidem!');
            }else{
                createUser(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
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
            <Row>
                <Col md={6} className='m-auto mt-5 bg-light p-5 rounded'>
                    <h1 className='text-center mb-5'>Registre-se</h1>
                    <Form  noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            label='Nome completo'
                            type='nome'
                            placeholder='Insira seu nome completo'
                            name='nome'
                            error={errors.nome}
                            validations={register('nome', {
                                required:{
                                    value:true,
                                    message:'Nome é obrigatório!'
                                }
                            })}
                        />
                        <Input
                            label='E-mail'
                            type='email'
                            placeholder='E-mail'
                            name='email'
                            error={errors.email}
                            validations={register('email', {
                                required:{
                                    value:true,
                                    message:'Email obrigatorio!'
                                },
                                pattern:{
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message:'Email inválido!'
                                }
                            })}
                        />
                        <Input
                            
                            label='Senha'
                            type='password'
                            placeholder='Digite sua senha'
                            name='senha'
                            error={errors.senha}
                            validations={register('senha', {
                                required:{
                                    value:true,
                                    message:'Senha obrigatória!'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Ao minimo 4 digitos'
                                }
                            })}
                        />
                        <Input
                            
                            label='Confirmar senha'
                            type='password'
                            placeholder='Digite sua senha'
                            name='confirmaSenha'
                            error={errors.senha}
                            validations={register('confirmaSenha', {
                                required:{
                                    value:true,
                                    message:'Senha obrigatória!'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Ao minimo 4 digitos'
                                }
                            })}
                        />
                        <div>
                            <Link to='/'>Voltar</Link>
                        </div>

                        <Button className='w-100' type="submit">
                            Criar Conta
                        </Button>
                        {loading && <p>Carregando...</p>}
                    </Form>

                </Col>
            </Row>

        </Container>

    )
}
