import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="py-10">
      <div className="container flex justify-center items-center flex-col h-screen gap-10">
        <h1 className="text-5xl uppercase">Page Not Found!</h1>
        <span className="text-9xl text-gray-400">404</span>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 text-black px-3 py-4 font-bold hover:opacity-85"
        >
          Back To Main Page
        </button>
      </div>
    </main>
  );
}
