import { FormEvent, useState, ChangeEvent } from "react";
import NewRelRow from "./NewRelRow";
import { Relation } from "./types";

interface Props {
  onDone: (array: Relation[]) => void;
}

let relData: [Relation] = [{ key: -1, expression: "", meaning: "" }];
relData.pop();

export const NewRel = ({ onDone }: Props) => {
  const [rowCount, setRowCount] = useState(3);
  const [errorValue, setErrorValue] = useState("");
  const [name, cName] = useState("");

  const addRow = () => {
    setRowCount(rowCount + 1);
  };

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    cName(event.target.value);
  };

  const inputChanged = (expression: string, meaning: string, kkey: number) => {

    if (expression == meaning) return
    //Declare recieved data
    let variable: Relation = {
      expression: expression,
      key: kkey,
      meaning: meaning,
    };
    //Se if its new relation or modification
    let already = false;
    relData.map((item, index) => {
      if (item.key == variable.key) {
        already = true;
      }
      if ((!item.expression || !item.meaning)) {
        delete relData[index];
      }
  
    });
    //Append new or modify an existing one
    if (already) {
      relData[variable.key] = variable;
    } else {
      relData.push(variable);
    }
  };

  const manejarEnvio = (event: FormEvent) => {
    event.preventDefault();
    //Check if name
    if (name == "") {
      setErrorValue("Give it a name!");
      return;
    }
    //Calculate number of data added to have a min. amount
    let relNumber = 0;
    relData.map((item) => {
      if (item.expression && item.meaning) {
        relNumber += 1;
      }
    });
    console.log(relNumber);
    if (relNumber < 3) {
      setErrorValue("Too little data!");
      return;
    }
    //Send data
    setErrorValue("");
    relData.push({key: -1, expression: name, meaning: name});
    onDone(relData);
    console.log("Datos enviados:", relData);
    return;
  };

  return (
    <div className="col flex-column sb">
      <h2>New relation</h2>
      <div className="d-flex align-items-center justify-content-center">
        <input
          className="relational-input w-25"
          type="text"
          placeholder="name"
          aria-label="default input example"
          name="name"
          onChange={changeName}
        />
      </div>
      <form onSubmit={manejarEnvio}>
        {Array.from({ length: rowCount }).map((_, index) => (
          <NewRelRow
            key={index}
            kkey={index}
            closeable={!(index < 3)}
            onChange={inputChanged}
          />
        ))}
        {errorValue && <h4 className="text-danger">{errorValue}</h4>}
        <div className="row flex-center">
          <button
            type="button"
            className="btn btn-secondary w-25 align-self-center p-1 m-2"
            onClick={addRow}
          >
            +
          </button>
          <button
            type="submit"
            className="btn btn-success w-25 align-self-center p-1 m-2"
          >
            ✓
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRel;
