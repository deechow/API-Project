const ID = "id";
const SPRITE = "sprite";
const NAME = "name";
const FACT = "fact";
const fields = [ID, SPRITE, NAME, FACT];

const table = document.getElementById("table");
const tbodyRef = table.getElementsByTagName("tbody")[0];

// const containerElement = document.getElementById("pokemonContainer");
const messageElement = document.getElementById("message");

let message = ""
let pokemons = [];
let savedDictionary = {};

function draw() {
    console.log("DRAW");
    tbodyRef.innerHTML = "";
    pokemons.forEach((pokemon, index) => {
        console.log(pokemon.name.capitalize());
    });  
    changeMessage();
    drawTable();
}

function changeMessage() {
    messageElement.innerHTML = message;
}

function drawTable() {
    pokemons.forEach((pokemon, index) => {
        const row = tbodyRef.insertRow(index);          
        const id = pokemon.id;
        const name = pokemon.name.capitalize();
        const link = pokemon.url;
        const height = pokemon.height/10;
        const weight = pokemon.weight/10;
        let rowHTML = "";
        fields.forEach((key) => {
            let colHTML = "";
            switch (key) {
                case SPRITE:
                colHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}"/>`;
                break;
                case NAME:
                colHTML = `<a href="${link}" target="_blank">${name}</a>`;
                break;
                case FACT:
                colHTML = `${name} is about ${height}m tall and weighs about ${weight}kg.`;
                break;
            }
            if (key === ID) {
                colHTML = `<th scope="row">${id}</th>`;
            } else {
                colHTML = `<td>${colHTML}</td>`;
            }
        rowHTML += colHTML;
        });
    row.innerHTML = rowHTML;
    });
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function searchPokemon() {
    const inputField = document.getElementById("pokeSearch");
    const name = inputField.value

    if (name in savedDictionary) {
        message = `${name.capitalize()} has already been added.`;
        changeMessage();
    } else {
        search(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((json) => {
            if (json !== null) {
               savedDictionary[json.name] = true;
               pokemons.push(json);
               message = `${json.name.capitalize()} has been added.`;
               draw();
            }
        });
    }
}

function search(link) {
    return fetch(link)
        .then((data) => {
            return data.json();
        })
        .catch((error) => {
            console.log(error)
            message = `This is not a pokémon. Please try again.`;
            changeMessage();
            return null;
        });
    }

list = ["umbreon", "espeon", "ditto"]

Promise.all(
    list.map((name) => {
        return search(`https://pokeapi.co/api/v2/pokemon/${name}`)
    })
    )
    .then((values) => {
        pokemons = values;
        pokemons.forEach((pokemon) => {
            savedDictionary[pokemon.name] = true;
            });
        draw();
    });