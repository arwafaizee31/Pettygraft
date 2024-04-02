import React, { useState } from 'react';
import Select from 'react-select';

const LocationSelector = ({ name,options, onSelect, placeholder, value }) => {
    const [selectedLocation, setSelectedLocation] = useState(value);

    const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
        onSelect(selectedOption);
    };

    return (
        <Select
        name={name} 
            options={options}
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder={placeholder}
            isSearchable={true}
            menuPosition="absolute"
        />
    );
};

export default LocationSelector;
