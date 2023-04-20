import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import StatusButtons from './StatusButtons';


/*** Function to create a modal to add a custom class ***/
function LoginButton() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => setShowLoginForm(true);
  const handleSignupClick = () => setShowSignupForm(true);

  const handleClose = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  // handle User signup request when the signUp button is clicked after user inputs the email and password

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    let apiURL = "http://localhost:4001/user/";
  
    if (!email || !password) {
      console.log("Email and Password are required");
      return;
    }
  
    // make sure that there is no duplicate email
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        const existingItem = data.find((item) => item.email === email);
        if (existingItem) {
          alert(`A user with email ${email} already exists.`);
          return;
        }
  
        // create the new user object
        let newUser = {
          email: email,
          password: password,
        };
  
        // save the new user to the database
        fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
          mode: "cors",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setShowSuccessMessage(true);
          })
          
      })
      .catch((error) => console.error(error));
  };
    
  return (
    <div className="custom-login-button">
      <p onClick={handleLoginClick}>Login</p>

      <Modal show={showLoginForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="custom-login-button">
                <Form.Control placeholder="Email" type="email" style={{marginBottom:'10px'}}/>
                <Form.Control placeholder="Password" type="password" style={{marginBottom:'10px'}}/>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="success" size="lg" onClick={() => console.log("\nLogin button clicked!")}>
              Login
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleSignupClick}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSignupForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="custom-login-button">
                <Form.Control name="email" placeholder="Email" type="email" value={email} onChange={handleEmailChange} style={{marginBottom:'10px'}}/>
                <Form.Control name="password" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} style={{marginBottom:'10px'}}/>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button variant="success" size="lg" onClick={handleSignup()}>
              Signup
            </Button>
          </div>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginButton;