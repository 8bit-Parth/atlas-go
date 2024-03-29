import countries from "world-countries";

const countriesFormatted = countries.map((item) => ({
    value:   item.cca2,
    label:   item.name.common,
    flag:    item.flag,
    latlang: item.latlng,
    region:  item.region,
}));

export const useCountries =() => {
    const getAllCountires = () => countriesFormatted

    const getCountryByValue = (value: string) => {
        return countriesFormatted.find((item) => item.value === value);
    };
    return {
        getAllCountires,
        getCountryByValue,
    };
};