import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="border p-3 rounded">
              <h2 className="font-semibold">{task.lessonTitle}</h2>
              <p>Status: {task.status}</p>
              <Link
                to={`/lesson/${task.lessonId}`}
                className="text-blue-500 hover:underline"
              >
                Go to Lesson
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
