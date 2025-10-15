import { useState } from "react";
import { questions } from "../data";

export default function Quiz({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");

  const handleNext = () => {
    if (selected === questions[index].answer) {
      setScore(score + 1);
    }
    setSelected("");
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      onFinish(score + (selected === questions[index].answer ? 1 : 0));
    }
  };

  return (
    <div className="quiz">
      <h3>
        Question {index + 1} of {questions.length}
      </h3>
      <p>{questions[index].question}</p>

      {questions[index].options.map((opt, i) => (
        <label key={i}>
          <input
            type="radio"
            name="option"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
          />
          {opt}
        </label>
      ))}

      <button onClick={handleNext} disabled={!selected}>
        {index + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
