import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();   
    alert("Submitted");   
    setUsername("");
    setPassword(""); 
  };

  // return (
  //   <form onSubmit={handleSubmit} className="mb-3">
  //     <label htmlFor="username">Username</label>
  //     <input 
  //       id="username"
  //       name="username" 
  //       placeholder="Username" 
  //       type="text"
  //       autoComplete="off" 
  //       minlength="3"
  //       maxlength="12"
  //       onChange={e => setUsername(e.target.value)}
  //       value={username}
  //       required 
  //     />
  //     <label htmlFor="password">Password</label>      
  //     <input 
  //       id="password"
  //       name="password" 
  //       placeholder="Password" 
  //       type="password" 
  //       minlength="3"
  //       maxlength="12"
  //       onChange={e => setPassword(e.target.value)}
  //       value={password}
  //       required 
  //     />
  //     <button>Login</button>
  //   </form>
  // );
  return (
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" required />
        <Form.Text className="text-muted">
          We'll never share your username with anyone else.
        </Form.Text>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>  
  );
  
}

export default Login;