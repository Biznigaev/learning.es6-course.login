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
}

/**
 * @property {Number} index
 * @property {String} name
 * @property {Boolean} selected
 * @property {Array<City>} _cities
 */
class Country {
    index;
    name;
    selected;
    _cities;

    constructor(_index, _name, _selected = false) {
        this.index = _index;
        this.name = _name;
        this.selected = _selected;
        this._cities = [];
    }

    async fetchCities() {
        const cities = await new Promise((resolve, reject) => 
            resolve(getCities(this.index))
        );
        this._cities = this.serializeCities(cities);
        return this._cities;
    }
    serializeCities(cities) {
        return cities.reduce((acc, cityName) => {
            acc.push(
                new City(cityName, this.index)
            );
            return acc;
        }, []);
    }
    get cities() {
        if (!this._cities.length &&
            this.selected === true) {
            this.fetchCities().then(cities => {
                console.log(cities);
            });
        }
        return this._cities;
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