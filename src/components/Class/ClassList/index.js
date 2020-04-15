import React, {useEffect, useState} from 'react';


import { Table } from 'react-bootstrap';

import api from '../../../services/api';
import ClassItem from '../ClassItem';

function ClassList(){

    const[classes, setClasses] = useState([]);  
    
    async function loadClasses(){
        const response = await api.get('/class');
        setClasses(response.data);
      }
    useEffect(() => {
        loadClasses();
    }, [])

    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Sala</th>
                    <th>Horário</th>
                    <th>Instrutor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {classes.map(classe => (
                    <ClassItem classe={classe} updateClasses={loadClasses} />
                ))}
            </tbody>

            
        </Table>
    );
}

export default ClassList;