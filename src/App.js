import "./styles.css";
import { useState } from "react";
import * as jwt from "jsonwebtoken";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import logo from "../public/logo.jpg";
const secret = process.env.REACT_APP_JWT_SECRET;

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [isAlert, setIsAlert] = useState(false);

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
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 5000);
  };

  return (
    <div className="App">
      <nav class="navbar navbar-dark bg-primary mb-3">
        <div class="container-fluid">
          <a class="navbar-brand d-flex align-items-center" href="/">
            <img
              src={logo}
              alt="logo"
              class="d-inline-block align-text-top mx-2"
              height="30px"
            />
            Singh Brother's: De-message
          </a>
        </div>
      </nav>
      <div className="px-5">
        <textarea
          placeholder="Enter the message or paste the encrypted code"
          value={userInput}
          onChange={inputChangeHandler}
          rows="10"
          class="form-control mb-3"
        ></textarea>
        <div className="d-flex justify-content-end mb-3">
          <button onClick={clearInputHandler} className="btn btn-danger">
            Clear
          </button>
          <button onClick={handleEncrypt} className="btn btn-success mx-1">
            Encrypt
          </button>
          <button onClick={handleDecrypt} className="btn btn-primary">
            Decrypt
          </button>
        </div>
        {isAlert ? (
          <div class="alert alert-success mx-3" role="alert">
            Copied to clipboard!
          </div>
        ) : (
          <span></span>
        )}
        {result ? (
          <div>
            <textarea
              placeholder="Enter the message or paste the encrypted code"
              value={result}
              class="form-control mb-3 output"
              rows="10"
              disabled
            ></textarea>
            <div className="d-flex justify-content-end">
              <CopyToClipboard text={result}>
                <button onClick={copyToClipboard} className="btn btn-dark">
                  Copy
                </button>
              </CopyToClipboard>
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
