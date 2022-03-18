const endPointCountries = 'https://api.covid19api.com/countries';

function init () {
   getCountries();
}

async function getCountries() {
    const response = await fetch(endPointCountries);
    validateReturnCountriesRequest(response); 
}

async function validateReturnCountriesRequest (response) {
    if (response.status === 200) {
        const jsonResponse = await response.json();
        addCountriesToSelect(await sortArray(jsonResponse));
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

function sortArray (objArray) {
    return objArray.sort(function(a, b) {
        return a.Country.localeCompare(b.Country)      
      });      
}







