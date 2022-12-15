const azioneBottone = function (e) {
  //   const primoBottone = document.querySelector("button");
  const input = document.querySelector("input");
  //   input.value;
  //   console.log(input.value);
  const listaordinata = document.querySelector("ol");
  const elementoli = document.createElement("li");
  const creaBottone = document.createElement("button");
  elementoli.innerText = input.value;
  creaBottone.innerText = "Cancella";
  creaBottone.onclick = () => {
    elementoli.remove();
  };

  elementoli.onclick = function (event) {
    console.log(event);
    event.currentTarget.classList.add("taskcompletato");
  };
  elementoli.appendChild(creaBottone);

  listaordinata.appendChild(elementoli);
};

// const elmLista = document.querySelectorAll("li");
// elmLista.onclick = (event) => {
//   console.log(event);
//   event.currentTarget.classList.add("taskcompletato");
// };

//onclick onkeyup onchange
