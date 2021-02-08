import React, { useContext, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { database, storage } from "../../config/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import { Toast, ProgressBar } from "react-bootstrap";
import ReactDOM from "react-dom";

export default function AddFile({ currentFolder }) {
  const { currentUser } = useContext(AuthContext);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => {
      return [
        ...prevUploadingFiles,
        {
          id: id,
          name: file.name,
          progress: 0,
          error: false,
        },
      ];
    });

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const fileUpload = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    fileUpload.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadingFile) => {
            if (uploadingFile.id == id) {
              return { ...uploadingFile, progress: progress };
            }
            return uploadingFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadingFile) => {
            if (uploadingFile.id == id) {
              return { ...uploadingFile, error: true };
            }
            return uploadingFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadingFile) => {
            return uploadingFile.id !== id;
          });
        });
      }
    );
    fileUpload.snapshot.ref.getDownloadURL().then((url) => {
      database.files
        .where("name", "==", file.name)
        .where("userId", "==", currentUser.uid)
        .where("folderId", "==", currentFolder.id)
        .get()
        .then((existingDocument) => {
          const existingFile = existingDocument.docs[0];
          if (existingFile) {
            existingFile.ref.update({ url: url });
          } else {
            database.files.add({
              url: url,
              name: file.name,
              createdAt: database.currentTime(),
              folderId: currentFolder.id,
              userId: currentUser.uid,
            });
          }
        });
    });
  };

  return (
    <>
      <label className="btn btn-outline-success mt-3 ml-2">
        <FaFileUpload />
        <input
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-10000px" }}
          type="file"
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => {
              return (
                <Toast
                  key={file.id}
                  onClose={() => {
                    setUploadingFiles((prevUploadingFiles) => {
                      return prevUploadingFiles.filter((uploadingFile) => {
                        return uploadingFile.id !== file.id;
                      });
                    });
                  }}
                >
                  <Toast.Header
                    closeButton={file.error}
                    className="text-truncate w-100 d-block"
                  >
                    {file.name}
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar
                      animated={!file.error}
                      variant={file.error ? "danger" : "primary"}
                      now={file.error ? 100 : file.progress * 100}
                      label={
                        file.error
                          ? "Error"
                          : `${Math.round(file.progress * 100)}%`
                      }
                    />
                  </Toast.Body>
                </Toast>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
