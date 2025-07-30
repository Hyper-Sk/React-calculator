import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const isDark = localStorage.getItem("darkMode");
  const localHistory = localStorage.getItem("history");

  const [darkMode, setDarkMode] = useState();
  const [input, setInput] = useState("0");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [output, setOutput] = useState("0");
  const [showHistory, setShowHistory] = useState(false);
  const [popupShow, setPopupShow] = useState(false);

  // console.log(localHistory)

  const getNumber = (e) => {
    const value = e.target.value;

    if (input === "0") {
      if (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "%" ||
        value === "/"
      ) {
        setInput("0");
      } else {
        if (value === ".") {
          setInput("0.");
        } else {
          setInput(value);
        }
      }
    } else {
      setInput(input.concat(value));
    }
  };

  const handleClear = () => {
    console.log("clear");
    setInput("0");
    setResult(0);
  };

  const handleBack = () => {
    let allCalculation = input.split("");
    if (allCalculation.length >= 1) {
      allCalculation.pop();
      allCalculation = allCalculation.join("");
      setInput(allCalculation);
      if (allCalculation.length === 0) {
        setInput("0");
      }
    }
    console.log(allCalculation);
  };

  const handleEqualTo = () => {
    let inputList = input.split("");
    let startNum = inputList[0];
    let endNum = inputList[inputList.length - 1];

    startNum = parseInt(startNum);
    endNum = parseInt(endNum);
    // console.log(inputList)
    // console.log(startNum,endNum)
    if (
      inputList.includes("+") ||
      inputList.includes("-") ||
      inputList.includes("*") ||
      inputList.includes("/") ||
      inputList.includes("%")
    ) {
      if (inputList.length >= 3 && !isNaN(startNum) && !isNaN(endNum)) {
        try {
          setResult(eval(input));
        } catch (error) {
          setResult("Error");
        }

        setHistory([...history, { calculation: input, output: eval(input) }]);

        localStorage.removeItem("history");
        let arrString = JSON.stringify([
          ...history,
          { calculation: input, output: eval(input) },
        ]);
        localStorage.setItem("history", arrString);
      } else {
        setResult("Invalid");
      }
    } else {
      setResult("Invalid");
    }
  };

  const handleOutput = () => {
    let inputList = input.split("");
    let startNum = inputList[0];
    let endNum = inputList[inputList.length - 1];

    startNum = parseInt(startNum);
    endNum = parseInt(endNum);
    // console.log(inputList)
    // console.log(startNum,endNum)
    if (
      inputList.includes("+") ||
      inputList.includes("-") ||
      inputList.includes("*") ||
      inputList.includes("/") ||
      inputList.includes("%")
    ) {
      if (inputList.length >= 3 && !isNaN(startNum) && !isNaN(endNum)) {
        try {
          setOutput(eval(input));
        } catch (error) {
          setOutput("Error");
        }
      } else {
        setOutput("...");
      }
    } else {
      setOutput("");
    }
  };

  const handleHistoryDelete = (item) => {
    let arr = [];
    history.map((i) => {
      if (i !== item) {
        arr.push(i);
      }
    });

    setHistory(arr);
    localStorage.removeItem("history");
    let arrString = JSON.stringify(arr);
    localStorage.setItem("history", arrString);
  };

  const handleHistoryClear = () => {
    setHistory([]);
    localStorage.removeItem("history");
    let arrString = JSON.stringify([]);
    localStorage.setItem("history", arrString);
    setPopupShow(false)
  };

  const openPopup = () => {
    setPopupShow(true);
  };

  useEffect(() => {
    handleOutput();
  }, [input]);

  useEffect(() => {
    isDark === "true" ? setDarkMode(true) : setDarkMode(false);
  }, [darkMode]);

  useEffect(() => {
    let newHistory = localStorage.getItem("history");
    let localStorageHistory = newHistory ? JSON.parse(newHistory) : [];
    setHistory(localStorageHistory);
  }, [result]);

  return (
    <>
      <main className={darkMode ? "main" : "main light"}>
        <div className="calculator-container">
          <div className="calculator">
            <div className="calculator-header">
              <div className="title">
                <h3>Basic Calculator</h3>
              </div>
              <div
                className="icon"
                onClick={() => {
                  setDarkMode((prev) => !prev);
                  localStorage.setItem("darkMode", !darkMode);
                }}
              >
                {!darkMode ? (
                  <i className="uil uil-moon"></i>
                ) : (
                  <i className="uil uil-sun"></i>
                )}
              </div>
            </div>

            <div className="calculator-screen">
              <h3>{input.replaceAll("/", "÷")}</h3>
              <h2>{output ? output : ""}</h2>
              <h1>{result}</h1>
            </div>

            <div className="calculator-keyboard">
              <div className="basic-buttons">
                <button className="calc-btn clear" onClick={handleClear}>
                  C
                </button>
                <button className="calc-btn delete" onClick={handleBack}>
                  ⌫
                </button>
                <button
                  className="calc-btn percent"
                  onClick={(e) => getNumber(e)}
                  value={"%"}
                >
                  %
                </button>
                <button
                  className="calc-btn operator"
                  onClick={(e) => getNumber(e)}
                  value={"/"}
                >
                  ÷
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"7"}
                >
                  7
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"8"}
                >
                  8
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"9"}
                >
                  9
                </button>
                <button
                  className="calc-btn operator"
                  onClick={(e) => getNumber(e)}
                  value={"*"}
                >
                  ×
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"4"}
                >
                  4
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"5"}
                >
                  5
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"6"}
                >
                  6
                </button>
                <button
                  className="calc-btn operator"
                  onClick={(e) => getNumber(e)}
                  value={"-"}
                >
                  −
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"1"}
                >
                  1
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"2"}
                >
                  2
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"3"}
                >
                  3
                </button>
                <button
                  className="calc-btn operator"
                  onClick={(e) => getNumber(e)}
                  value={"+"}
                >
                  +
                </button>
                <button
                  className="calc-btn number"
                  onClick={(e) => getNumber(e)}
                  value={"0"}
                >
                  0
                </button>
                <button
                  className="calc-btn decimal"
                  onClick={(e) => getNumber(e)}
                  value={"."}
                >
                  .
                </button>
                <button className="calc-btn equals" onClick={handleEqualTo}>
                  =
                </button>
              </div>
            </div>
          </div>

          {history.length !== 0 ? (
            <div className="history">
              <div className="history-header">
                <div className="title">
                  <h3>Calculation History</h3>
                </div>
              </div>
              <div className="history-calculations">
                {history.map((item, i) => {
                  return (
                    <div className="calculation" key={i}>
                      <p>{item.calculation.replaceAll("/", "÷")} =</p>
                      <h3>{item.output}</h3>
                      <div
                        className="icon"
                        onClick={() => handleHistoryDelete(item)}
                      >
                        <i className="uil uil-trash-alt"></i>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="history-clear" onClick={openPopup}>
                <p>Clear All</p>
              </div>
            </div>
          ) : (
            <div className="space"></div>
          )}
        </div>

        {popupShow && (
          <div className="popup">
            <h3>Delete All History, Are You Sure !!!</h3>
            <button className="yes" onClick={handleHistoryClear}>
              {" "}
              Yes{" "}
            </button>
            <button className="no" onClick={() => setPopupShow(false)}>
              {" "}
              No{" "}
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          This calculator has been create using react by
          <a
            href="https://linkedin.com/in/shaik-sohail-ba49351b3"
            target="_blank"
          >
            Shaik Sohail
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
