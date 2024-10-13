import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.scss";

//* Get TabId
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

//*Check QC code
function checkQcCode(value) {
  const query = `input[name="codes[${value}]"]`;
  const checkbox = document.querySelector(query);

  if (checkbox !== null) {
    if (!checkbox.checked) {
      checkbox.click();
    }
  } else {
    alert("Hông tìm thấy QC code !!");
  }
}

function saveQcCode() {
  const saveButton = document.querySelector(".col-sm-5.col-xs-12 button");

  if ((saveButton !== null && `${saveButton.type}`) === "button") {
    saveButton.click();
  } else {
    alert("Hông tìm thấy nút lưu QC code !!");
  }
}

//*Xác nhận đã kí
function clickSignButton() {
  const signButton = document.getElementById("xbutton-confirm");

  if (signButton !== null) {
    signButton.click();
  }
}

//*Delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Popup = () => {
  const handleSignIn = async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["sign-in.js"],
    });
  };

  //*Check code + ký tên
  const handleCheckCodeAndSign = async (code) => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkQcCode,
      args: [code],
    });

    await delay(100);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: saveQcCode,
    });

    await delay(100);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: clickSignButton,
    });
  };

  //*Check code
  const handleCheckCode = async (code) => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkQcCode,
      args: [code],
    });

    await delay(100);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: saveQcCode,
    });
  };

  return (
    <div className="popup-container">
      <div className="sign-in-container">
        <span className="sign-in-label">Đăng nhập:</span>
        <button className="sign-in-btn" onClick={handleSignIn}>
          HCM03723
        </button>
      </div>
      <div className="common-case-container">
        <span className="common-label">TH thông dụng:</span>
        <button
          className="check-code-btn"
          onClick={() => handleCheckCodeAndSign("125")}
        >
          Code 8.1(Đạt) + Ký tên
        </button>
        <button
          className="check-code-btn"
          onClick={() => handleCheckCode("131")}
        >
          code 8.4(call check TC)
        </button>

        <button
          className="check-code-btn"
          onClick={() => handleCheckCode("132")}
        >
          code 8.5(call check KTC)
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
