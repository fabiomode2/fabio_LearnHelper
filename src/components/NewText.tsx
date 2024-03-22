import { useState, ChangeEvent } from "react"


interface props{
    onDone: (text : string) => void
}

const NewText = ({ onDone } : props) => {
  
    const [ErrorMsg, ChangeErrorMsg] = useState("")

    let text = ""
    const TextChanged = (event : ChangeEvent<HTMLTextAreaElement>) => {
        text = event.target.value
    }

    const ButtonPressed = () => {
        if (text == ""){
            ChangeErrorMsg("Text can not be blank")
            return
        }
        ChangeErrorMsg("")
        onDone(text)
    }
  
    return (
    <>
        <h1>Introduce your text</h1>
        <textarea className="form-control h-100 d-inline-block" onChange={TextChanged}></textarea>
        <h4 className="text-danger">{ErrorMsg}</h4>
        <button type="button" className="btn btn-outline-success" onClick={ButtonPressed}>Done</button>
    </>
  )
}

export default NewText