import { useEffect, useReducer } from "react";
import { database } from "../config/firebase";

export const ACTIONS = {
  SELECT_FOLDER: "SELECT_FOLDER",
  UPDATE_FOLDER: "UPDATE_FOLDER",
};

const ROOT_FOLDER = {
  name: "Root",
  id: null,
  path: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: action.payload.folder,
      };

    default:
      return state;
  }
};

export const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { folderId, folder },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {
          folder: ROOT_FOLDER,
        },
      });
    }

    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        const currFolder = database.formatDoc(doc);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: currFolder,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: ROOT_FOLDER,
          },
        });
        console.log(err);
      });
  }, [folderId]);

  useEffect(() => {
    database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt");
  }, [folderId, currentUser]);

  return state;
};
