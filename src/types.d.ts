export interface IApiCountries {
    name: string;
    alpha3Code: string;
}

export interface IApiCountryInfo {
    name: string;
    alpha3Code: string;
    borders: [];
    flag: string;
    population: number;
    capital: string;
    languages: [];
    subregion: string;
    region: string
}

export interface IApiNeighboringCountry {
    name: string;
    borders: [];
    alpha3Code: string;
    flag: string;
    population: number;
    capital: string;
    languages: { name: string }[];
    subregion: string;
    region: string
}
