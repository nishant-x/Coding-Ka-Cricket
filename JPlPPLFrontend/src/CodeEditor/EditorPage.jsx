import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { initSocket } from "../Socket";
import ACTIONS from "../Actions";
import Client from "./Client";
import Editor from "./Editor";

const LANGUAGES = ["cpp", "python", "java", "nodejs"];

function EditorPage() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);

  const runCode = async () => {
    setIsCompiling(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/compile`, {
        language: selectedLanguage,
        code: codeRef.current,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsCompiling(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(ACTIONS.JOINED, ({ clients: joinedClients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
        }
        setClients(joinedClients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, { code: codeRef.current, socketId });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off(ACTIONS.JOINED);
      socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard!");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="flex h-full flex-col lg:flex-row">
        <aside className="flex w-full flex-col border-b border-slate-800 bg-slate-900/80 p-4 lg:w-72 lg:border-b-0 lg:border-r">
          <img src="/images/codecast.png" alt="Logo" className="mx-auto h-20 w-auto" />
          <p className="mt-3 text-sm font-semibold text-cyan-300">Members</p>
          <div className="mt-2 flex-1 overflow-auto pr-1">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          <div className="mt-3 grid gap-2">
            <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white" onClick={copyRoomId}>Copy Room ID</button>
            <button className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white" onClick={() => reactNavigator("/")}>Leave Room</button>
          </div>
        </aside>

        <section className="flex flex-1 flex-col">
          <div className="flex items-center justify-end border-b border-slate-800 bg-slate-900/80 p-3">
            <select
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              onCodeChange={(code) => {
                codeRef.current = code;
              }}
            />
          </div>
        </section>
      </div>

      <button
        className="fixed bottom-4 right-4 z-40 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white"
        onClick={() => setIsCompileWindowOpen((prev) => !prev)}
      >
        {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
      </button>

      {isCompileWindowOpen && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-700 bg-slate-900 p-4 shadow-2xl">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-white">Compiler Output ({selectedLanguage})</h2>
            <div className="flex gap-2">
              <button className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white" onClick={runCode} disabled={isCompiling}>
                {isCompiling ? "Compiling..." : "Run Code"}
              </button>
              <button className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200" onClick={() => setIsCompileWindowOpen(false)}>
                Close
              </button>
            </div>
          </div>
          <pre className="max-h-52 overflow-auto rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200">
            {output || "Output will appear here after compilation"}
          </pre>
        </div>
      )}
    </main>
  );
}

export default EditorPage;
