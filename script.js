import data from "./data.js";
class Card {
  constructor(pokemon_data) {
    this.pokemon_data = pokemon_data;
    this.pokemon_name = pokemon_data.name;
    this.pokemon_image_url = pokemon_data.ThumbnailImage;
    this.pokemon_type_list = pokemon_data.type;
    this.html_element = document.createElement("div");
    this.html_element.classList.add("grid-element");
    document.querySelector("#grid-container").appendChild(this.html_element);
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
    const type_list = document.createElement("ul");
    this.pokemon_type_list.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = element;
      type_list.appendChild(li);
    });
    type_list_container.appendChild(type_list);
    this.html_element.appendChild(type_list_container);
  }
  addToDoom() {
    document.querySelector("#grid-container").appendChild(this.html_element);
  }
  static build(pokemon_data) {
    const card = new Card(pokemon_data);
    card.addName();
    card.addImage();
    card.addTypeList();
    card.addToDoom();
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
  }
}
const p = new Pokedex(data.slice(0, 25));
