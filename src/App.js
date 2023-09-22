import './App.css';
import React, { useState } from 'react';
import InputText from './InputText';
function App() {

  const [content, setContent] = useState({})

  const [res, setRes] = useState("{}")

  const [showOutput, setShowOutput] = useState(false)

  const updateParent = (name, value) => {
    value = btoa(value)
    switch (name) {
      case "code":
        setContent({
          ...content,
          code: value
        }
        )
        break
      case "input":
        setContent({
          ...content,
          input: value
        }
        )
        break
      case "output":
        setContent({
          ...content,
          output: value
        }
        )
        break
      default:
        console.log("Default")
    }

  }

  // const updateDiv = (response) => {
  //   setRes(response)
  //   console.log(res)
  //   setShowOutput(true)
  // }

  const callApi = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*")
    myHeaders.append('Access-Control-Allow-Credentials', 'true');
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    myHeaders.append('Origin', 'http://localhost:3000');
    var raw = JSON.stringify(content);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/executeCode", requestOptions)
      .then(data => {
        if (!data.ok) {
          throw Error(data.status)
        }
        return data.json()
      }
      ).then(jsonData => {
        setRes(jsonData)
        setShowOutput(true)
      })
      .catch((e) => console.log(e))
  }
  return (
    <div>
      <InputText name="code" updateParent={updateParent} />
      <br />
      <InputText name="input" updateParent={updateParent} />
      <br />
      <InputText name="output" updateParent={updateParent} />
      <br />
      <button onClick={callApi}>Submit</button>
      <br />
     
      {showOutput  && res['status'] === "CompileError" && <div>Error :: {res['output']}</div>}
      {showOutput  && res['status'] === "Fail" && <div>Your Output :: {res['output']} <br/>Expected Output :: {atob(content['output'])} </div>}
      <div>
        {showOutput && <span>Status :: {res['status']}   </span>}
        {showOutput && <span>Execution Time :: {res['execution_time']} ms</span>}
      </div>
    </div>
  )

}
export default App;
