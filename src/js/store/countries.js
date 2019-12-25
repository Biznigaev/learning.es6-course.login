import { countries as getCountries, citiesByCountry as getCities } from '../services/locations.service';

class Countries {
    store;
    constructor() {
        this.store = [];
    }
    async init() {
        const countries = await new Promise((resolve, reject) =>
            resolve(getCountries())
        );
        this.store = this.serializeCountries(countries);
        return this.store;
    }
    serializeCountries(countries) {
        return Object.entries(countries).reduce((prev, [index, name]) => {
            return {
                ...prev,
                [index]: new Country(index, name)
            };
        }, {});
    }
    get countries() {
        return this.store;
    }
    get selectedCountry() {
        const selected = Object.entries(store.countries)
            .find(([index, country]) => country.selected === true)

        if (selected) {
            return selected[1];
        }
        return false;
    }
}

/**
 * @property {Number} index
 * @property {String} name
 * @property {Boolean} selected
 * @property {Array<City>} cities
 */
class Country {
    index;
    name;
    selected;
    cities;

    constructor(_index, _name, _selected = false) {
        this.index = _index;
        this.name = _name;
        this.selected = _selected;
        this.cities = [];
    }

    fetchCities() {
        return new Promise((resolve, reject) => 
            resolve(getCities(this.index))
        ).then(data => 
            this.cities = this.serializeCities(data)
        );
    }
    serializeCities(cities) {
        return cities.reduce((acc, cityName) => {
            acc.push(
                new City(cityName, this.index)
            );
            return acc;
        }, []);
    }
    getCities() {
        return new Promise((resolve, reject) => {
            if (!this.cities.length &&
                this.selected === true) {
                resolve(this.fetchCities());
            } else {
                resolve(this.cities);
            }
        });
    }
    findCity(cityName) {
        return this.cities.find(city => city.name == cityName) || false;
    }
    get selectedCity() {
        return this.cities.find(city => city.selected === true) || false; 
    }
}

/**
 * @property {String} name
 * @property {Boolean} selected
 * @property {Integer} country
 */
class City {
    name;
    selected;
    country;

    constructor(_name, _country, _selected=false) {
        this.name = _name;
        this.country = _country;
        this.selected = _selected;
    }
}

const store = new Countries();
export default store;