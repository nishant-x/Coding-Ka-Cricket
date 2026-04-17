/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ACTIONS from "../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const editorElement = editorRef.current;

    if (!editorElement) {
      return undefined;
    }

    const handleInput = (event) => {
      const code = event.target.value;
      onCodeChange(code);

      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    };

    editorElement.addEventListener("input", handleInput);

    return () => {
      editorElement.removeEventListener("input", handleInput);
    };
  }, [onCodeChange, roomId, socketRef]);

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket) {
      return undefined;
    }

    const handleCodeChange = ({ code }) => {
      if (code === null || !editorRef.current) {
        return;
      }

      if (editorRef.current.value !== code) {
        editorRef.current.value = code;
        onCodeChange(code);
      }
    };

    socket.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socket.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [onCodeChange, socketRef]);

  return (
    <div style={{ height: "600px" }}>
      <textarea
        id="realtimeEditor"
        ref={editorRef}
        defaultValue=""
        spellCheck={false}
        style={{
          width: "100%",
          height: "100%",
          resize: "none",
          border: "none",
          outline: "none",
          padding: "16px",
          backgroundColor: "#282a36",
          color: "#f8f8f2",
          fontFamily: "Consolas, 'Courier New', monospace",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      />
    </div>
  );
}

export default Editor;
