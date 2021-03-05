/* eslint-disable react/prop-types */
import React from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizContainer from '../../src/components/QuizContainer';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';

function LoadingWidget () {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Carregando]
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget ({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {' '}
          {/*results.reduce((somatorioAtual, resultAtual)=>{
            const isAcerto = resultAtual===true;
            if(isAcerto){
              return somatorioAtual+1;
            }else{
              return somatorioAtual;
            }
          }, 0)*/}
          {results.filter((x)=>x).length}
           {' '}
          perguntas</p>
        <ul>
          {results.map((result, index)=>(
            <li key={`result___${index}`}>
              {`#0${index+1}`} Resultado: {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
          
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {

  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId=`question__${questionIndex}`;
  const isCorrect= selectedAlternative=== question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFite: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <AlternativesForm onSubmit={(infosDoEvento)=>{
          infosDoEvento.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(()=>{
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 2 *1000);
        }}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect?'SUCCESS':'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  type="radio"
                  onChange={()=> setSelectedAlternative(alternativeIndex)}
                  name={questionId}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
     
          { /*<pre>{ JSON.stringify(question, null, 4) }</pre>*/}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}



const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};


function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion,setCurrentQuestion] = React.useState(0);
  const questionIndex= currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    //results.push(result);
    setResults([...results, result,]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  
  // [React chama de: Efeitos || Effects]
  // CICLO DE VIDA
  // nasce === didMount
  // atualiza === willUpdate
  // morre === willUnmount
  // Com function (não class): usar hook : React.useEffect

  function handleSubmitQuiz(){
    const nextQuestion = questionIndex +1;
    if(nextQuestion < totalQuestions){
      setCurrentQuestion(nextQuestion);
    }else{
      setScreenState(screenStates.RESULT);
    }
  }
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
    </QuizBackground>
  );
}
export default QuizPage;
