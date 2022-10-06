'use-strict';
// import fetch from "node-fetch";

const URL = "https://rickandmortyapi.com/api";


async function getData() {
    let allData = await fetch(URL).then((response) => response.json()).then((data) => data).catch((err) => console.log(err));

    console.log('The list of API URLs here')
    console.log(allData);

    return allData;
} 

// getData(); // Will give us general data about Rick and Morty




async function getEpisodeByPage(page = 1) {
    let episode = await fetch(`${URL}/episode/?page=${page}`).then((response) => response.json()).then((data) => data).catch((err) => console.log(err));

    if(page == 1) {
        console.log('The list of episodes by default value of a page');
    } else {
        console.log('The list of episodes on a 3rd page')
    }
    console.log(episode.results);

    return episode.results;
}

// getEpisode(); // Will give us the first (default) page of episodes list
// getEpisode(3); // Will give us the fourth page of episodes list





// You can do the same thing by retrieving episode by ID. If no ID provided it can return 
// the default first page or an error message saying you should provide an ID.
// You should either add "${id}" as in template literal or "${id ? id : ""}"

async function getEpisodeById(id) {
    let episode = await fetch(`${URL}/episode/${id ? id : ""}`).then((response) => response.json()).then((data) => data).catch((err) => console.log(err));

    console.log(`This is the episode by ID ${id}`)
    console.log(episode);

    return episode;
}

// getEpisode(5);





// You can search a character by id(s). ids can be an array
// You can search for a character by parameters: name, status (alive, dead, unknown), gender (male, female, genderless, unknown)
// If you don't add anything, it'll be empty by default

async function getCharacter(params, ids) {
    let nameQuery = params && params.name ? `name=${params.name}&` : "";
    let statusQuery = params && params.status ? `status=${params.status}&` : "";
    let genderQuery = params && params.gender ? `gender=${params.gender}&` : "";


    let character = await fetch(`${URL}/character/${ids ? ids : ""}?${nameQuery}${statusQuery}${genderQuery}`).then((response) => response.json()).then((data) => data).catch((err) => console.log(err));
    
    console.log('The character(s) with specified parameters or ID:');
    console.log(ids == undefined ? character.results : character);
    
    return character;
}


// getCharacter(undefined, 9); // Gives an output of character with ID 9
// getCharacter(undefined, [3, 17, 193]); // Gives an output of an array of characters with IDs 3, 17, 193
// getCharacter({name: "rick", status: "alive", gender: "female"}); // Gives an output of a character(s) with these parameters
// getCharacter({gender: "female"}); // Gives an output of characters with gender key "female" value



// Gives an output of locations from Rick and Morty. You can search them by ids,
// by params which can be the name of location, the type of it and the dimension.
// If none are specified by default it will take an empty value and return all of them

async function getLocation(params, ids) {
    let nameQuery = params && params.name ? `name=${params.name}&` : "";
    let typeQuery = params && params.type ? `type=${params.type}&` : "";
    let dimensionQuery = params && params.dimension ? `dimension=${params.dimension}&` : "";


    let location = await fetch(`${URL}/location/${ids ? ids : ""}?${nameQuery}${typeQuery}${dimensionQuery}`).then((response) => response.json()).then((data) => data).catch((err) => console.log(err));

    console.log('The list of locations:');
    console.log(ids == undefined ? location.results : location);

    return location;
}

// getLocation(); // First page of locations list, 20 items
// getLocation({ name: "Citadel" }); // Location with the name "Citadel" in it
// getLocation({ type: "planet", dimension: "unknown" }); // Locations that have type "planet" and dimension "unknown"
// getLocation(undefined, [5, 19, 28]); // Array of locations by id 5, 19, 28