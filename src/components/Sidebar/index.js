import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {Link} from "react-router-dom";
import './styles.css';

function Sidebar() {
  return (
    <List className="sidebar" disablePadding dense>
       <Link to="/customerList" >
        <ListItem button>
            <ListItemText className="sidebar-item" >Listar clientes</ListItemText>
        </ListItem>
      </Link>
      <Link to="/customer" >
        <ListItem button>
            <ListItemText className="sidebar-item" >Cadastrar clientes</ListItemText>
        </ListItem>
      </Link>
      <Link to="/class" >
        <ListItem button>
            <ListItemText className="sidebar-item">Cadastrar aulas</ListItemText>
        </ListItem>
      </Link>
      <Link to="/classList" >
        <ListItem button>
            <ListItemText className="sidebar-item">Listar aulas</ListItemText>
        </ListItem>
      </Link>
      <Link to="/" >
        <ListItem button>
            <ListItemText className="sidebar-item">Cadastar instrutores</ListItemText>
        </ListItem>
      </Link>
      <Link to="/instructorList" >
        <ListItem button>
            <ListItemText className="sidebar-item">Listar instrutores</ListItemText>
        </ListItem>
      </Link>
    </List>
  )
}

export default Sidebar