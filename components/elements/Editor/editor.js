import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Form } from "antd";

export default function EditorTinymce() {
  const editorRef = useRef(null);
  const form = Form.useFormInstance();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      form.setFieldValue("body", editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onEditorChange={log}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={form.getFieldValue("body")}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
}
