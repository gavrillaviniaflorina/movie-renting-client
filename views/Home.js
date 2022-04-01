import Data from "../js/Api.js"
import EditMovie from "./EditMovie.js";
import NewMovie from "./NewMovie.js";

class Home {


    constructor() {

        this.api = new Data();

        this.container = document.querySelector(".container");
        this.container.innerHTML = ``;

        this.createMain();
        this.appendCards();


        this.newMovie = document.querySelector(".newMoive");
        this.newMovie.addEventListener("click", this.handleNewMoive);


        let main = document.querySelector(".main-home");
        main.addEventListener("click", this.handleEdit);

    }


    createMain = () => {

        let main = document.createElement("main");
        main.classList = "main-home";
        main.innerHTML = `
        <h1>Movies</h1>
        <button class="newMoive">Create New Moive</button>
        <table>
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Director</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Year</th>
                </tr>

            </thead>
            <tfoot>

            </tfoot>

            <tbody class="table">

            </tbody>
        </table>
        `

        this.container.appendChild(main);

    }


    appendCards = async() => {

        let table = document.querySelector(".table");

        let data = await this.api.movies();

        for (let i = 0; i < data.length; i++) {
            table.appendChild(this.createCard(data[i]));

        }
    }


    createCard = (obj) => {


        let card = document.createElement("tr");
        card.classList = "card";
        card.setAttribute('id', `${obj.id}`)
        card.innerHTML = `
        <th class="title" scope="row">${obj.title}</th>
        <td>${obj.director}</td>
        <td>${obj.gen}</td>
        <td>${obj.year}</td>
        `

        return card;


    }

    handleNewMoive = (e) => {
        new NewMovie();
    }


    handleEdit = (e) => {
        e.preventDefault();

        let title = e.target;

        let id = title.parentElement.id;
        let director = title.nextElementSibling;
        let genre = director.nextElementSibling;
        let year = genre.nextElementSibling;

        if (title.classList == "title") {


            new EditMovie(title.innerHTML, director.innerHTML, genre.innerHTML, year.innerHTML, id);
        }

    }


}

export default Home;