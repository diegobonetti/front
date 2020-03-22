import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form, Row, Col } from 'react-bootstrap';

function CustomerForm({onSubmit}){
    const[name, setName] = useState('');
    const[lastName, setLastName] = useState('');
    const[rg, setRg] = useState('');
    const[cpf, setCpf] = useState(''); 
    const[city, setCity] = useState('');
    const[street, setStreet] = useState('');
    const[neightboor, setNeightboor] = useState('');
    const[number, setNumber] = useState('');
    const[complement, setComplement] = useState('');
    const[registration, setRegistration] = useState('');
    const[zip, setZip] = useState('');


    return(
        <>
        <h1>Cadastrar aluno</h1>
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

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Cidade</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setCity(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Rua</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setStreet(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Bairro</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setNeightboor(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Número</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setNumber(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Complemento</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setComplement(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">Matrícula</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setRegistration(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">CEP</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={e => setZip(e.target.value)} type="text"/>
                    </Col>
                </Form.Group>

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
        await onSubmit({
            zip,
            registration,
            complement,
            number,
            neightboor,
            street,
            city,
            cpf,
            rg,
            lastName,
            name
          });
      }

}

export default CustomerForm;