import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "../Buttons/AddFolderButton";
import { Folder } from "../Folder/Folder";
import { File } from "../Folder/File";
import Navbar from "../Navbar/Navbar";
import FolderBreadcrumbs from "../Folder/FolderBreadcrumbs";
import AddFile from "../Buttons/AddFile";

function Dashboard() {
  const { folderId } = useParams();

  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );
  console.log(childFiles);

  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
          <AddFile currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              return (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <Folder folder={childFolder} />
                </div>
              );
            })}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => {
              return (
                <div
                  key={childFile.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2"
                >
                  <File file={childFile} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Fragment>
  );
}

export default Dashboard;
