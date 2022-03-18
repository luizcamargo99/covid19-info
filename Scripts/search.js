const endPointSearchForCountry = 'https://api.covid19api.com/total/country/[country-id]';

async function searchForCountry () {
    const countrySelected = document.getElementById('countries').value;
    const response = await fetch(endPointSearchForCountry.replace('[country-id]', countrySelected));
    await validateReturnCountrySearch(response);
}

async function validateReturnCountrySearch (response) {
    if (response.status === 200) {
        const jsonResponse = await response.json();
        await validateCountryInfos(jsonResponse);
    }
    else {
        console.log('Error');
    }
}

async function validateCountryInfos (jsonResponse) {
    const currentDayInfos = jsonResponse.pop();
    currentDayInfos != null ? fillInfos(currentDayInfos) : noInfosForThisCountry();
}

function fillInfos (countryInfos) {
    removeVisibilitySearchScreen();
    addVisibilityResultScreen();  
    fillCountry(countryInfos.Country);
    fillConfirmedCases(countryInfos.Confirmed);
    fillDeathsCases(countryInfos.Deaths, countryInfos.Confirmed);   
    fillUpdatedDate(countryInfos.Date);
}

function fillCountry (countryName) {
    document.getElementById('country-name').innerHTML = countryName.toUpperCase();
}

function fillConfirmedCases (numbersConfirmedCases) {
    document.getElementById('confirmed-cases').innerHTML = formatNumber(numbersConfirmedCases);
}

function fillDeathsCases (numbersConfirmedDeaths, numbersConfirmedCases) {
    document.getElementById('confirmed-deaths').innerHTML = `${formatNumber(numbersConfirmedDeaths)} lives`;

    const lethality = (numbersConfirmedDeaths/numbersConfirmedCases * 100).toFixed(2);
    document.getElementById('lethality').innerHTML = `Lethality: ${lethality}%`;
}

function fillUpdatedDate (dateUpdated) {
    const date = new Date(dateUpdated);
    document.getElementById('update-date').innerHTML = `Updated: ${date.getMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`;
}

function noInfosForThisCountry () {
    document.getElementById('no-info').innerHTML = 'This country does not have information in our system.';
}

function removeContentNoInfo () {
    document.getElementById('no-info').innerHTML = ''; 
}

function removeVisibilityResultScreen () {
    document.getElementById('result-screen').style.display = 'none';
}

function addVisibilityResultScreen () {
    document.getElementById('result-screen').style.display = 'flex';
}

function removeVisibilitySearchScreen () {
    document.getElementById('search-screen').style.display = 'none';
}

function addVisibilitySearchScreen () {
    document.getElementById('search-screen').style.display = 'flex';
}

function backSearchScreen () {
    removeVisibilityResultScreen();
    addVisibilitySearchScreen();
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
