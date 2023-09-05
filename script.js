import data from "./data.js";
class Card {
  constructor(pokemon_data) {
    this.pokemon_name = pokemon_data.name;
    this.pokemon_image_url = pokemon_data.ThumbnailImage;
    this.pokemon_type_list = pokemon_data.type;
    this.pokemon_weight = pokemon_data.weight;
    this.pokemon_weakness = pokemon_data.weakness;
    this.pokemon_abilities = pokemon_data.abilities;

    this.html_container = document.createElement("div");
    this.html_container.classList.add("grid-element-container");
    this.html_element = document.createElement("div");
    this.html_element.classList.add("grid-element");
    this.html_container.appendChild(this.html_element);
    this.clicked = false;
  }
  showCard() {
    this.html_container.style.display = "block";
  }
  removeCard() {
    this.html_container.style.display = "none";
  }
  addName() {
    const name = document.createElement("div");
    name.innerHTML = this.pokemon_name;
    name.classList.add("pokemon-name");
    this.html_element.appendChild(name);
  }
  addImage() {
    const image = document.createElement("img");
    image.src = this.pokemon_image_url;
    image.classList.add("pokemon-image");
    this.html_element.appendChild(image);
  }
  addTypeList() {
    const type_list_container = document.createElement("div");
    type_list_container.classList.add("type-list-container");
    type_list_container.innerHTML = `<div><span class="atribute-name">Types: </span>${this.pokemon_type_list.join(
      " - "
    )}</div>`;
    // const type_list = document.createElement("ul");
    // this.pokemon_type_list.forEach((element) => {
    //   const li = document.createElement("li");
    //   li.innerHTML = element;
    //   type_list.appendChild(li);
    // });
    // type_list_container.appendChild(type_list);
    this.html_element.appendChild(type_list_container);
  }
  addClickInteraction() {
    this.html_element.addEventListener("click", (e) => {
      if (!this.clicked && !e.target.classList.contains("close-button-img")) {
        this.html_element.classList.add("open-card");
        this.clicked = true;
      }
    });
  }
  addCloseButton() {
    const close_button = document.createElement("div");
    close_button.classList.add("close-button-container");
    const image = document.createElement("img");
    image.classList.add("close-button-img");
    image.src = "images/close-button.svg";
    close_button.appendChild(image);
    close_button.addEventListener("click", () => {
      this.html_element.classList.remove("open-card");
      this.clicked = false;
    });
    this.html_element.appendChild(close_button);
  }
  addExtraInfo() {
    const extra_info_container = document.createElement("div");
    extra_info_container.innerHTML = `
    <div class="type-list-container">
    <div><span class="atribute-name">Weight:</span> ${this.pokemon_weight}</div>
    <div><span class="atribute-name">Weakness:</span> ${this.pokemon_weakness.join(
      " - "
    )}</div>
    <div><span class="atribute-name">Abilities:</span> ${this.pokemon_abilities.join(
      " - "
    )}</div>
    </div>
    `;
    extra_info_container.classList.add("extra-info");
    this.html_element.appendChild(extra_info_container);
  }
  addToDoom() {
    document.querySelector("#grid-container").appendChild(this.html_container);
  }
  static build(pokemon_data) {
    const card = new Card(pokemon_data);
    card.addName();
    card.addImage();
    card.addTypeList();
    card.addToDoom();
    card.addClickInteraction();
    card.addCloseButton();
    card.addExtraInfo();
    return card;
  }
}

class Pokedex {
  constructor(plain_data) {
    console.log("Iniciando constructor");
    this.plain_data = plain_data;
    this.cards = [];
    this.plain_data.forEach((pokemon) => {
      let card = Card.build(pokemon);
      this.cards.push(card);
    });
    this.search_bar = document.querySelector("#search-bar");
    this.search_bar.addEventListener("input", () => {
      for (let i = 0; i < this.cards.length; i++) {
        const card = this.cards[i];
        let input = this.search_bar.value.toLowerCase();
        if (input === "") {
          card.showCard();
        } else {
          try {
            if (!!card.pokemon_name.toLowerCase().match(input)) {
              card.showCard();
            } else {
              card.removeCard();
            }
          } catch (error) {
            console.error(card);
          }
        }
      }
    });
  }
}

function filter_duplicates(arr) {
  let ids = [];
  let elementos = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!ids.includes(element.id)) {
      ids.push(element.id);
      elementos.push(element);
    }
  }
  return elementos;
}
const p = new Pokedex(filter_duplicates(data));
