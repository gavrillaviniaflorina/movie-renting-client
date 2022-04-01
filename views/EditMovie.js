import Home from "./Home.js";
import Data from "../js/api.js";

class EditMovie {


    constructor(t, a, g, y, id) {

        this.id = id;
        this.t = t;
        this.a = a;
        this.g = g;
        this.y = y;

        this.container = document.querySelector(".container");
        this.container.innerHTML = ``;
        this.createMain();

        this.cancel = document.querySelector(".cancel");
        this.cancel.addEventListener("click", this.handleCancel);

        this.update = document.querySelector(".update");
        this.update.addEventListener("click", this.handleUpdateMovie);

        this.delete = document.querySelector(".delete");
        this.delete.addEventListener("click", this.handleDeleteMovie);


        this.handleExit();


    }


    createMain = () => {

        let main = document.createElement("main");
        main.classList = "main-new";
        main.innerHTML = `
        <fieldset>
            <h1>New Movie</h1>

            <label for="title">Title</label>
            <input class="title">

            <label for="director">Director</label>
            <input class="director">

            <label for="genre">Genre</label>
            <input class="genre">

            <label for="year">Year</label>
            <input class="year">

            <button class="update">Update movie</button>
            <button class="cancel">Cancel</button>
            <button class="delete">Delete movie</button>
        </fieldset>

        <section class="errors"></section>
        `


        this.container.appendChild(main);
        let title = document.querySelector(".title");
        title.value = `${this.t}`;

        let director = document.querySelector(".director");
        director.value = `${this.a}`;

        let genre = document.querySelector(".genre");
        genre.value = `${this.g}`;

        let year = document.querySelector(".year");
        year.value = `${this.y}`;


    }

    handleCancel = (e) => {
        new Home();
    }

    checkError = (t, a, g, y) => {

        let errors = document.querySelector(".errors");
        errors.innerHTML = "";
        let flag = 0;
        if (t === "") {
            let div1 = document.createElement("DIV");
            div1.classList = "error";
            div1.innerHTML = "<p>Invalid title</p>  <p>X</p>";
            errors.appendChild(div1);
            flag = 1;
        }

        if (a === "") {
            let div2 = document.createElement("DIV");
            div2.classList = "error";
            div2.innerHTML = "<p>Invalid director</p> <p>X</p>";
            errors.appendChild(div2);
            flag = 1;

        }

        if (g === "") {
            let div3 = document.createElement("DIV");
            div3.classList = "error";
            div3.innerHTML = "<p>Invalid type</p> <p>X</p>";
            errors.appendChild(div3);
            flag = 1;
        }

        if (y === "" || isNaN(y)) {
            let div4 = document.createElement("DIV");
            div4.classList = "error";
            div4.innerHTML = "<p>Invalid year</p> <p>X</p>";
            errors.appendChild(div4);
            flag = 1;
        }

        return flag;

    }

    handleUpdateMovie = (e) => {
        let t = document.querySelector(".title").value;
        let a = document.querySelector(".director").value;
        let g = document.querySelector(".genre").value;
        let y = document.querySelector(".year").value;


        if (this.checkError(t, a, g, y) == 0) {
            let movie = { title: t, director: a, gen: g, year: y };


            let data = new Data();
            data.updateMovie(this.id, movie);

            location.reload();
        }
    }

    handleDeleteMovie = (e) => {

        let data = new Data();


        data.deleteMovie(this.id);


        console.log(this.id);
        location.reload();


    }

    handleExit = (e) => {
        let errors = document.querySelector(".errors");

        errors.addEventListener("click", (e) => {

            let x = e.target;

            if (x.innerHTML == `X`) {
                let parent = x.parentNode;
                errors.removeChild(parent);
            }
        })
    }

}

export default EditMovie;