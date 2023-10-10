import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';


export function MeuModal(props){
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    async function editCaminhao(data){
        try {
            console.log(data)
            // await updateCaminhao({
            //     id: caminhaoEdit.id,
            //     modelo: data.modelo,
            //     placa: data.placa,
            //     ano: data.ano
            // });
            // await findCaminhoes();
            toast.success('Caminhão editado com sucesso!');
        } catch (error) {
            toast.error(error);
        }
    }

    return(
        <Modal
        show={props.show}
        onHide={props.onHide}
        >
            <Modal.Header className="justify-content-center text-primary">
                <Modal.Title>
                    {props.modalTitle}
                </Modal.Title>
            </Modal.Header>
            <form
                className="m-auto w-100"
                noValidate
                onSubmit={handleSubmit(editCaminhao)}
            >
                <Modal.Body>
                    <Form.Group className='mb-4'>
                        <Form.Label className="mb-0">{props.label}</Form.Label>
                            <Form.Control 
                                type={props.type} 
                                placeholder={props.placeholder}
                                defaultValue={props.defaultValue}
                                name={props.name}
                                isInvalid={!!props.error}
                                {...props.validations}
                            />
                            {props.error &&
                                <Form.Control.Feedback type="invalid">
                                    {props.error.message}
                                </Form.Control.Feedback>
                            }
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={props.onHide}
                    >
                        Fechar
                    </Button>
                    <Button variant="primary" type="submit">
                        {props.btnConcluir}
                    </Button>
                </Modal.Footer> 
            </form>
        </Modal>
    )
}