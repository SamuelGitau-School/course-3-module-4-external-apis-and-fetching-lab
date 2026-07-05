const weatherApi = "https://api.weather.gov/alerts/active?area="
document.getElementById('fetch-weather').addEventListener('click',handleSearch);

// Your code here!
function fetchWeatherAlerts(state){
const STATE_ABBR = state.toUpperCase();

showLoading();
   fetch(`https://api.weather.gov/alerts/active?area=${STATE_ABBR}`)

   .then(response =>{

    if(!response.ok){
        throw new Error(`HTTP error! Status: ${respsonse.status}`);
    }
    return response.json();
   })

   .then(data =>{
    console.log('API Response Data:',data);
    displayAlerts(data,STATE_ABBR);
   })
   .catch(error =>{
    console.log(`Failed to fetch weather alerts for ${STATE_ABBR}:`, error.message);
   });
}

function displayAlerts(data,stateName){

    hideLoading();
    const container = document.getElementById('weather-display');

    container.innerHTML ='';

    const alertList = data.features || [];
    const alertCount = alertList.lenght;

    const summary = document.createElement('h2');
    summary.textContent = `Current watches, warnings, and advisories for ${stateName}:`
    container.appendChild(summary);

    const ul =document.createElement('ul');

    if (alertCount === 0){
        const noAlertItem = document.createElement('li');
        noAlertItem.textContent = "No active weather alerts at this time.";
        ul.appendChild(noAlertItem);
    }
    else{
        alertList.forEach(alert => {
            const li = document.createElement('li')

            li.textContent = alert.properties.headline || "Alert headline unavailable";
            ul.appendChild(li);
            
        });
    }

    container.appendChild(ul);
}

function handleSearch(){
    const inputField = document.getElementById('city-input');
    const stateValue = inputField.value.trim();

    clearError();

    const stateRegex = /^[A-Za-z]{2}$/;

    if (stateValue === ""){
        showError("Please eneter a state abbreviation! Field cannot be empty.");
        return;
    }

    fetchWeatherAlerts(stateValue);
    inputField.value ="";
}

function clearError(){
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}

function showError(message){
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');

    document.getElementById('alerts-display').innerHTML = '';
}

function showLoading() {
  document.getElementById('loading-spinner').style.display = 'block';
  document.getElementById('weather-display').innerHTML = ''; 
} 

function hideLoading() {
  document.getElementById('loading-spinner').style.display = 'none';
}
