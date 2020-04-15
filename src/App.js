import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import api from './services/api';

import CustomerForm from './components/Customer/CustomerForm';
import CustomerList from './components/Customer/CustomerList';
import InstructorForm from './components/Instructor/InstructorForm/';
import InstructorList from './components/Instructor/InstructorList/';
import ClassForm from './components/Class/ClassForm';
import ClassList from './components/Class/ClassList'
import Sidebar from './components/Sidebar';
import GenericToast from './components/GenericToast';


function App() {

  const [show, setShow] = useState(false);
  const [toastPhrase, setToastPhrase] = useState('');

  async function displayInFront(){
    setShow(true);
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }

  async function handleUpdateCustomer(data){
    api.put('/customer', data)
        .then(function (response){
          setToastPhrase("Cliente atualizado com sucesso");
          console.log(response);
        }).catch(function(error){
          setToastPhrase("Erro ao atualizar cliente");
          console.log(error);
      })
      displayInFront();
  }

  async function handleAddCustomer(data){
    api.post('/customer', data)
    .then(function (response){
      console.log(response);
      setToastPhrase("Cliente inserido com sucesso, matrícula: " + response.data.registration);
      console.log(response);
    }).catch(function(error){
      setToastPhrase("Erro ao inserir cliente");
      console.log(error);
    })
    setShow(true);
    setTimeout(() => {
      setShow(false)
    }, 10000);
  }
  async function handleAddInstructor(data){
    api.post('/instructor', data)
    .then(function (response){
      setToastPhrase("Instrutor inserido com sucesso");
      console.log(response);
    }).catch(function(error){
      setToastPhrase("Erro ao inserir instrutor");
      console.log(error);
    })
    displayInFront();
  }
  async function handleAddClass(data){
    api.post('/class', data)
    .then(function (response){
      setToastPhrase("Aula inserida com sucesso");
      console.log(response);
    }).catch(function(error){
      setToastPhrase("Erro ao inserir aula");
      console.log(error);
    })
    displayInFront();
  }

  async function handleUpdateClass(data){
    api.put('/class', data)
        .then(function (response){
          setToastPhrase("Aula atualizada com sucesso");
        }).catch(function(error){
          setToastPhrase("Erro ao atualizar aula");
      })
      displayInFront();
  }

  return(
    <>
    
    {<div id="app">
      
     
        <Router>
        <Sidebar></Sidebar>
        <div className="main">
          <Switch>
            <Route path="/instructorList"><InstructorList /></Route>
            <Route exact path="/class" ><ClassForm onSubmit={handleAddClass}/></Route>
            <Route exact path="/class/:classId" ><ClassForm onSubmit={handleAddClass} onUpdate={handleUpdateClass}/></Route>
            <Route exact path="/classList" ><ClassList/></Route>
            <Route exact path="/customerList" ><CustomerList/></Route>
            <Route path="/customer/:userId"><CustomerForm onSubmit={handleAddCustomer} onUpdate={handleUpdateCustomer}/></Route>
            <Route path="/customer/"><CustomerForm onSubmit={handleAddCustomer}/></Route>
            <Route path="/"><InstructorForm onSubmit={handleAddInstructor}/></Route>
            
          </Switch>
          <GenericToast phrase={toastPhrase} show={show} />
          </div>
          
        </Router>
        

      
    </div>
     }
   </>
  )



}

export default App;
