import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Room ID generated!");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both Room ID and Username are required");
      return;
    }

    navigate(`/editor/${roomId}`, { state: { username } });
    toast.success("Joined the room!");
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") joinRoom();
  };

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-xl items-center px-4 py-8">
      <section className="w-full rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-soft">
        <img src="/images/codecast.png" alt="Logo" className="mx-auto h-24 w-auto" />
        <h1 className="mt-3 font-display text-2xl font-bold text-white">Enter the Room ID</h1>

        <div className="mt-5 space-y-3">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400"
            placeholder="ROOM ID"
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-indigo-400"
            placeholder="USERNAME"
            onKeyUp={handleInputEnter}
          />
          <button onClick={joinRoom} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white">
            JOIN
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-300">
          Don&apos;t have a Room ID?{" "}
          <button onClick={generateRoomId} className="font-semibold text-cyan-300 hover:underline">Create New Room</button>
        </p>
      </section>
    </main>
  );
}

export default Home;
