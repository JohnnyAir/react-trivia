import React from "react";
import { QuestionsType } from "../api/quiz-api";

interface Props extends QuestionsType {
  playerAnswer: string | undefined;
  onAnswerSelection: (answer: string) => void;
}

const Question: React.FC<Props> = (props: Props) => {
  const { question, answers, playerAnswer, onAnswerSelection } = props;

  return (
    <div>
      <p className="text-2xl" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="flex flex-col">
        <ul className="mt-8 q-answer-list">
          {answers.map((answer) => (
            <li
              key={answer}
              className={`option-label ${ answer === playerAnswer ? "selected" : "" }`}
              onClick={()=>onAnswerSelection(answer)}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
