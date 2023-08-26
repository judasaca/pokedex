import data from "./data.js";
class Card {
  constructor(pokemon_data) {
    this.pokemon_data = pokemon_data;
    this.html_element = document.createElement("div");
    //  pokemon-image
    let image = document.createElement("img");
    image.src = pokemon_data.ThumbnailImage;
    image.classList.add("pokemon-image");

    // pokemon name
    let name = document.createElement("div");
    name.innerHTML = pokemon_data.name;
    name.classList.add("pokemon-name");

    let type_list_container = document.createElement("div");
    type_list_container.classList.add("type-list-container");
    let type_list = document.createElement("ul");
    this.pokemon_data.type.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = element;
      type_list.appendChild(li);
    });
    type_list_container.appendChild(type_list);

    this.html_element.appendChild(name);
    this.html_element.appendChild(image);
    this.html_element.appendChild(type_list_container);
    this.html_element.classList.add("grid-element");
    document.querySelector("#grid-container").appendChild(this.html_element);
  }
}

class Pokedex {
  constructor(plain_data) {
    console.log("Iniciando constructor");
    this.plain_data = plain_data;
    this.cards = [];
    this.plain_data.forEach((pokemon) => {
      let card = new Card(pokemon);
      this.cards.push(card);
    });
  }
}
const p = new Pokedex(data.slice(0, 25));
