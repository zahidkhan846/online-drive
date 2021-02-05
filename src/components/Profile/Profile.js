import React, { useContext, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import MainContainer from "../Container/Container";

function UserProfile() {
  const [error, setError] = useState();

  const { signoutUser, currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signoutUser();
      history.push("/signin");
    } catch (err) {
      setError("Failed to logout");
    }
  };

  return (
    <MainContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser ? currentUser.email : "Not Signed in"}
          <Link to="update-profile" className="btn btn-primary w-100 mt-2">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="text-center mt-2">
        <Link to="/">Go to Home</Link>
      </div>
    </MainContainer>
  );
}

export default UserProfile;
