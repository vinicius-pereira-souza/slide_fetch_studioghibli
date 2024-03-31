class Slider {
  constructor() {
    this.buttons = document.querySelectorAll("button");
    this.body = document.body;
    this.title = document.querySelector("h1");
    this.synopsis = document.querySelector("p");
    this.img = document.querySelector("img");

    this.addEventButtons();
  }

  // pass the id of the clicked button to the function that will be searched in the database and the function that will toggle the active button.
  changeValueImage = (e) => {
    const id = e.target.id;

    this.consumeDatasFetchAndAddContent(id);
    this.toggleActiveButton(e.target);
  };

  // search for the db.json file according to the button ID and insert it on the screen.
  consumeDatasFetchAndAddContent = async (id) => {
    const search = await fetch(`./db.json`);
    const jsonData = await search.json();

    const film = await jsonData.films.find((target) => target.id == id);

    if (film) {
      this.title.textContent = film.title;
      this.synopsis.textContent = film.synopsis;
      this.img.src = `./src/imgs/posters/poster${film.id}.png`;
      this.body.style.backgroundImage = `url("./src/imgs/bg/bg${film.id}.png")`;
    }
  };

  // Switch between the id of the clicked button and the one that was previously active.
  toggleActiveButton = (target) => {
    this.buttons.forEach((button) => {
      if (button !== target) {
        button.dataset.active = "";
        target.dataset.active = "true";
      }
    });
  };

  // add function to all on-screen buttons
  addEventButtons = () => {
    this.buttons.forEach((button) => {
      button.addEventListener("click", this.changeValueImage);
    });
  };
}

const slideImage = new Slider();
