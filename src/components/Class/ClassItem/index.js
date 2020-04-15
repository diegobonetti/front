import React, {useEffect, useState} from 'react';

import api from '../../../services/api'

function ClassItem(props){

  const[instructor, setInstructor] = useState("");  

  const{classe, updateClasses} = props;
  
   async function handleClick(e, id) {
     await api.delete('/class/'+id);
     updateClasses();
     e.preventDefault();
   };

    useEffect(() => {

      async function loadInstructor(){
        if (classe.instructor_id != null){
          const response = await api.get('instructor/' + classe.instructor_id).then(function (response){
            setInstructor(response.data[0].user.name);
          }).catch(function(error){
            setInstructor("Nenhum");
          })
        }else{
          setInstructor("Nenhum");
        }
      }
      loadInstructor();
    }, [])

    return(
      <tr>
        <td>{classe.room}</td>
        <td>{classe.start_time} - {classe.end_time}</td>
        <td>{instructor}</td>
        <td>
          <a href={`/class/${classe.id}`}>Editar</a> | <a href="#" onClick={(e) => handleClick(e, classe.id)}>Excluir</a>
        </td>
      </tr>
    );
}

export default ClassItem;