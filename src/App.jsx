import { useState } from "react";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { questions } from "./data";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      {!user && <Login onLogin={setUser} />}
      {user && !finished && <Quiz onFinish={(score) => { setScore(score); setFinished(true); }} />}
      {finished && <Result name={user} score={score} total={questions.length} onRestart={() => { setUser(null); setFinished(false); setScore(0); }} />}
    </div>
  );
}

export default App;
