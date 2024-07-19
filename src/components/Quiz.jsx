import { useState, useEffect } from "react";
import { QUESTIONS_ANSWERS } from "../data.js";
import ProgressBar from "./ProgressBar.jsx";
import Summary from "./Summary.jsx";

let TIMER = 3000;
let summary = {
    skipped : 0 ,
    rightAnswer: 0 ,
    wrongAnswer : 0
}

export default function Quiz() {
    const [quiz, setQuiz] = useState(0);
  
    useEffect(() => {
        const timee = setTimeout(() => {
            if(QUESTIONS_ANSWERS[quiz].answered_correctly == ""){
            QUESTIONS_ANSWERS[quiz].chosenAnswer = "skipped";
            QUESTIONS_ANSWERS[quiz].answered_correctly = "skipped"
            summary.skipped += 16.66;
                if (QUESTIONS_ANSWERS.length > quiz) {
                    setQuiz(quiz => quiz + 1);
                }
            }
        }, TIMER);

        return () => {
            clearTimeout(timee);
        }
    }, [quiz]);

    function handleAnswerClick(chosenAnswer) {
        if (chosenAnswer == QUESTIONS_ANSWERS[quiz].answer) {
            QUESTIONS_ANSWERS[quiz].chosenAnswer = chosenAnswer;
            QUESTIONS_ANSWERS[quiz].answered_correctly = "yes"
            summary.rightAnswer += 16.66;
            if (QUESTIONS_ANSWERS.length > quiz) {
                setQuiz(quiz => quiz + 1);
            }
        }
        else if(chosenAnswer != QUESTIONS_ANSWERS[quiz].answer && chosenAnswer != ""){
            QUESTIONS_ANSWERS[quiz].chosenAnswer = chosenAnswer;
            QUESTIONS_ANSWERS[quiz].answered_correctly = "no"  
            summary.wrongAnswer += 16.66;
            if (QUESTIONS_ANSWERS.length > quiz) {
                setQuiz(quiz => quiz + 1);
            }
        }
    }

    let content;

    if (QUESTIONS_ANSWERS.length === quiz) {
        content = <Summary sumry={summary}></Summary>;
    } else {
        content = (
            <div id="quiz">
                <div id="question-overview">
                    <div id="question">
                        <ProgressBar key={quiz} timer={TIMER} />
                        <h2>{QUESTIONS_ANSWERS[quiz].question}</h2>
                        <ul id="answers">
                            {QUESTIONS_ANSWERS[quiz].options.map((option) => (
                                <li className="answer" onClick={() => handleAnswerClick(option)} key={option}>
                                    <button>{option}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return content;
}
