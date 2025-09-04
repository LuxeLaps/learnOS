import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Editor from "@monaco-editor/react";

export default function LessonView() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    api.get(`/lessons/${id}`)
      .then(res => {
        setLesson(res.data);
        // Optionally fetch starter file
        return api.get(`/repos/${res.data.repoId}/file`, {
          params: { path: res.data.starterFile || "app.jsx" }
        });
      })
      .then(fileRes => setCode(fileRes.data.content || ""))
      .catch(err => console.error(err));
  }, [id]);

  const handleCommit = () => {
    api.post(`/repos/${lesson.repoId}/commit`, {
      path: lesson.starterFile || "app.jsx",
      content: code,
      message: `Lesson ${lesson.title} changes`
    })
    .then(() => alert("Committed successfully!"))
    .catch(err => console.error(err));
  };

  if (!lesson) return <p className="p-6">Loading lesson...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p>{lesson.description}</p>
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button
        onClick={handleCommit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Commit Changes
      </button>
    </div>
  );
}
