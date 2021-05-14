let number = 0;
const ID = "id";
const SERVER = "server";
const POPULATION = "population";
// The order of the keys that we want to display data in the table
const fields = [ID, SERVER, POPULATION];
// Get the table element, and get the reference of `tbody`
const table = document.getElementById("table");
const tbodyRef = table.getElementsByTagName("tbody")[0];
// Create the api lists

let list = [];

//Create the chart
function drawTable() {
// Loop through the list of pokemons (above)
list.forEach((world, index) => {
    world.forEach ((place, index) => {
        const row = tbodyRef.insertRow(index);
        const id = place.id;
        const server = place.name;
        const population = place.population;
        // Build up HTML representing the table row
        let rowHTML = "";
        // Go through the fields
        fields.forEach((key) => {
            // Get the value for this key
            // Build up HTML representing the column
            let colHTML = "";
            // A switch is basically a if statement
            switch (key) {
                case SERVER:
                // Create the image
                colHTML = `${server}`;
                break;
                case POPULATION:
                // Add the name with a link
                colHTML = `${population}`;
                break;
            }
            // If key is ID, we want to wrap the HTML in a <th>
            if (key === ID) {
                colHTML = `<th scope="row">${id}</th>`;
            } else {
            // Else, wrap it in a <td>
                colHTML = `<td>${colHTML}</td>`;
            }
        // Append the row to
        rowHTML += colHTML;
        });
    row.innerHTML = rowHTML;
    });    
// Set the row's HTML with the created HTML

});
}

fetch("https://api.guildwars2.com/v2/worlds?ids=all")
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        list.push(json);
        drawTable();
    })
    .catch((error) => {
        // do something with the error
        console.log(error)
    });

drawTable();

// apiLink = ["https://api.guildwars2.com/v2/worlds?ids=all"]

// Promise.all(
//     apiLink.map((link) => {
//         return search(`${link}`)
//     })
//     )
//     .then((values) => {
//         list = values;
//         });
//         drawTable();
//     });