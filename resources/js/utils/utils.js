import { getCountryCallingCode } from 'react-phone-number-input/input';
import { getAllCountries } from 'countries-and-timezones';
import { getCountry } from 'countries-and-timezones';
import { State } from 'country-state-city';
export const getDialingCode = (countryCode) => {
  
    
    if (!countryCode) {
        console.error('Error: Invalid country code');
        return 'Error: Invalid country code';
    }
    
    return getCountryCallingCode(countryCode);
};


export const getCountryName = (countryCode) => {
    const allCountries = getAllCountries();
    for (const countryId in allCountries) {
        if (allCountries[countryId].id === countryCode) {
            return allCountries[countryId].name;
        }
    }
    return 'Unknown';
};

export const getStateName = async (countryCode, stateCode) => {
    try {
        const states = await State.getStatesOfCountry(countryCode);

        const state = states.find(state => state.isoCode === stateCode);
        if (state) {
            return state.name;
        } else {
            
            return '';
        }
    } catch (error) {
        console.error('Error fetching states:', error);
        return 'Error fetching states';
    }

};
export const ageCalculation = (petdob) => {
  
    const dob = new Date(petdob);
    const diff_ms = Date.now() - dob.getTime();
    const ageDate = new Date(diff_ms);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const formattedAge = `${years} years`;
    
    return formattedAge;
};



