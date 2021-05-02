import React, { ReactNode } from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./questionCard.styles";

interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAns: AnswerObject | undefined;
  qNum: number;
  totalQs: number;
}

const questionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAns,
  qNum,
  totalQs,
}) => (
  <Wrapper>
    <p className="number">
      Question: {qNum} / {totalQs}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAns?.correctAnswer === answer}
          userClicked={userAns?.answer === answer}
        >
          <button
            disabled={userAns ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default questionCard;
