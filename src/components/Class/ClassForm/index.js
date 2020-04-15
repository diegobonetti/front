import React, {useState, useEffect} from 'react';

import {useParams} from "react-router-dom";

import api from '../../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';

import MaskedInput from 'react-text-mask'

import { Button, Form, Row, Col } from 'react-bootstrap';

let daysAux = "0000000";
function InstructorForm({onSubmit, onUpdate}){

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
    const[instructorsList, setInstructorsList] = useState([]);
    const[selectedInstructor, setSelectedInstructor] = useState('');

    let {classId} = useParams();
    useEffect(() => {
        async function loadClass(){
            if (typeof classId != "undefined" && classId != null){
                const response = await api.get('/class/' + classId);
                const classe = response.data;
                setStartTime(classe.start_time);
                setEndTime(classe.end_time);
                setRoom(classe.room);

                if (classe.instructor_id != null){
                    setSelectedInstructor(classe.instructor_id);
                }

                let checks = document.querySelectorAll('.form-check input');
                let days = classe.days_of_week;
                for (let x = 0; x < 7; x++){
                    let day = days.charAt(x);
                    if (day == '1'){
                        checks[x].checked = true;
                    }
                }
                setDaysOfWeek(classe.days_of_week);
                daysAux = classe.days_of_week;
            }
        }
        async function loadInstructors(){
            const instructors = await api.get('/instructor');
            setInstructorsList(instructors.data);
            console.log(instructors.data);
        }
        loadClass();
        loadInstructors();
      }, [classId])

    return(
        <>
        <h1>Cadastrar aulas</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Horário de inicio</Form.Label>
                <Col sm="10">

                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]}
                        placeholder="20:30" value={startTime} onChange={e => setStartTime(e.target.value)}  className="form-control"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Horário de término</Form.Label>
                <Col sm="10">
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]}
                        placeholder="22:30" value={endTime} onChange={e => setEndTime(e.target.value)}  className="form-control"
                    />
                  
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2">Sala</Form.Label>
                <Col sm="10">
                    <Form.Control value={room} placeholder="Sala 5" onChange={e => setRoom(e.target.value)} type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Instrutor</Form.Label>
                <Col sm="10">
                <Form.Control onChange={e => setSelectedInstructor(e.target.value)} value={selectedInstructor} as="select">
                    {instructorsList.map(instructor => (
                        <option value={`${instructor.id}`}>{`${instructor.user.name}`}</option>
                    ))}
                </Form.Control>
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
        if (classId != null){
            await onUpdate({
                days_of_week: daysOfWeek,
                room,
                end_time: endTime,
                start_time: startTime,
                id: classId,
                instructor_id: selectedInstructor
            })
        }else{
            await onSubmit({
                days_of_week: daysOfWeek,
                room,
                end_time: endTime,
                start_time: startTime,
                instructor_id: selectedInstructor
            });
        }
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