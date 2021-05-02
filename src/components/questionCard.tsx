import React, { ReactNode } from "react";

interface Props {
  question: string;
  answers: string[];
  callback: any;
  userAns: any;
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
  <div>
    <p className="number">
      Question: {qNum} / {totalQs}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <div>
          <button disabled={userAns} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default questionCard;
