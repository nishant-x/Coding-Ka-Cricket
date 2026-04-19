/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ACTIONS from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return undefined;

    const handleInput = (event) => {
      const code = event.target.value;
      onCodeChange(code);
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
      }
    };

    editorElement.addEventListener("input", handleInput);
    return () => editorElement.removeEventListener("input", handleInput);
  }, [onCodeChange, roomId, socketRef]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return undefined;

    const handleCodeChange = ({ code }) => {
      if (code === null || !editorRef.current) return;
      if (editorRef.current.value !== code) {
        editorRef.current.value = code;
        onCodeChange(code);
      }
    };

    socket.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    return () => socket.off(ACTIONS.CODE_CHANGE, handleCodeChange);
  }, [onCodeChange, socketRef]);

  return (
    <div className="h-full">
      <textarea
        id="realtimeEditor"
        ref={editorRef}
        defaultValue=""
        spellCheck={false}
        className="h-full w-full resize-none border-0 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 outline-none"
      />
    </div>
  );
}

export default Editor;
