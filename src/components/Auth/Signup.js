import React, { useContext, useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import MainContainer from "../Container/Container";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passowrd do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setError("Unable to create an account");
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button className="w-100" disabled={loading} type="submit">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signin">Log in</Link>
      </div>
    </MainContainer>
  );
}

export default Signup;
