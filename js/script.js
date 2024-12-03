const API = "https://api.scryfall.com/cards/search?order=cmc&q=c:red%20pow=3";
const cardsContainer = document.getElementById("cards-container");

function createSpinnerCard(id) {
  let div = document.createElement("div");
  div.id = id;
  div.classList.add(
    "col-12",
    "col-sm-6",
    "col-md-4",
    "col-lg-3",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  div.innerHTML = `
        <div class="card bg-dark border-dark rounded-3 shadow-lg d-flex flex-column justify-content-center align-items-center overflow-hidden" style="height: 300px; width: 200px;">
          <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;"></div>
        </div>`;
  return div;
}

function replaceSpinnersWithNewDiv(array) {
  const cards = document.querySelectorAll(".card");
  let positions = 0;

  cards.forEach((card) => {
    const spinner = card.querySelector(".spinner-border");
    if (spinner) spinner.remove();

    card.innerHTML = `
          <img src="${
            array[positions].image_uris?.normal ||
            "./img/default-magic-card.png"
          }" alt="Magic Card" class="w-100 h-100" style="object-fit: cover;">`;

    const textDiv = document.createElement("div");
    textDiv.classList.add(
      "text-center",
      "border-top",
      "border-dark",
      "w-100",
      "bg-dark",
      "overflow-hidden"
    );
    textDiv.style.height = "30px";

    const scrollingText = document.createElement("span");
    scrollingText.classList.add("scrolling-text");
    scrollingText.innerHTML = array[positions].name;

    textDiv.appendChild(scrollingText);

    card.appendChild(textDiv);

    positions++;
  });
}

async function fetchAndLoad() {
  try {
    const apiResponse = await fetch(API);
    const json = await apiResponse.json();
    const data = await json.data;

    for (let i = 0; i < data.length; i++) {
        cardsContainer.insertAdjacentElement("beforeend", createSpinnerCard(i+1));
    }

    replaceSpinnersWithNewDiv(data);
  } catch (error) {
    console.error(error.message);
  }
}

fetchAndLoad();
