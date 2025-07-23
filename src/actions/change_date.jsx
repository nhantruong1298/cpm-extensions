async function changeDate() {
  const element = document.querySelector('input[name="plan[time_checkin]"]');
  if (element) {
    element.value = "2024-12-24";
  }
}

export default changeDate;
