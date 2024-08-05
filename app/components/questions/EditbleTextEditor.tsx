import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditbleTextEditor.css";

interface InputProps {
  editorHtml: string;
  setEditorHtml: Function;
  placeholder: string;
}

const EditableTextEditor = ({
  editorHtml,
  setEditorHtml,
  placeholder,
}: InputProps) => {
  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setEditorHtml(editor.getHTML());
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "color",
    "background",
    "link",
    "image",
  ];

  return (
    <div className="editor">
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EditableTextEditor;
