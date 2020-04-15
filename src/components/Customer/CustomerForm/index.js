import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';

import MaskedInput from 'react-text-mask'

import {useParams} from "react-router-dom";

import api from '../../../services/api';

import { Button, Form, Row, Col } from 'react-bootstrap';


function CustomerForm({onSubmit, onUpdate}){

    const[disabled, setDisabled] = useState(false);
    const[name, setName] = useState('');
    const[id, setId] = useState('');
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

    let {userId} = useParams();
    useEffect(() => {
        async function loadCustomer(){
            if (typeof userId != "undefined" && userId != null){
                const response = await api.get('/customer/' + userId);
                const customer = response.data[0];
                setName(customer.name);
                setLastName(customer.lastName);
                setRg(customer.rg);
                setCpf(customer.cpf);
                setCity(customer.city);
                setStreet(customer.street);
                setNeightboor(customer.neightboor);
                setNumber(customer.number);
                setComplement(customer.complement);
                setRegistration(customer.registration);
                setZip(customer.zip);
                setDisabled(true);
            }
        }
        loadCustomer();
      }, [userId])


    
    function getErrorElement(){
        var errorDiv = document.createElement('small');
        errorDiv.classList.add('text-muted');
        errorDiv.classList.add('form-text');
        return errorDiv;
    }

    function submitForm(e) {
        e.preventDefault();
        var numOfErrors = 0;
        var elements = document.querySelectorAll('.required-el');
        Array.prototype.forEach.call(elements, function(el, i){
            if (el.value == null || el.value == ""){
                var errorDiv = getErrorElement();
                errorDiv.innerHTML = "Este campo é obrigatório";
                numOfErrors = numOfErrors + 1;
                if (!!!el.parentNode.querySelector('small'))
                    el.parentNode.appendChild(errorDiv);
            }
        });

        if (TestaCPF(cpf.replace(/[^\d]/g, '')) == false){
            var el = document.getElementById('cpf-input');
            var errorDiv = getErrorElement();
            errorDiv.innerHTML = "Cpf inválido";
            numOfErrors = numOfErrors + 1;
            if (!!!el.parentNode.querySelector('small'))
                el.parentNode.appendChild(errorDiv);
        }

        if (numOfErrors == 0){
            handleSubmit();
        }
        numOfErrors = 0;
    }

    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == "00000000000") return false;
         
      for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
       
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
       
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
       
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    } // algoritmo de https://www.devmedia.com.br/validar-cpf-com-javascript/23916

    function removeErrorMessage(element){
        var elementToRemove = element.parentNode.querySelectorAll('small');
        if (typeof elementToRemove[0] != 'undefined')
            elementToRemove[0].remove();
    }

    return(
        <>
        <h1>Cadastrar aluno</h1>
        <Form onSubmit={submitForm}>

            <Form.Group style={{display: userId == null ? 'none' : 'flex' }}  as={Row}>
                <Form.Label column sm="2">Matrícula</Form.Label>
                <Col sm="10">
                    <Form.Control value={registration} disabled="disabled" onChange={e => setRegistration(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Nome</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" onFocus={e => removeErrorMessage(e.target)} value={name} onChange={e => setName(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Sobrenome</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" onFocus={e => removeErrorMessage(e.target)} value={lastName} onChange={e => setLastName(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">RG</Form.Label>
                <Col sm="10">
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        id="my-input-id" disabled={(disabled)? "disabled" : ""} onFocus={e => removeErrorMessage(e.target)} value={rg}  onChange={e => setRg(e.target.value)}  className="form-control required-el"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">CPF</Form.Label>
                <Col sm="10">
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                        id="cpf-input" disabled={(disabled)? "disabled" : ""} onFocus={e => removeErrorMessage(e.target)} value={cpf} onChange={e => setCpf(e.target.value)}  className="form-control required-el"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Cidade</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" value={city} onFocus={e => removeErrorMessage(e.target)} onChange={e => setCity(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Rua</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" value={street} onFocus={e => removeErrorMessage(e.target)} onChange={e => setStreet(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Bairro</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" value={neightboor} onFocus={e => removeErrorMessage(e.target)} onChange={e => setNeightboor(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Número</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" value={number} onFocus={e => removeErrorMessage(e.target)} onChange={e => setNumber(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Complemento</Form.Label>
                <Col sm="10">
                    <Form.Control value={complement} onChange={e => setComplement(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">CEP</Form.Label>
                <Col sm="10">
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]}
                        id="my-input-id" value={zip} onFocus={e => removeErrorMessage(e.target)}  onChange={e => setZip(e.target.value)} className="form-control required-el"
                    />
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

    async function handleSubmit(){

        if (typeof userId != "undefined" && userId != null){
            await onUpdate({
                zip: zip.replace(/[^\d]/g, ''),
                registration,
                complement,
                number,
                neightboor,
                street,
                city,
                cpf: cpf.replace(/[^\d]/g, ''),
                rg,
                lastName,
                name,
                id: userId
            })
        }else{
            await onSubmit({
                zip: zip.replace(/[^\d]/g, ''),
                registration,
                complement,
                number,
                neightboor,
                street,
                city,
                cpf: cpf.replace(/[^\d]/g, ''),
                rg,
                lastName,
                name
            });

          
        }
      }

}

export default CustomerForm;