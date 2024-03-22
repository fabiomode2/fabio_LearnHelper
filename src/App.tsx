import "./App.css";
import MainBoard from "./components/MainBoard";
import CreateRow from "./components/CreateRow";
import NewRel from "./components/NewRel";
import Page from "./components/Page";
import { CloseButton } from "./components/CloseButton";
import { useState } from "react";
import { Relation } from "./components/types";
import SmallCard from "./components/SmallCard";
import { SimpleRelation, DataCard } from "./components/types";
import AskRel from "./components/AskRel";
import NewText from "./components/NewText";

//top peores codigos ever written

function App() {
  const [AllData, changeAllData] = useState<DataCard[]>([]);

  localStorage.clear()
  
  const [MainTabVisibility, changeMainTabVisibility] = useState(true);

  const [createFormVisibility, changeFormVisibility] = useState(false);
  const [NewRelVisibility, changeRelVisibility] = useState(false);
  const [createTextVisibility, changeTextVisibility] = useState(false);
  const [AskRelVisibility, changeAskRelVisibility] = useState(false);

  const [AskRelC, changeAskRelC] = useState(<></>);

  const secondarys = [
    changeRelVisibility,
    changeTextVisibility,
    changeFormVisibility,
    changeAskRelVisibility,
  ];
  //Implementacion de una relation para testeo mientras no implemento el almacenamiento de datos en el navegador
  // let dc: DataCard = {
  //   name: "Numeros en Ingles",
  //   data: [
  //     { exp: "one", men: "1" },
  //     { exp: "two", men: "2" },
  //     { exp: "three", men: "3" },
  //     { exp: "four", men: "4" },
  //     { exp: "five", men: "5" },
  //     { exp: "six", men: "6" },
  //     { exp: "seven", men: "7" },
  //     { exp: "eight", men: "8" },
  //     { exp: "nine", men: "9" },
  //     { exp: "ten", men: "10" },
  //   ],
  //   type: "relation",
  // };

  
  if (localStorage.getItem("data") != null)
  {changeAllData(JSON.parse(localStorage.getItem("data")!))
  }
  // else {
  //   changeAllData([dc])
  // }



  const StoredClicked = (type: string, data: DataCard) => {
    if (type == "relation") {
      changeMainTabVisibility(false);
      secondarys.map((item) => item(false));
      //
      //
      //
      //
      //
      changeAskRelC(<AskRel data={data} max_options={3} key={"unique"}/>);
      changeAskRelVisibility(true);
    }
  };
  const TextDone = (text : string) => {
    changeTextVisibility(false);
    changeMainTabVisibility(true);

    console.log(text)
  }

  const RelDone = (array: Relation[]) => {
    //Hide rel show main
    console.log(array)
    changeRelVisibility(false);
    changeMainTabVisibility(true);
    //Get and format data
    let dataFormated: SimpleRelation[] = [];
    array.map((item) => {
      if((item.expression != "") && (item.meaning != "")){
      dataFormated.push({ exp: item.expression, men: item.meaning });}
    });
    //Get name
    let name = "";
    array.map((item) => {
      if (item.key == -1) {
        name = item.expression;
      }

    });
    // Add the data to de "database"
    let variable: DataCard = {
      name: name,
      data: dataFormated,
      type: "relation"
    };
    
    //Add input data to saved
    let temp = AllData
    temp.push(variable)
    changeAllData(temp)


    localStorage.setItem("data", JSON.stringify(AllData));
    console.log("data: ", localStorage.getItem("data"))
  };

  const Manager = (type: string) => {
    changeMainTabVisibility(false);

    console.log(type);

    if (type == "formula") {
      changeFormVisibility(true);
    } else if (type == "relation") {
      changeRelVisibility(true);
    } else if (type == "text") {
      changeTextVisibility(true);
    }
    // else if (type == "askRel") {
    //   changeGetAsked(true);
    // }
    else {
      changeMainTabVisibility(true);
      secondarys.map((item) => item(false));
    }
  };

  return (
    <>
      <MainBoard>
        <Page visible={MainTabVisibility}>
          <h1 className="p-5">Learn Helper</h1>
          <CreateRow somethingCreated={Manager} />
          <hr />
          {/* GRID */}
          <div className="grid-class">
            {/* ITEM GRID */}
          {AllData.map((item, index) => (
            <div className="grid-item">
              <SmallCard
              key={index}
              title={item.name}
              onClick={StoredClicked}
              data={item}
              type={item.type}
            />
            </div>

          ))}
          {/* END GRID */}
          </div>

        </Page>
        <Page visible={createFormVisibility}>
          <CloseButton onClick={Manager} />
        </Page>
        <Page visible={NewRelVisibility}>
          <CloseButton onClick={Manager} />
          <NewRel onDone={RelDone} />
        </Page>
        <Page visible={createTextVisibility}>
          <CloseButton onClick={Manager} />
          <NewText onDone={TextDone}/>
        </Page>
        <Page visible={AskRelVisibility}>
          {AskRelC}
          <CloseButton onClick={Manager} />
        </Page>
      </MainBoard>
    </>
  );
}
export default App;
