import React from 'react';

import api from '../../../services/api'

function CustomerItem(props){


  const{customer, list, updateCustomers} = props;

  async function handleClick(e, id) {
    await api.delete('/customer/'+id);
    updateCustomers();
    e.preventDefault();
  };


    
    return(
      <tr>
        <td>{customer.registration}</td>
        <td>{customer.name} {customer.lastName}</td>
        <td>{customer.cpf}</td>
        <td>{customer.rg}</td>
        <td>
          <a href={`/customer/${customer.user_id}`}>Editar</a> | <a href="#" onClick={(e) => handleClick(e, customer.user_id)}>Excluir</a>
        </td>
      </tr>
    );
}

export default CustomerItem;