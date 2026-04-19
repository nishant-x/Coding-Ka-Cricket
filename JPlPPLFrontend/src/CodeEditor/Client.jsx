/* eslint-disable react/prop-types */
import Avatar from "react-avatar";

function Client({ username }) {
  return (
    <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 p-2">
      <Avatar name={username.toString()} size="38" round="10px" />
      <span className="truncate text-sm text-slate-200">{username.toString()}</span>
    </div>
  );
}

export default Client;
