import React, { useState } from 'react';
import Select from 'react-select';
import * as countryData from 'countries-list'; // Import all exports from countries-list

// Function to get flag emoji for a given country code
const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')  
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

// Map country data to options with flag emojis and country codes
const countryOptions = Object.keys(countryData.countries).map((code) => ({
    label: `${getFlagEmoji(code)} +${countryData.countries[code].phone}`,
    value: code,
}));

// Set default country to India
const defaultCountry = countryOptions.find((option) => option.value === 'IN');

export function CountrySelector({ onSelect }) {
    const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountry); // Set default country

    const handleChange = (selectedOption) => {
        setSelectedCountryCode(selectedOption);
        onSelect(selectedOption);
    };
    
    const DropdownIndicator = () => null; // Custom DropdownIndicator component to remove the default dropdown icon

    // Custom styles to adjust the width of the dropdown menu
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            width: 'auto', // Set width to 'auto' to fit the content without truncating
        }),
    };

    return (
        <Select
            options={countryOptions}
            value={selectedCountryCode}
            onChange={handleChange}
            placeholder="Select Country"
            isSearchable={true}
            components={{ DropdownIndicator }} // Replace the default dropdown icon with custom component
            styles={customStyles} // Apply custom styles to adjust the width of the dropdown menu
        />

    );
}
