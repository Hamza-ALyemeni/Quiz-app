import { QUESTIONS_ANSWERS }  from '../data.js' 
import QuizCompolete from '../assets/quiz-logo.png';

export default function Summary({sumry}) {
    let content;
    let counter = 1;

    content = QUESTIONS_ANSWERS.map((qa) => {
        let style = "user-answer";
        if (qa.answered_correctly == "yes") {
            style += " correct"
        }else if(qa.answered_correctly == "no"){
            style += " wrong";
        }else if(qa.answered_correctly == "skipped"){
            style += " skipped";
        }
        return <li key={qa.question}>
            <h3>{counter++}</h3>
            <div className="question">{qa.question}</div>
            <p className={style}>{qa.chosenAnswer}</p>
        </li>
    })

    return <div id="summary">
        <img src={QuizCompolete} alt="" />
        <h2>Quiz Completed!</h2>
       <div id="summary-stats">
            <p>
                <div className="number">{sumry.skipped}%</div>
                <p className="text">skipped</p>
            </p>
            <p>
                <div className="number">{sumry.rightAnswer}%</div>
                <p className="text">right answer</p>
            </p>
            <p>
                <div className="number">{sumry.wrongAnswer}%</div>
                <p className="text">wrong answer</p>
            </p>
       </div>
    
       <ol>
            {content}
    
        </ol>
    </div>
}