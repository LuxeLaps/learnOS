import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">😭👉🏻👈🏻 We are unable to create this page</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Click for Dashboard
      </Link>
    </div>
  );
}
