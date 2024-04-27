import { forwardRef, useEffect, useRef, useState } from 'react';
import { CountrySelector } from '@/components/CountrySelector';
import * as countryData from 'countries-list'; // Import all exports from countries-list

export default forwardRef(function ProfilePhonenumberInput({ countryCode, type = 'text', className = '', isFocused = false, icon, setData, ...props }, ref) {
    const input = ref ? ref : useRef();
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode); // Set initial state to the received country code

    useEffect(() => {
        
        if (selectedCountryCode == countryCode) {
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

            // Set default country to India if the received countryCode is not set
            const defaultCountry = countryOptions.find((option) => option.value === countryCode);
           
            if (defaultCountry) {
                setSelectedCountryCode(defaultCountry.value);
                
            }
            
        }
    }, [selectedCountryCode, countryCode]);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const handleCountrySelect = (selectedOption) => {
        setSelectedCountryCode(selectedOption.value);
        setData('country_code', selectedOption.value);
    };

    return (
        <>
            <div className="relative flex items-center"> {/* Flex container to ensure inline alignment */}
                <div className="mr-2"> {/* Margin for spacing between elements */}
                    <CountrySelector onSelect={handleCountrySelect} countryFetchedCode={selectedCountryCode} />
                </div>
                <input
                    {...props}
                    type={type}
                    className={
                        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                        className
                    }
                    ref={input}
                />
            </div>
        </>
    );
});
