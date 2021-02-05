import React, { useState, useContext, useRef } from "react";
import { Form, Alert, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import MainContainer from "../Container/Container";

function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);

  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Unable to change password");
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button className="w-100" disabled={loading} type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signin">Signin</Link>
      </div>
    </MainContainer>
  );
}

export default ForgotPassword;
