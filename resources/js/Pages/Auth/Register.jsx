import React, { useEffect, useState } from 'react';

import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import Checkbox from "@/components/Checkbox";
import TextInput from '@/components/TextInput';
import Heading from '@/components/Heading';
import LocationSelector from '@/components/LocationSelector';
import ApplicationLogo from '@/components/ApplicationLogo';
import PhonenumberInput from '@/components/PhonenumberInput';

import { Head, Link, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Country, State, City } from 'country-state-city';


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        fname: '',
        lname: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_code: '',
        phone_no: '',
        country: '',
        state: '',
        city: '',
        terms_and_conditions: false,
        roles: [],
    });
    const [roles, setRoles] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCountryName, setSelectedCountryName] = useState('');
    const [selectedStateName, setSelectedStateName] = useState('');
    const [selectedCityName, setSelectedCityName] = useState('');
   
    useEffect(() => {
        // Fetch roles data from your API endpoint
        fetch('/api/roles') 
            .then(response => response.json())
            .then(data => {
                setRoles(data); // Set roles data in state
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    }, []);
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };  
    }, []);
    
    useEffect(() => {
        // Fetch countries data
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const countries = await Country.getAllCountries();
            const options = countries.map(country => ({
                label: country.name,
                value: country.isoCode
            }));
            setCountryOptions(options);
            setSelectedCountry(options[0].value); 
            setSelectedCountryName(options[0].label);// Select the first country by default
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    useEffect(() => {
        // Fetch states data based on the selected country
        fetchStates(selectedCountry);
    }, [selectedCountry]);

    const fetchStates = async (countryCode) => {
        try {
            
            const states = await State.getStatesOfCountry(countryCode);

            const options = states.map(state => ({
                label: state.name,
                value: state.isoCode
            }));
            setStateOptions(options);
            
            if (options.length > 0) {
                setSelectedState(options[0].value);
                setSelectedStateName(options[0].label);
                // Log fetched cities // Select the first state by default if options are available
            } else {
                setSelectedState(null); // Clear selected state if no options are available
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };
    
    useEffect(() => {
        // Fetch cities data based on the selected state
        fetchCities(selectedCountry, selectedState);
    }, [selectedState,selectedCountry]);

    const fetchCities = async (countryCode, stateCode) => {
        try {
            if (countryCode && stateCode) { // Check if countryCode and stateCode are not undefined
                
                const cities = await City.getCitiesOfState(countryCode, stateCode);
                
                const options = cities.map(city => ({
                    label: city.name,
                    value: city.name
                }));
               
                setCityOptions(options);
               
                if (options.length > 0) {
                    setSelectedCity(options[0].value);
                    setSelectedCityName(options[0].label);
                } else {
                    setSelectedCity(null); // Clear selected state if no options are available
                }
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
  

    const submit = (e) => {
        e.preventDefault();
        const roleIdsString = data.roles.join(',');
  
        const formData = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            country_code: data.country_code, 
            phone_no: data.phone_no,
            country: data.country, // Include selected country value
            state: data.state, // Include selected state value
            city: data.city, // Include selected city value
            roles: roleIdsString,
        };  
    
        post(route('register'));
    };

    return (
        <GuestLayout>
            <div className="flex gap-4 sm:max-w-md lg:max-w-2xl mt-6 p-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
               
           <div className='lg:w-80 md:w-80'>
            <Head title="Register" />
           
            <Heading title="Sign Up" />
 
                
            <form onSubmit={submit}>
                
            <div className="max-h-[300px] overflow-y-auto">
                <div>
                   

                    <TextInput
                    icon={
                        <FontAwesomeIcon
                            icon={faUser}
                            className="h-5 w-5 text-gray-400"
                        />
                    }
                        id="fname"
                        name="fname"
                        placeholder="Your First Name"
                        value={data.fname}
                        className="mt-1 block w-full"
                        autoComplete="fname"
                        isFocused={true}
                        onChange={(e) => setData('fname', e.target.value)}
                        required
                    />

                    <InputError message={errors.fname} className="mt-2" />
                </div>
                <div className="mt-4">
                <TextInput
                icon={
                    <FontAwesomeIcon
                        icon={faUser}
                        className="h-5 w-5 text-gray-400"
                    />
                }
                        id="lname"
                        name="lname"
                        placeholder="Your Last Name"
                        value={data.lname}
                        className="mt-1 block w-full"
                        autoComplete="lname"
                        isFocused={true}
                        onChange={(e) => setData('lname', e.target.value)}
                        required
                    />

                    <InputError message={errors.lname} className="mt-2" />
                    </div>
                <div className="mt-4">
                   

                    <TextInput
                    icon={
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="h-5 w-5 text-gray-400"
                        />
                    }
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    

                    <TextInput
                    icon={
                        <FontAwesomeIcon
                            icon={faLock}
                            className="h-5 w-5 text-gray-400"
                        />
                    }
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                   

                    <TextInput
                    icon={
                        <FontAwesomeIcon
                            icon={faLock}
                            className="h-5 w-5 text-gray-400"
                        />
                    }
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                <div className="mt-4">
                   

                <PhonenumberInput
                id="phone_no"
                type="tel"
                name="phone_no"
                placeholder="Your Contact Number"
                value={data.phone_no}
                className="mt-1 block w-full"
                autoComplete="phone_no"
                onChange={(e) => setData('phone_no', e.target.value)}
               setData={setData}
               
                required
            />

                   <InputError message={errors.phone_no} className="mt-2" />
               </div>
               <div className="mt-4">
               <LocationSelector
                                options={countryOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedCountry(selectedOption.value);
                                    setData('country', selectedOption.value); // Update country value
                                }}
                                placeholder="Select Country"
                                value="{{ $formData['country'] ?? '' }}"
                                name="country"
                            />
                            <InputError message={errors.country} className="mt-2" />
                            </div>
                            <div className="mt-4">
                            <LocationSelector
                                options={stateOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedState(selectedOption.value);
                                    setData('state', selectedOption.value); // Update country value
                                }}
                                placeholder="Select State"
                                value="{{ $formData['state'] ?? '' }}"
                                name="state"
                            />
                            <InputError message={errors.state} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                <LocationSelector
                                options={cityOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedCity(selectedOption.value);
                                    setData('city', selectedOption.value); // Update country value
                                }}
                                placeholder="Select City"
                                value="{{ $formData['city'] ?? '' }}"
                                name="city"
                             
                            />
                            <InputError message={errors.city} className="mt-2" />
                                </div>
                                
                                <div className="mt-4">
                                <label className=''>
                Register as a: 
            </label>
            {roles.map(role => (
                <label key={role.id} className="flex items-center mt-2">
                    <Checkbox
                        name="roles[]"
                        checked={data.roles.includes(role.id)} // Check if role id is included in data.roles array
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                                setData(prevData => ({
                                    ...prevData,
                                    roles: [...prevData.roles, role.id] // Add role id to data.roles array
                                }));
                            } else {
                                setData(prevData => ({
                                    ...prevData,
                                    roles: prevData.roles.filter(roleId => roleId !== role.id) // Remove role id from data.roles array
                                }));
                            }
                        }}
                    />
                    <span className="ml-2 text-sm text-gray-600">{role.display_name}</span> {/* Display role name */}
                </label>
            ))}
              <InputError message={errors.roles} className="mt-2" />
                                </div>
                                <hr className='mt-4'/>
                                <div className="mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="terms_and_conditions"
                                        checked={data.terms_and_conditions}
                                        onChange={(e) =>
                                            setData(
                                                "terms_and_conditions",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        I agree all statements in&nbsp;
                                        <Link
                       
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      terms of service 
                    </Link>
                                    </span>
                                </label>
                                </div>
            </div>
                <div className="flex  gap-3 justify-start mt-4">
                   
                <Link
                        href={route('login')}
                        className="underline lg:hidden md:hidden text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already a member?
                    </Link>
                    <PrimaryButton disabled={!data.terms_and_conditions || processing}>
                        Register
                    </PrimaryButton>
                   
                </div>
                
            </form>
            </div>
            
            <div className='flex flex-col sm:justify-center items-center'>
           
            <img
        className="hidden lg:block md:block w-45 h-50 fill-current text-gray-500 drop-shadow-md hover:drop-shadow-xl"
        src="/register.png" alt="Your Image Alt Text"
      />
      <Link
                        href={route('login')}
                        className="hidden lg:block md:block underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pt-6 py-6"
                    >
                        Already a member?
                    </Link>
             </div>
            
          </div>
           
        </GuestLayout>
    );
}
