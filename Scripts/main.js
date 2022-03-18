const endPointCountries = 'https://api.covid19api.com/countries';
const endPointSearchForCountry = 'https://api.covid19api.com/total/country/[country-id]';
const endPointWorld = 'https://api.covid19api.com/world/total';

async function init () {
   await getCountries();
}

async function getCountries() {
    const response = await fetch(endPointCountries);
    await validateReturnCountriesRequest(response); 
}

async function validateReturnCountriesRequest (response) {
    if (response.status === 200) {
        const jsonResponse = await response.json();
        await addCountriesToSelect(await sortArray(jsonResponse));
    }
    else {
        console.log('Error');
    }
}

async function addCountriesToSelect (jsonResponse) {
    const selectCountries = document.getElementById('countries');
    jsonResponse.forEach(country => {
        let option = document.createElement('option');
        option.value = country.Slug;
        option.innerHTML = country.Country;
        selectCountries.options.add(option);
    }); 
}

async function searchForCountry () {
    const countrySelected = document.getElementById('countries').value;
    const response = await fetch(endPointSearchForCountry.replace('[country-id]', countrySelected));
    await validateReturnCountrySearch(response);
}

async function validateReturnCountrySearch (response) {
    if (response.status === 200) {
        const jsonResponse = await response.json();
        await validateCountryInfos(jsonResponse);
        // await callWorldInfo();
    }
    else {
        console.log('Error');
    }
}

async function validateCountryInfos (jsonResponse) {
    const currentDayInfos = jsonResponse.pop();
    currentDayInfos != null ? await fillInfos(currentDayInfos) : await noInfosForThisCountry();
}

async function fillInfos (countryInfos) {
    await removeVisibilitySearchScreen();
    document.getElementById('result-screen').style.display = 'flex';
    document.getElementById('country-name').innerHTML = countryInfos.Country.toUpperCase();
    document.getElementById('confirmed-cases').innerHTML = numberWithCommas(countryInfos.Confirmed);
    document.getElementById('confirmed-deaths').innerHTML = numberWithCommas(countryInfos.Deaths) + ' lives';
}

async function noInfosForThisCountry () {
    document.getElementById('no-info').innerHTML = 'This country does not have information in our system.';
}

async function removeContentNoInfo () {
    document.getElementById('no-info').innerHTML = ''; 
}

async function removeVisibilityResultScreen () {
    document.getElementById('result-screen').style.display = 'none';
}

async function removeVisibilitySearchScreen () {
    document.getElementById('search-screen').style.display = 'none';
}

async function addVisibilitySearchScreen () {
    document.getElementById('search-screen').style.display = 'flex';
}

async function backSearchScreen () {
    removeVisibilityResultScreen();
    addVisibilitySearchScreen();
}

async function sortArray (objArray) {
    return objArray.sort(function(a, b) {
        return a.Country.localeCompare(b.Country)      
      });      
}


function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}





