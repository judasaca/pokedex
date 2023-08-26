class Card {
  constructor(pokemon_data, card_column) {
    this.pokemon_data = pokemon_data;
    this.html_element = document.createElement("div");
    document.querySelector(`c-${card_column}`).appendChild(this.html_element);
  }
}

class Pokedex {
  constructor(plain_data) {
    console.log("Iniciando constructor");
    this.plain_data = plain_data;
  }
  // This is a factory method
  static async build() {
    let data = await fetch(
      "https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json"
    );
    data = await data.json();

    return new Pokedex((plain_data = data));
  }
}
// let p = Pokedex.build();
