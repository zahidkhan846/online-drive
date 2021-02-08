import { Button } from "react-bootstrap";
import React from "react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Folder = ({ folder }) => {
  return (
    <>
      <Button
        to={{
          pathname: `/folder/${folder && folder.id}`,
          state: { folder: folder },
        }}
        variant="outline-dark"
        className="text-truncate w-100"
        as={Link}
      >
        <FaFolder className="mr-2" />
        {folder.name}
      </Button>
    </>
  );
};
