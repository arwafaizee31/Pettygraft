import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import ProfileTextInput from '@/components/ProfileTextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Country, State, City } from 'country-state-city';
import LocationSelector from '@/components/LocationSelector';
import React, { useEffect, useState } from 'react';
import {  getCountryName, getStateName} from '@/utils/utils';
import ProfilePhonenumberInput from '@/components/ProfilePhonenumberInput';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
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
            setSelectedCountry(user.country); // Set the selected country code
            setSelectedCountryName(getCountryName(user.country));
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
            
           
                setSelectedState(user.state); // Set the selected state code
            setSelectedStateName(await getStateName(selectedCountry, user.state)); 
                // Log fetched cities // Select the first state by default if options are available
         
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
                setSelectedCity(user.city); // Set the selected city name
                setSelectedCityName(user.city); 
              
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        fname: user.fname,
        lname: user.lname,
        phone_no: user.phone_no,
        country:user.country,
        state: user.state,
        city:user.city,
        country_code:user.country_code,
        email: user.email,
       
    });
    const submit = (e) => {
      
        e.preventDefault();
      
        put(route("profile.update", { Id: user.id }), {
           
            // Pass user's ID as petId
            preserveScroll: true,
        });
        
    };
    
    

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="fname" value="First Name" />

                    <ProfileTextInput
                        id="fname"
                        className="mt-1 block w-full"
                        value={data.fname}
                        onChange={(e) => setData('fname', e.target.value)}
                        required
                        isFocused
                        autoComplete="fname"
                    />

                    <InputError className="mt-2" message={errors.fname} />
                </div>
                <div>
                    <InputLabel htmlFor="lname" value="Last Name" />
                    <ProfileTextInput
                        id="lname"
                        className="mt-1 block w-full"
                        value={data.lname}
                        onChange={(e) => setData('lname', e.target.value)}
                        required
                        isFocused
                        autoComplete="lname"
                    />

                    <InputError className="mt-2" message={errors.lname} />
                </div>
                  <div>
                <InputLabel htmlFor="" value="Contact Number" />
                <ProfilePhonenumberInput
                id="phone_no"
                type="tel"
                name="phone_no"
                placeholder="Your Contact Number"
                value={data.phone_no}
                className="mt-1 block w-full"
                autoComplete="phone_no"
                countryCode={user.country_code}
                onChange={(e) => setData('phone_no', e.target.value)}
               setData={setData}
               
                required
            />

                   <InputError message={errors.phone_no} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <ProfileTextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="" value="Country" />
                    <LocationSelector
                                options={countryOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedCountry(selectedOption.value);
                                    setData('country', selectedOption.value); // Update country value
                                }}
                                placeholder={selectedCountryName}
                                value="{{ $formData['country'] ?? '' }}"
                                name="country"
                            />
                            <InputError message={errors.country} className="mt-2" />
                </div>
              
                <div>
                    <InputLabel htmlFor="" value="State" />
                    <LocationSelector
                                options={stateOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedState(selectedOption.value);
                                    setData('state', selectedOption.value); // Update country value
                                }}
                                placeholder={selectedStateName}
                                value="{{ $formData['state'] ?? '' }}"
                                name="state"
                            />
                            <InputError message={errors.state} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="" value="City" />
                    <LocationSelector
                                options={cityOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedCity(selectedOption.value);
                                    setData('city', selectedOption.value); // Update country value
                                }}
                                placeholder={selectedCityName}
                                value="{{ $formData['city'] ?? '' }}"
                                name="city"
                             
                            />
                            <InputError message={errors.city} className="mt-2" />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
