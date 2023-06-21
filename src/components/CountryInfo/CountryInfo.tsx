import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {nanoid} from "nanoid";
import {IApiCountryInfo, IApiNeighboringCountry} from "../../types";
import Country from "../Country/Country";
import Loader from "../Loader/Loader";

const URL = 'https://restcountries.com/v2/alpha/';

interface IProps {
    countryCode: string | null;
}

const CountryInfo: React.FC<IProps> = ({countryCode}) => {
    const [countryInfo, setCountryInfo] = useState<IApiNeighboringCountry | null>(null);
    const [borderCountryCode, setBorderCountryCode] = useState<string[]>([]);
    const [borderCountry, setBorderCountry] = useState<IApiNeighboringCountry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        if (countryCode !== null) {
            setLoading(true);
            const countryResponse = await axios.get <IApiCountryInfo>(URL + countryCode);
            setCountryInfo(countryResponse.data);
            setBorderCountryCode(countryResponse.data.borders);
            setLoading(false);
        }
    }, [countryCode]);

    useEffect(() => {
        fetchData().catch(e => console.error(e));
    }, [fetchData]);

    useEffect(() => {
        const fetchBorderCountries = async () => {
            if (borderCountryCode && borderCountryCode.length > 0) {
                const promises = borderCountryCode.map(async (code) => {
                    const neighboringCountryResponse = await axios.get<IApiNeighboringCountry>(URL + code);
                    return neighboringCountryResponse.data;
                });
                const neighboringCountries = await Promise.all(promises);
                setBorderCountry(neighboringCountries);
            } else {
                setBorderCountry([]);
            }
        };

        fetchBorderCountries().catch((error) => console.error(error));
    }, [borderCountryCode]);

    return (
        <>
            {loading && <Loader/>}
            {
                countryInfo ?
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-6">
                            <h1 className="mb-4">{countryInfo.name}</h1>
                            <p><b>Capital: </b>{countryInfo.capital}</p>
                            <p><b>Population: </b>{countryInfo.population.toLocaleString()}</p>
                            <p><b>Subregion: </b>{countryInfo.subregion}</p>
                            <p><b>Region: </b>{countryInfo.region}</p>
                            <h3>Languages:</h3>
                            <ul>
                                {countryInfo.languages.map((lang) => (
                                    <li key={lang.name}>{lang.name}</li>
                                ))}
                            </ul>
                            {borderCountry && borderCountry.length > 0 ?
                                <h2 className="mt-5">Bordering Countries:</h2> : ''}
                            <ul>
                                {borderCountry.map((country) => (
                                    <Country
                                        key={nanoid()}
                                        countryName={country.name}
                                        onClick={() => {
                                            setCountryInfo(country)
                                            setBorderCountryCode(country.borders);
                                        }}
                                    />
                                ))}
                            </ul>
                        </div>
                        <div className="col-5">
                            <img className="mt-5" src={countryInfo.flag} alt={countryInfo.name}/>
                        </div>
                    </div>
                    : <h1 className="msg">Please select a country to receive country detailed information</h1>
            }
        </>
    );
};

export default CountryInfo;