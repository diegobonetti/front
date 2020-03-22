import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import api from './services/api';

import CustomerForm from './components/CustomerForm/';
import InstructorForm from './components/InstructorForm/';
import ClassForm from './components/ClassForm/';
import Sidebar from './components/Sidebar';
import GenericToast from './components/GenericToast';

function App() {

  const [show, setShow] = useState(false);
  const [toastPhrase, setToastPhrase] = useState('');

  async function handleAddCustomer(data){
    api.post('/customer', data)
    .then(function (response){
      setToastPhrase("Cliente inserido com sucesso");
      console.log(response);
    }).catch(function(error){
      setToastPhrase("Erro ao inserir cliente");
      console.log(error);
    })
    setShow(true);
    setTimeout(() => {
      setShow(false)
    }, 3000);
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
    setShow(true);
    setTimeout(() => {
      setShow(false)
    }, 3000);
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
    setShow(true);
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }

  return(
    <>
    
    {<div id="app">
      
     
        <Router>
        <Sidebar></Sidebar>
        <div className="main">
          <Switch>
            <Route exact path="/class" ><ClassForm onSubmit={handleAddClass}/></Route>
            <Route path="/customer"><CustomerForm onSubmit={handleAddCustomer}/></Route>
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
