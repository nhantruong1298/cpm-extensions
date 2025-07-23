function checkQcCode(value) {
  let checkBox = document.querySelector(
    `input[type="checkbox"][value="${value}"]`
  );

  if (!checkBox.checked) {
    checkBox.click();
  }
}

export default checkQcCode;