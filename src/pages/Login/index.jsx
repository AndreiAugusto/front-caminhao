import styles from './styles.module.css'
import { Input } from '../../components/Input/Input'

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

export function Login () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, loading } = useContext(AuthContext);

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
            <Col md={6} className='m-auto mt-5 bg-light p-5 rounded margin-responsive'>
            <h1 className='text-center mb-3'>Faça seu login</h1>
            <Form className='d-flex flex-column' noValidate onSubmit={handleSubmit(login)}>
                <Input
                    label='Usuário'
                    type='email'
                    placeholder='Usuário'
                    name='email'
                    error={errors.email}
                    validations={register('email', {
                        required:{
                            value:true,
                            message:'Email obrigatorio!'
                        },
                        pattern:{
                            // eslint-disable-next-line
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
                    <div>
                        <Link to='/register'>Criar conta</Link>
                    </div>
                <Button className='w-100' type="submit">
                    Entrar
                </Button>
                {loading && <p>Carregando...</p>}
            </Form>
            
            </Col>
        </Row>
        </Container>
    )
}
