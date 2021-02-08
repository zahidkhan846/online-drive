import { Form, Modal } from "react-bootstrap";
import React, { Fragment, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { FaFolderPlus } from "react-icons/fa";
import { database } from "../../config/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

function AddFolderButton({ currentFolder }) {
  const { currentUser } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const openAddFolderModal = () => {
    setIsModalOpen(true);
  };

  const closeAddFolderModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.currentTime(),
    });
    setName("");
    closeAddFolderModal();
  };

  return (
    <Fragment>
      <Button
        variant="outline-success"
        onClick={openAddFolderModal}
        className="mt-2"
      >
        <FaFolderPlus />
      </Button>
      <Modal show={isModalOpen} onHide={closeAddFolderModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeAddFolderModal}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
}

export default AddFolderButton;
