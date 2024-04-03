import { forwardRef, useEffect, useRef, useState } from 'react';
import { CountrySelector} from '@/components/CountrySelector';
import defaultCountry from '@/components/CountrySelector';
export default forwardRef(function PhonenumberInput({ type = 'text', className = '', isFocused = false, icon,setData, ...props }, ref) {
    const input = ref ? ref : useRef();
    const [selectedCountryCode, setSelectedCountryCode] = useState(null);
    useEffect(() => {
        if (!selectedCountryCode) {
            console.log(defaultCountry.value);
            setData('country_code', defaultCountry.value);
            setSelectedCountryCode(defaultCountry.value);
        }
    }, [selectedCountryCode, setData]);
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    },[]);
   

    const handleCountrySelect = (selectedOption) => {
        setSelectedCountryCode(selectedOption);
        setData('country_code', selectedOption.value);  
    };
    
    return (
        <>
            <div className="relative flex items-center"> {/* Flex container to ensure inline alignment */}
                <div className="mr-2"> {/* Margin for spacing between elements */}
                    <CountrySelector onSelect={handleCountrySelect}/>
                   
                </div>
                <input
                    {...props}
                    type={type}
                    className={'custom-textInput  pr-4 py-2' + className}
                    ref={input}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
            </div>
        </>
    );
});

