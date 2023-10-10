import { Form } from "react-bootstrap";

export function Input(props) {
    return(
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
    );
}
