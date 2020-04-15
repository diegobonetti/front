
import React, {useEffect, useState} from 'react';

import api from '../../../services/api'

function InstructorItem(props){


  const{instructor, updateInstructors} = props;
  
   async function handleClick(e, id) {
     await api.delete('/instructor/'+id);
     updateInstructors();
     e.preventDefault();
   };


    return(
      <tr>
        <td>{instructor.user.name} {instructor.lastName}</td>
        <td>{instructor.user.cpf}</td>
        <td>{instructor.activity[0].name}</td>
        <td>
          <a href="#" onClick={(e) => handleClick(e, instructor.id)}>Excluir</a>
        </td>
      </tr>
    );
}

export default InstructorItem;