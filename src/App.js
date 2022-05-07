import "./App.scss";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";
import { message } from "antd";
function App() {
  const [inpValue, setInpValue] = useState("");
  const [outValue, setOutValue] = useState("");
  const encrypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };

  const decrypt = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };
  const enCrypt = () => {
    if (inpValue.length === 0) {
      message.error("enter text first");
      return;
    }
    setOutValue(encrypt("salt", inpValue));
  };
  const deCrypt = () => {
    if (inpValue.length === 0) {
      message.error("Enter text first");
      return;
    }
    setOutValue(decrypt("salt", inpValue));
    console.log(decrypt("salt", inpValue).length);
  };
  const copyText = () => {
    navigator.clipboard.writeText(outValue);
    message.success("text copied", 1000);
  };
  return (
    <div className="App">
      <div className="wrapper">
        <h2>Hello World</h2>
        <div className="position-relative inpWrapper">
          <input
            type="text"
            className="input w-100"
            value={inpValue}
            onChange={(e) => {
              setInpValue(e.target.value);
            }}
            id="encryptInp"
            placeholder="Enter text here"
          />
          <span className="hoverBoder"></span>
        </div>
        <div className="d-flex position-relative inpWrapper">
          <input
            type="text"
            className="input w-100"
            value={outValue}
            onChange={(e) => {
              setOutValue(e.target.value);
            }}
            id="decryptInp"
            readOnly
          />
          {outValue.length > 0 && (
            <MdContentCopy className="copyIcon" onClick={() => copyText()} />
          )}
          <span className="hoverBoder"></span>
        </div>
        <div className="btns">
          <button onClick={() => enCrypt()}>encrypt</button>
          <button onClick={() => deCrypt()}>decrypt</button>
        </div>
      </div>
    </div>
  );
}

export default App;
