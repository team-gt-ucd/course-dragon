import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import StatusButtons from './StatusButtons';


/*** Function to create a modal to add a custom class ***/
function LoginButton() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLogOutForm, setShowLogOutForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');



  const handleLoginClick = () => setShowLoginForm(true);
  const handleSignupClick = () => setShowSignupForm(true);
  const handleLogOutClick = () => setShowLogOutForm(true);

  const handleClose = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
    setShowSuccessMessage(false);
    setShowLogOutForm(false);
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

  const createUsers = () => {
    let apiURL = "http://localhost:4001/user/signup";
  
    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }
  
    // // make sure that there is no duplicate email
   
    //     const existingItem = data.find((item) => item.email === email);
    //     if (existingItem) {
    //       alert(`A user with email ${email} already exists.`);
    //       return;
    //     }
  
        // create the new user object
        let newUser = {
          "username": email,
          "password": password
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
            setEmail('');
            setPassword('');
            // alert(`New user created: ${email}`);
            setShowSuccessMessage(true);    //shows the message on the screen

          })
                
      .catch((error) => {
        console.error(`Error creating user: ${email}.`);
        // Display an error message to the user
        setErrorMessage("An error occurred. Please try again later.");
      })
  };
    
  const loginUsers = () => {
    let apiURL = "http://localhost:4001/user/login";
  
    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }
  
    let userCredentials = {
      "username": email,
      "password": password
    };
  
    // send a POST request to the server to check if the email and password match
    fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmail('');
        setPassword('');;
        //alert('User login')
        // check if login was successful
        if (data.success) {
          setEmail(email);
          setIsLoggedIn(true);
          // refresh the current webpage
          //location.reload();
        } else {
          // display an error message
          setErrorMessage("Incorrect email or password.");
        }
      })
      .catch((error) => {
        console.error(`Error logging in user: ${email}.`);
        setErrorMessage("Incorrect email or password.");
      })
  };
  
  const fetchGoogleAuth = async () => {
    try {
      const response = await fetch('http://localhost:4001/auth/google');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleLogout = () => {
    // code to handle user logout
    setIsLoggedIn(false);
    setEmail('');
    handleClose();
  };
  
  return (
    <div>
      {isLoggedIn ? (
        <div>
        <p onClick={handleLogOutClick}>Test User</p>
        <Modal
          show={showLogOutForm}
          onHide={handleClose}
          dialogClassName="custom-logout-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title> {email} </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <p className="logout-button" onClick={handleLogout}>Log Out</p>
          </Modal.Footer>
        </Modal>
      </div>
      ) : (
    <div className="custom-login-button">
      <p onClick={handleLoginClick}>Login</p>
      <Modal show={showLoginForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={loginUsers}>
            <Form.Group className="custom-login-button">
                <Form.Control name="username" placeholder="Email" type="email" value={email} onChange={handleEmailChange} style={{marginBottom:'10px'}}/>
                <Form.Control name="password" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} style={{marginBottom:'10px'}}/>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button type="submit" variant="success" size="lg" onClick={loginUsers} style={{marginBottom:'10px'}}>
              Login
            </Button>
          </div>
          <div className="d-grid gap-2">
            <Button type="submit" variant="info" size="lg" onClick ={fetchGoogleAuth} >
              Sign In with Google
            </Button>
          </div>
          {ErrorMessage && (
          <div className="alert alert-danger" role="alert">
            {ErrorMessage}
            <Button className="float-end" onClick={() => setErrorMessage("")}>
              Close
            </Button>
          </div>
        )}
          {showLoginMessage && (
        <div className="alert alert-success" role="alert">
          User logged In!
          <Button className="float-end" onClick={handleClose}>
            Close
          </Button>
        </div>
      )}
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
          <Form onSubmit={createUsers}>
            <Form.Group className="custom-login-button">
                <Form.Control name="username" placeholder="Email" type="email" value={email} onChange={handleEmailChange} style={{marginBottom:'10px'}}/>
                <Form.Control name="password" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} style={{marginBottom:'10px'}}/>
            </Form.Group>
          </Form>
          <div className="d-grid gap-2">
            <Button type="submit" variant="success" size="lg" onClick={createUsers} style={{marginBottom:'10px'}}>
              Signup
            </Button>
          </div>
          <div className="d-grid gap-2">
            <Button type="submit" variant="info" size="lg" href="/auth/google">
              Sign Up with Google
            </Button>
          </div>
          {ErrorMessage && (
          <div className="alert alert-danger" role="alert">
            {ErrorMessage}
            <Button className="float-end" onClick={() => setErrorMessage("")}>
              Close
            </Button>
          </div>
        )}
          {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          User created successfully!
          <Button className="float-end" onClick={handleClose}>
            Close
          </Button>
        </div>
        
      )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      )}
  </div>
  );
}

export default LoginButton;