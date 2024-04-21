import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { seleccionarFrases } from "./utils";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Container } from "./DropableContainer";

interface Props {
  text: string;
}

const AskText = ({ text }: Props) => {
  const text_dividido = text.split(".");

  let frases_seleccionadas = seleccionarFrases(text_dividido);

  const [clueSentences, changeClueSentences] = useState<String[]>([
    "Primera frase",
    "Ultima frase",
  ]);
  const [alreadyAsked, changeAlreadyAsked] = useState(true);

  const verificarRespuestas = () => {};

  const generarPregunta = () => {
    const nuevasFrases = seleccionarFrases(text_dividido);
    changeClueSentences([nuevasFrases[0], nuevasFrases[-1]]);
  };

  const actualizarRespuestas = () => {};

  return (
    <>
      <div className="flex-column">
        <ol className="">
          <li className="listitem">
            <p className="raleway-f coolp">{clueSentences[0]}</p>
          </li>

          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>

          <li className="listitem">
            <p className="raleway-f coolp">{clueSentences[1]}</p>
          </li>
        </ol>
      </div>

      {alreadyAsked && (
        <>
          <button
            type="button"
            className="btn btn-warning"
            onClick={generarPregunta}
          >
            Next Question
          </button>
        </>
      )}
    </>
  );
};

export default AskText;
