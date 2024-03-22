import { useState } from "react";
import { DataCard, SimpleRelation } from "./types";
import { ShuffleList } from "./utils";

interface Props {
  data: DataCard;
  max_options: number;
}

interface question {
  pregunta: string;
  opciones: string[];
  respuesta: string;
}

const GetRandomItem = (lista: SimpleRelation[]) => {
  return lista[Math.floor(Math.random() * lista.length)];
};

export const AskRel = ({ data, max_options }: Props) => {


  const [CurrentQuestion, changeCurrentQuestion] = useState<question>();
  const [alreadyResponded, changeAlreadyResponded] = useState(true);
  const [finalMessage, changeFinalMessage] = useState("Get Asked");

  const keepgoing = () => {
    changeAlreadyResponded(false);
    changeCurrentQuestion(GetQuestion());
  };

  const GetQuestion = () => {

    let item: SimpleRelation = GetRandomItem(data.data);
    let answers = [];
    
    //While loop to avoid asking the data's name as a question. 
    while (true){
      item = GetRandomItem(data.data);
      if (item.exp != item.men) {

        answers = [item.men];
        break
      }
    }
    //Prevent infinite loop
    let number_of_iterations = 0;
    //Get other meanings to confuse the user
    while (true) {
      let i = GetRandomItem(data.data);
      //Check if answer is already there 
      if ((!(answers.indexOf(i.men) > -1)) && (i.men != i.exp)) {
        answers.push(i.men);
      }
      else{
        number_of_iterations = number_of_iterations + 1;
        console.log("try n", number_of_iterations)
        if (number_of_iterations >= 20){
          answers.push(i.men);
        }
      }
      //Break Condition
      if (
        //Check if we have enough questions
        answers.length >= max_options ||
        answers.length == data.data.length
      ) {
        break;
      }
    }

    //Shuffle the answers and prepare question
    answers = ShuffleList(answers);
    const resultado: question = {
      pregunta: `Qué significa ${item.exp}?`,
      opciones: answers,
      respuesta: item.men,
    };
    return resultado;
  };

  const Answer = (respuesta: string) => {
    changeAlreadyResponded(true);
    if (respuesta == CurrentQuestion?.respuesta) {
      changeFinalMessage("✅Correct!✅");
    } else {
      changeFinalMessage("❌Incorrect❌");
    }
  };

  return (
    <div className="align-items-center justify-content-center h-50 p-5">
      <div className="row">
        <h1>{data.name}</h1>
      </div>
      <div className="row">
        <h5>{CurrentQuestion?.pregunta}</h5>
      </div>
      <div className="row align-items-center justify-content-center p-5">
        {CurrentQuestion?.opciones.map((value, index) => {
          return (
            <div className="row align-items-center justify-content-center" key={value}>
              <button
                type="button" 
                className="btn btn-outline-info w-25 fs-4 m-4" 
                onClick={() => Answer(value)}
                key={index}
                role="button"
              >
                {value}
              </button>
            </div>
          );
        })}
      </div>

      {alreadyResponded && (
        <>
          <h3>{finalMessage}</h3>
          <div className="row align-items-center justify-content-center p-5">
            <button
              type="button"
              className="btn btn-success w-25"
              onClick={keepgoing}
            >
              Next question
            </button>
          </div>
        </>
      )
      }
    </div>
  );
};

export default AskRel;
