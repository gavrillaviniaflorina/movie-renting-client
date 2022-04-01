import Home from "./Home.js";
import Data from "../js/api.js";

class NewMovie {


    constructor() {

        this.container = document.querySelector(".container");
        this.container.innerHTML = ``;
        this.createMain();

        this.cancel = document.querySelector(".cancel");
        this.cancel.addEventListener("click", this.handleCancel);

        this.new = document.querySelector(".new");
        this.new.addEventListener("click", this.handleNewMoive);

        this.handleExit();


    }


    createMain = () => {

        let main = document.createElement("main");
        main.classList = "main-new";
        main.innerHTML = `
        <fieldset>
            <h1>New Moive</h1>

            <label for="title">Title</label>
            <input class="title">

            <label for="director">Director</label>
            <input class="director">

            <label for="genre">Genre</label>
            <input class="genre">

            <label for="year">Year</label>
            <input class="year">

            <button class="new">Create new movie</button>
            <button class="cancel">Cancel</button>
        </fieldset>

        <section class="errors"></section>
        `

        this.container.appendChild(main);


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

    handleNewMoive = (e) => {
        let t = document.querySelector(".title").value;
        let a = document.querySelector(".director").value;
        let g = document.querySelector(".genre").value;
        let y = document.querySelector(".year").value;

        if (this.checkError(t, a, g, y) == 0) {
            let movie = { title: t, director: a, gen: g, year: y };

            let status = 1;
            let data = new Data();
            data.addMovie(movie);
            location.reload();
        }
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

export default NewMovie;