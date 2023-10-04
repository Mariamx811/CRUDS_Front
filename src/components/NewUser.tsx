import React, { useState } from 'react'
import axios from "axios";
import {Button,Form,Col} from 'react-bootstrap';
import User from "./User"
import Swal from 'sweetalert2';

function NewUser() {
  const[user,setUser] = useState<User>({
    user: '',
    name: '',
    gender: 'male',
    pass: '',
    mail: '',
    active: 1
  });

  const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

   const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = 'http://localhost:8080/users/';

    try{
      const {status} = await axios.post(url,user);
      if(status === 201){
        setUser({
          user: '',
          name: '',
          gender: 'male',
          pass: '',
          mail: '',
          active: 1
        })
        window.location.reload();

      }
      else{
        Swal.fire(
          'Failure',
          "Failed to add user!",
          "error")
      }
      }catch(err){
        console.log(err);
    }

  };
  return (
    <Form onSubmit={handleOnSubmit} className='userForm'>
      <h1>Add User</h1>
      <Form.Group controlId='userName'>
        <Form.Label>UserName</Form.Label>
        <Form.Control
          className='userName'
          name='user'
          value={user.user}
          type='text'
          onChange={handleOnChange}
          required
        />        
      </Form.Group>
      <Form.Group controlId='name'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          className='name'
          name='name'
          value={user.name}
          type='text'
          onChange={handleOnChange}
          required
        />        
      </Form.Group>
      <Form.Group controlId='gender'>
        <Form.Label>Gender</Form.Label>
        <Col>
          <Form.Check
            type='radio'
            label='Male'
            name='gender'
            value="male"
            checked={user.gender === 'male'}
            onChange={handleOnChange}
          />
          <Form.Check
            type='radio'
            label='Female'
            name='gender'
            value="female"
            checked={user.gender === 'female'}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          className='email'
          name='mail'
          value={user.mail}
          type='email'
          onChange={handleOnChange}
          required
        />        
      </Form.Group>
      <Form.Group controlId='pass'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          className='pass'
          name='pass'
          value={user.pass}
          type='password'
          onChange={handleOnChange}
          required
        />        
      </Form.Group>
      <Form.Group controlId='activation'>
        <Form.Label>Profile Activation</Form.Label>
        <Col>
          <Form.Check
            type='radio'
            label='Activate'
            name='active'
            value= {1}
            // checked={user.active === 1}
            onChange={handleOnChange}
          />
          <Form.Check
            type='radio'
            label='Deactivate'
            name='active'
            value= {0}
            // checked={user.active === 0}
            onChange={handleOnChange}
          />
        </Col>
      </Form.Group>
      <Form.Group controlId='submit'>
        <Button  type='submit' className='submit-btn'>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

export default NewUser;