import React, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form, Row, Col } from 'react-bootstrap';

let daysAux = "0000000";
function InstructorForm({onSubmit}){

    let daysJSON = [
        {name: "Segunda-feira", index: 0},
        {name: "Terça-feira", index: 1},
        {name: "Quarta-feira", index: 2},
        {name: "Quinta-feira", index: 3},
        {name: "Sexta-feira", index: 4},
        {name: "Sábado", index: 5},
        {name: "Domingo", index: 6}
    ]
    

    const[startTime, setStartTime] = useState('');
    const[endTime, setEndTime] = useState('');
    const[room, setRoom] = useState('');
    const[daysOfWeek, setDaysOfWeek] = useState('');

    return(
        <>
        <h1>Cadastrar aulas</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Horário de inicio</Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="20:30" onChange={e => setStartTime(e.target.value)} type="text"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Horário de término</Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="21:30" onChange={e => setEndTime(e.target.value)} type="text"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Sala</Form.Label>
                <Col sm="10">
                    <Form.Control placeholder="Sala 5" onChange={e => setRoom(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

       



            {daysJSON.map(day => (
                <Form.Check 
                    type="checkbox"
                    label={day.name}
                    name="classType"
                    value={day.index}
                    onChange={e => updateDaysOfWeek(e.target.value)}
                />
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
        await onSubmit({
            days_of_week: daysOfWeek,
            room,
            end_time: endTime,
            start_time: startTime
        });
      }
    async function replaceAt(string, index, replacement) {
        index = parseInt(index);
        return string.substr(0, index) + replacement+ string.substr(index + 1);
    }
      async function updateDaysOfWeek(index){
        let oldValue = daysAux.charAt(index);
        let newValue = '0';
        if (oldValue == '0'){
            newValue = '1';
        }
        daysAux = await replaceAt(daysAux, index, newValue);
        setDaysOfWeek(daysAux);
    }


}

export default InstructorForm;