import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.scss";
import scrollTo from "../actions/scroll_to";
import clickSignButton from "../actions/click_sign_button";
import checkQcCode from "../actions/check_qc_code";
import clickSaveButton from "../actions/click_save_button";

const Popup = () => {
  //* Get TabId
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  //*Delay
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //* Scroll to Plan QC
  async function handleScrollTo(id) {
    const tab = await getCurrentTab();

    const cardHeader = document.getElementById(id);

    console.log("scrollTo", id, cardHeader);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: scrollTo,
      args: [id],
    });
  }

  //*Check code + ký tên
  const handleCheckCodeAndSign = async (value) => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: checkQcCode,
      args: [value],
    });

    await delay(50);

    handleClickSignButton();
  };

  const handleClickSignButton = async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: clickSignButton,
    });
  };

  //* Nhấn nút lưu
  const handleClickSaveButton = async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: clickSaveButton,
    });
  };

  return (
    <div className="popup-container">
      <div className="common-case-container">
        <span className="common-label">Dự án DC</span>
        <button
          className="check-code-btn"
          style={{ marginBottom: "48px" }}
          onClick={async () => {
            await handleClickSignButton();
            await handleScrollTo("plan_confirm");
          }}
        >
          Ký
        </button>

        <button
          className="check-code-btn"
          onClick={async () => {
            await handleCheckCodeAndSign("1.1");
            await handleScrollTo("plan_confirm");
          }}
        >
          1.1 + ký
        </button>
        <button
          className="check-code-btn"
          onClick={async () => {
            await handleCheckCodeAndSign("1.2");
            await handleScrollTo("plan_confirm");
          }}
        >
          1.2 + ký
        </button>

        <button
          className="check-code-btn"
          onClick={async () => {
            await handleCheckCodeAndSign("6.3");
            await handleClickSaveButton();
            await handleClickSaveButton();
            await handleScrollTo("plan_confirm");
          }}
        >
          6.3 + ký + lưu
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Popup />);
