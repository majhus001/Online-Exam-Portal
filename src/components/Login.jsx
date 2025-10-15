import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onLogin(name);
    }
  };

  return (
    <div className="login">
      <h2>Online Exam Portal</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Start Exam</button>
      </form>
    </div>
  );
}
