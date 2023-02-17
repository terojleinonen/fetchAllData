console.log("started....")

//Free Star Wars api
let url = 'https://swapi.dev/api/';

const fetchAllRobotsButton = document.querySelector("#fetchAllRobotsButton")
const fetchAllMalesButton = document.querySelector("#fetchAllMalesButton")
const fetchAllFemalesButton = document.querySelector("#fetchAllFemalesButton")
const fetchAllVehiclesButton = document.querySelector("#fetchAllVehiclesButton")
const resultArea = document.querySelector("#resultArea")
const clearResultsButton = document.querySelector("#clearResultsButton")
const fetchInput = document.querySelector("#fetchInput")
const getAllDataButton = document.querySelector("#getAllDataButton")
let results

fetchAllRobotsButton.addEventListener("click", async ()=> {
    results = await GetResultByGender("n/a") 
    //results.forEach(element => resultArea.innerHTML += Object.entries(element).map(([key, value]) => `${key}: ${value}\n`).join(''))
    results.forEach(element => resultArea.innerHTML += element.name +"\n")
})

fetchAllMalesButton.addEventListener("click", async ()=> {
    results = await GetResultByGender("male")
    results.forEach(element => resultArea.innerHTML += element.name +"\n")
})

fetchAllFemalesButton.addEventListener("click", async ()=> {
    results = await GetResultByGender("female")
    results.forEach(element => resultArea.innerHTML += element.name +"\n")
})

fetchAllVehiclesButton.addEventListener("click", async ()=> {
    results = await GetAllVehicles()
    results.forEach(element => resultArea.innerHTML += element.name +"\n")
})

clearResultsButton.addEventListener("click",()=> {
    resultArea.innerHTML = ""
})

getAllDataButton.addEventListener("click",()=>{
    resultArea.innerHTML += "---------------------------------------------------------------\n\n"
    results.forEach((element,index) =>{if(element.name==fetchInput.value) resultArea.innerHTML += Object.entries(results[index]).map(([key, value]) => `${key}: ${value}\n`).join('')} )
})   


async function GetResultByGender(gender){
    let data = await APICall_swapi("people")
    return data.filter(element => element.gender == gender )
}

async function GetAllVehicles(){
    let data = await APICall_swapi("vehicles")
    return data.filter(element => element.passengers)
}

async function APICall_swapi(args){
    let response = await fetch(url+args);
    if(response.ok){
        let data = await response.json(); // read response body and parse as JSON
        return data.results
    }else{
        console.log(response.status)
    }
}