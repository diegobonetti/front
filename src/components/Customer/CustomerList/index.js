import React, {useEffect, useState} from 'react';


import { Table } from 'react-bootstrap';

import api from '../../../services/api';
import CustomerItem from '../CustomerItem';

function CustomerList(){

    const[customers, setCustomers] = useState([]);  
    
    async function loadCustomers(){
        console.log("oi");
        const response = await api.get('/customer');
        setCustomers(response.data);
        console.log(customers);
      }
    useEffect(() => {
      loadCustomers();
    }, [])

    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Cpf</th>
                    <th>Rg</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <CustomerItem customer={customer} list={customers} updateCustomers={loadCustomers} />
                ))}
            </tbody>

            
        </Table>
    );
}

export default CustomerList;