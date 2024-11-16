import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditbleTextEditor.css";

interface InputProps {
  editorHtml: string;
  setEditorHtml: Function;
  placeholder: string;
}

const EditableTextEditor = ({
  editorHtml = "<b></b>",
  setEditorHtml,
  placeholder,
}: InputProps) => {
  const [error, setError] = useState(false);
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const format = quill.getFormat();
      if (!format.bold) {
        quill.format("bold", true);
      }
    }
  }, [quillRef]);

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setEditorHtml(editor.getHTML());
    setError(editor.getText().trim() === "");
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = ["bold", "italic", "underline", "color", "background"];

  return (
    <div className="editor">
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      {error && (
        <div className="text-danger text-sm mt-1">
          پرکردن این فیلد اجباری می باشد.
        </div>
      )}
    </div>
  );
};

export default EditableTextEditor;
