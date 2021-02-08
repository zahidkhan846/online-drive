import { useContext, useEffect, useReducer } from "react";
import { database } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";

export const ACTIONS = {
  SELECT_FOLDER: "SELECT_FOLDER",
  UPDATE_FOLDER: "UPDATE_FOLDER",
  SET_CHILD_FOLDERS: "SET_CHILD_FOLDERS",
  SET_CHILD_FILES: "SET_CHILD_FILES",
};

export const ROOT_FOLDER = {
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

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: action.payload.childFolders,
      };

    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: action.payload.childFiles,
      };

    default:
      return state;
  }
};

export const useFolder = (folderId = null, folder = null) => {
  const { currentUser } = useContext(AuthContext);

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
    } else
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
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: {
            childFolders: snapshot.docs.map(database.formatDoc),
          },
        });
      });
  }, [folderId, currentUser]);

  useEffect(() => {
    return database.files
      .where("folderId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: {
            childFiles: snapshot.docs.map(database.formatDoc),
          },
        });
      });
  }, [folderId, currentUser]);

  return state;
};
