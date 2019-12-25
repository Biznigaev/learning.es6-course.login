import autocomplete from "autocompleter";
import "autocompleter/autocomplete.min.css";
import UI from "../config/ui.config";
import store from "../store/countries";

const {  signinFields } = UI;
const { inputCountry, inputCity } = signinFields;

new Promise((resolve, reject) => resolve(store.init()))
    .then(countries => {
        const options = Object.values(countries).reduce((acc, country) => {
            acc.push({ 
                label: country.name, 
                value: country.index 
            });
            return acc;
        }, []);

        autocomplete({
            input: inputCountry,
            fetch: (text, update) => {
                text = text.toLowerCase();
                const suggestions = options.filter(n =>
                    n.label.toLowerCase().startsWith(text)
                );
                update(suggestions);
            },
            onSelect: item => {
                const country = countries[item.value];
                const prevSelectedCountry = store.selectedCountry;
                if (prevSelectedCountry !== false) {
                    prevSelectedCountry.selected = false;
                }
                inputCountry.value = item.label;
                country.selected = true;
                country.getCities().then(cities => inputCity.value = '');
            }
        });
    });

autocomplete({
    input: inputCity,
    fetch: (text, update) => {
        text = text.toLowerCase();
        const selectedCountry = store.selectedCountry;
        let cities = [];
        if (selectedCountry !== false) {
            cities = selectedCountry.cities;
        }
        const options = cities.reduce((acc, city) => {
            acc.push({
                label: city.name,
                value: city.name
            });
            return acc;
        }, []);
        // you can also use AJAX requests instead of preloaded data
        const suggestions = options.filter(n =>
            n.label.toLowerCase().startsWith(text)
        );
        update(suggestions);
    },
    onSelect: item => {
        const selectedCountry = store.selectedCountry;
        if (selectedCountry !== false) {
            const prevCity = selectedCountry.selectedCity;
            if (prevCity !== false) {
                prevCity.selected = false;
            }
            selectedCountry.findCity(item.value).selected = true;
        }
        inputCity.value = item.label;
    }
});