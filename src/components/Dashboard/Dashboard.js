import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "../Buttons/AddFolderButton";
import { Folder } from "../Folder/Folder";
import Navbar from "../Navbar/Navbar";

function Dashboard() {
  const { folder, childFolders } = useFolder("NwzbvgtqIBwg5izR1yO1");
  console.log(folder, childFolders);

  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>;
            })}
          </div>
        )}
      </Container>
    </Fragment>
  );
}

export default Dashboard;
