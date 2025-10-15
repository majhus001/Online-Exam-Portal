export default function Result({ name, score, total, onRestart }) {
  return (
    <div className="result">
      <h2>Exam Completed 🎉</h2>
      <p>Name: {name}</p>
      <p>Score: {score} / {total}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
