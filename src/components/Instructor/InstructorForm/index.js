import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MaskedInput from 'react-text-mask'

import { Button, Form, Row, Col } from 'react-bootstrap';

function InstructorForm({onSubmit}){
    const[name, setName] = useState('');
    const[lastName, setLastName] = useState('');
    const[rg, setRg] = useState('');
    const[cpf, setCpf] = useState(''); 
    const[classType, setClassType] = useState('1');

    function removeErrorMessage(element){
        var elementToRemove = element.parentNode.querySelectorAll('small');
        if (typeof elementToRemove[0] != 'undefined')
            elementToRemove[0].remove();
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
    function getErrorElement(){
        var errorDiv = document.createElement('small');
        errorDiv.classList.add('text-muted');
        errorDiv.classList.add('form-text');
        return errorDiv;
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

    return(
        <>
        <h1>Cadastro de instrutores</h1>
        <Form onSubmit={submitForm}>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Nome</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" onFocus={e => removeErrorMessage(e.target)} onChange={e => setName(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Sobrenome</Form.Label>
                <Col sm="10">
                    <Form.Control className="required-el" onFocus={e => removeErrorMessage(e.target)} onChange={e => setLastName(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">RG</Form.Label>
                <Col sm="10">
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        id="my-input-id" className="required-el" onFocus={e => removeErrorMessage(e.target)} onChange={e => setRg(e.target.value)}  className="form-control required-el"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">CPF</Form.Label>
                <Col sm="10">
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
                        id="cpf-input" onFocus={e => removeErrorMessage(e.target)} onChange={e => setCpf(e.target.value)}  className="form-control required-el"
                    />
                </Col>
            </Form.Group>

            <Form.Group id="activity" as={Row}>
                <Form.Label column sm="2">Atividade: </Form.Label>
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
        let activity_id = classType;
        await onSubmit({
            cpf: cpf.replace(/[^\d]/g, ''),
            rg: rg.replace(/[^\d]/g, ''),
            lastName,
            name,
            activity_id
          });
      }

}

export default InstructorForm;