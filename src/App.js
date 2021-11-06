import "./styles.css";
import { useState } from "react";
import * as jwt from "jsonwebtoken";
const secret = process.env.REACT_APP_JWT_SECRET;

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  const inputChangeHandler = (event) => {
    setUserInput(event.target.value);
  };

  const handleEncrypt = () => {
    var encryptedMessage = jwt.sign({ message: userInput }, secret);
    setResult(encryptedMessage);
  };

  const handleDecrypt = () => {
    try {
      var decryptedMessage = jwt.verify(userInput, secret);
      setResult(decryptedMessage.message);
    } catch (error) {
      console.error(error);
    }
  };

  const clearInputHandler = () => {
    setUserInput("");
  };

  const copyToClipboard = () => {
    window.clipboardData.setData("Text", "hello");
    alert("Copied to clipboard!");
  };

  return (
    <div className="App">
      <textarea
        placeholder="Enter the message or paste the encrypted code"
        value={userInput}
        onChange={inputChangeHandler}
        rows="10"
        cols="30"
      ></textarea>
      <br />
      <button onClick={clearInputHandler}>Clear</button>
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      {result ? (
        <div>
          <input value={result} disabled />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}
