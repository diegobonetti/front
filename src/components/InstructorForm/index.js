import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form, Row, Col } from 'react-bootstrap';

function InstructorForm({onSubmit}){
    const[name, setName] = useState('');
    const[lastName, setLastName] = useState('');
    const[rg, setRg] = useState('');
    const[cpf, setCpf] = useState(''); 
    const[classType, setClassType] = useState('');


    return(
        <>
        <h1>Cadastro de instrutores</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Nome</Form.Label>
                <Col sm="10">
                    <Form.Control onChange={e => setName(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Sobrenome</Form.Label>
                <Col sm="10">
                    <Form.Control onChange={e => setLastName(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">RG</Form.Label>
                <Col sm="10">
                    <Form.Control onChange={e => setRg(e.target.value)} type="text" />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">CPF</Form.Label>
                <Col sm="10">
                    <Form.Control onChange={e => setCpf(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            {['radio'].map(type => (
                <div key={`default-${type}`} className="mb-3">
                <Form.Check 
                    type={type}
                    label={"Aula em grupo"}
                    name="classType"
                    value="1"
                    onChange={e => setClassType(e.target.value)}
                />
                <Form.Check 
                    type={type}
                    label={"Musculação"}
                    name="classType"
                    value="2"
                    onChange={e => setClassType(e.target.value)}
                />
                </div>
            ))}

            <div className="send-button">
                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </div>
        </Form>
        </>
    )

    async function handleSubmit(e){
        e.preventDefault();
        let activity_id = classType;
        await onSubmit({
            cpf,
            rg,
            lastName,
            name,
            activity_id
          });
      }

}

export default InstructorForm;