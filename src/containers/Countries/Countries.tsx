import React, {useEffect, useState} from 'react';
import axios from "axios";
import {nanoid} from "nanoid";
import {IApiCountries} from "../../types";
import Country from "../../components/Country/Country";
import CountryInfo from "../../components/CountryInfo/CountryInfo";

const URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';

const Countries = () => {
    const [countries, setCountries] = useState<IApiCountries[]>([]);
    const [alpha3Code, setAlpha3Code] = useState<string | null>(null);

    useEffect(() => {
        fetchData().catch(e => console.log(e));
    }, []);

    const fetchData = async () => {
        const response = await axios.get<IApiCountries[]>(URL);
        setCountries(response.data);
    }

    return (
        <div className="countries pt-4">
            <div className="row">
                <div className="list-of-countries col-4">
                    <ul>
                        {
                            countries.map(country => (
                                <Country
                                    key={nanoid()}
                                    countryName={country.name}
                                    onClick={() => (setAlpha3Code(country.alpha3Code))}
                                />
                            ))
                        }
                    </ul>
                </div>
                <div className="country-info mx-5 col-7">
                    <CountryInfo countryCode={alpha3Code} />
                </div>
            </div>
        </div>
    );
};

export default Countries;