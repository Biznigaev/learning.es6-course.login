import autocomplete from "autocompleter";
import "autocompleter/autocomplete.min.css";
import UI from "../config/ui.config";
import store from "../store/countries";

const { formRegister, signinFields } = UI;
const { inputCountry, inputCity } = signinFields;

new Promise((resolve, reject) => resolve(store.init()))
    .then(initCountriesAutocomplete)
    .then(initCitiesAutocomplete);
function initCountriesAutocomplete(countries) {
    const options = Object.values(countries).reduce((acc, country) => {
        acc.push({ 
            label: country.name, 
            value: country.index 
        });
        return acc;
    }, []);
    const countriesField = document.getElementById("country");

    autocomplete({
        input: countriesField,
        fetch: (text, update) => {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            const suggestions = options.filter(n =>
                n.label.toLowerCase().startsWith(text)
            );
            update(suggestions);
        },
        onSelect: item => {
            countriesField.value = item.label;
            const country = countries[item.value];
            country.selected = true;
            console.log(country.cities);
        }
    });
    return [];
}

function initCitiesAutocomplete(cities=[]) {
    const options = [];
    const citiesField = document.getElementById("city");
    return autocomplete({
        input: citiesField,
        fetch: (text, update) => {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            const suggestions = options.filter(n =>
                n.label.toLowerCase().startsWith(text)
            );
            update(suggestions);
        },
        onSelect: item => {
            citiesField.value = item.label;
            const country = countries[item.value];
            country.selected = true;
            console.log(country.cities);
        }
    });
}