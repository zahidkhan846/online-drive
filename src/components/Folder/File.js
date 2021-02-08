import React from "react";
import { FaFile } from "react-icons/fa";

export function File({ file }) {
  console.log(file);
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FaFile className="mb-1" /> {file.name}
    </a>
  );
}
