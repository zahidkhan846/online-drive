import React, { useContext, useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import MainContainer from "../Container/Container";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { updateEmail, updatePassword, currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passowrd do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/profile");
      })
      .catch(() => {
        setError("Failed to update!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentUser)
    return (
      <MainContainer>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={currentUser.email}
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to keep the old password..."
                  ref={passwordRef}
                />
              </Form.Group>
              <Form.Group id="confirm-password">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to keep the old password..."
                  ref={confirmPasswordRef}
                />
              </Form.Group>
              <Button className="w-100" disabled={loading} type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/profile">Cancel</Link>
        </div>
      </MainContainer>
    );
}

export default UpdateProfile;
