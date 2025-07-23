function scrollTo(id) {
  const cardHeader = document.getElementById(id);

  console.log("scrollTo", id, cardHeader);

  cardHeader.scrollIntoView({});
}

export default scrollTo;
