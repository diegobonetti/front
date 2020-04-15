import React, {useEffect, useState} from 'react';


import { Table } from 'react-bootstrap';

import api from '../../../services/api';
import InstructorItem from '../InstructorItem';

function InstructorList(){

    const[instructors, setInstructors] = useState([]);  
    
    async function loadInstructors(){
        const response = await api.get('/instructor');
       
        await setInstructors(response.data);
      }
    useEffect(() => {
        loadInstructors();
    }, [])

    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Cpf</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {instructors.map(instructor => (
                    <InstructorItem instructor={instructor} updateInstructors={loadInstructors} />
                ))}
            </tbody>

            
        </Table>
    );
}

export default InstructorList;