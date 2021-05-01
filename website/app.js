/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'; //zip=94040,us
let apiKey = '&appid=02d9b7117d21441439c2fe54a03e4738&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'/' + (d.getMonth()+1) + '/'+ d.getFullYear();

// Add Click Event Listener.
document.getElementById('generate').addEventListener('click', performAction);

/* Main Function wired to Click Event */
function performAction(e){
    console.log('button clicked!');
    resetUI();

    const zip = document.getElementById('zip').value || 94040;
    const feelings = document.getElementById('feelings').value || 'Happy!';
    const country = 'us'; 

    getWeatherData(zip, country)
    .then(function(newData){
        postData('/create', {
            temp: newData.main.temp,
            feelings: feelings,
            date: newDate
        })
    })
    .then(() => getData('/all'))
    .then(function(data){
        // Add data
        console.log(data);  
        updateUI(data);      
    });
};

/* Function to GET weather data */
const getWeatherData = async (zip, country)=>{
    const res = await fetch(baseURL + 'zip=' + zip + ',' + country + apiKey);    
    try {

        const data = await res.json();
        console.log(data);  
        return data;      
    }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
    } catch(error) {
        console.log("error", error)
    }
};

/* Function to GET Project Data */
const getData = async (url='') => {
    const request = await fetch(url);
    try {
        let allData = await request.json();
        console.log(allData);
        return allData;
    }
    catch(error) {
        console.log("error",error);
    }
};

/* Function to UPDATE UI */
const updateUI = async (allData) => {    
    try{
        document.getElementById('temp').innerHTML = allData['newEntry'].temp + ' degrees celsius.';
        document.getElementById('content').innerHTML = allData['newEntry'].feelings;
        document.getElementById('date').innerHTML = allData['newEntry'].date;
  
    }catch(error){
      console.log("error", error);
    }
};

/* Function to RESET UI */
const resetUI = async (allData) => {    
    try{
        document.getElementById('temp').innerHTML = 'Loading...';
        document.getElementById('content').innerHTML = '';
        document.getElementById('date').innerHTML = '';
  
    }catch(error){
      console.log("error", error);
    }
};