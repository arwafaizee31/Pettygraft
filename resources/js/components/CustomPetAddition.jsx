import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileTextInput from "@/components/ProfileTextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Country, State, City } from "country-state-city";
import LocationSelector from "@/components/LocationSelector";
import React, { useEffect, useState } from "react";
import { getCountryName, getStateName } from "@/utils/utils";
import ProfilePhonenumberInput from "@/components/ProfilePhonenumberInput";
import MultipleSelect from "@/components/MultipleSelect";
import axios from "axios";
import PhonenumberInput from "@/components/PhonenumberInput";

export default function CustomPetAddition({
    mustVerifyEmail,
    status,
    className = "",
    user,
    roleid
}) {
    const [petTypes, setPetTypes] = useState([]);
    const [selectedPetType, setSelectedPetType] = useState("");
    const [selectedPetTypeName, setSelectedPetTypeName] = useState("");
    const [petBreeds, setPetBreeds] = useState([]);
    const [selectedpetBreed, setSelectedpetBreed] = useState("");
    const [selectedpetBreedName, setSelectedpetBreedName] = useState("");
    const [genderOptions, setGenderOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedGenderName, setSelectedGenderName] = useState("");
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [Vaccines, setVaccines] = useState([]);
    const [selectedVaccineIds, setSelectedVaccineIds] = useState([]);
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
    useEffect(() => {
        fetch("/api/allVaccines")
            .then((response) => response.json())
            .then((data) => {
                console.log("Vaccines data:", data); // Log the fetched data
                const options = data.map((vaccine) => ({
                    label: vaccine.vaccine_name,
                    value: vaccine.id,
                }));

                // Log the transformed options
                console.log("Vaccine options:", options);

                setVaccines(options);

                // Check if user.vaccines is defined and not null
                if (user.vaccines) {
                    const initialSelectedVaccineIds = user.vaccines.map(
                        (vaccine) => vaccine.id
                    );

                    setSelectedVaccineIds(initialSelectedVaccineIds);
                    setSelectedVaccines(initialSelectedVaccineIds);

                    setData("vaccine_ids", initialSelectedVaccineIds);
                } else {
                    console.log("User vaccines are null or undefined.");
                }
            })
            .catch((error) => {
                console.error("Error fetching vaccines:", error);
            });
    }, []);

    // Now, you can access the updated state values here

    const handleVaccineChange = (selectedVaccines) => {
        setSelectedVaccineIds(selectedVaccines);
        setData("vaccine_ids", selectedVaccines);
        // Update vaccine IDs in your form data
        // For example: setData("vaccine_ids", selectedVaccines);
    };
    useEffect(() => {
        // Fetch roles data from your API endpoint
        fetch("/api/petTypes")
            .then((response) => response.json())
            .then((data) => {
                const options = data.map((pet) => ({
                    label: pet.pet_type_display_name,
                    value: pet.id,
                }));

                setPetTypes(options);
                setSelectedPetType(options[user.type_id - 1].value);
                setSelectedPetTypeName(options[user.type_id - 1].label);
                // Set roles data in state
            })
            .catch((error) => {
                console.error("Error fetching pettypes:", error);
            });
    }, []);
    useEffect(() => {
        // Fetch pet breeds data from your API endpoint
        fetch("/api/petBreeds")
            .then((response) => response.json())
            .then((data) => {
                const options = data.map((pet) => ({
                    label: pet.breed_display_name,
                    value: pet.id,
                }));

                setPetBreeds(options);

                // Ensure user.breed is defined before setting selected pet breed
                if (user && user.breeds) {
                    setSelectedpetBreed(options[user.breeds.id - 1]?.value);
                    setSelectedpetBreedName(options[user.breeds.id - 1]?.label);
                }

                // Set pet breeds data in state
            })
            .catch((error) => {
                console.error("Error fetching pet breeds:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch gender options from your API endpoint
        fetch("/api/petsGender")
            .then((response) => response.json())
            .then((data) => {
                // Convert gender options to an array of objects
                const options = Object.entries(data).map(([key, value]) => ({
                    value: parseInt(key), // Convert key to integer
                    label: value,
                }));
                setGenderOptions(options);

                // Convert user.gender to an integer and set selected gender
                setSelectedGender(parseInt(user.gender));

                // Find the corresponding gender name for the selected gender
                const selectedGenderOption = options.find(
                    (option) => option.value === parseInt(user.gender)
                );
                if (selectedGenderOption) {
                    setSelectedGenderName(selectedGenderOption.label);
                }

                // Set gender data in state
            })
            .catch((error) => {
                console.error("Error fetching gender options:", error);
            });
    }, []);
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        pet_name: " ",
        d_o_b: " ",
        last_vaccine_date: " ",
        type_id: " ",
        breed: " ",
        gender: " ",
        vaccine_ids: selectedVaccines,
        owner_name: " ",
        owner_contact: " ",
        country_code: ' ',
        owner_email: " ",
        country: '',
        state: '',
        city: '',
    });
    const submit = (e) => {
        e.preventDefault();

        post(route("customPetAddition.save", { Id: user.id }), {
            onSuccess: () => reset(),
            // Pass user's ID as petId
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Custom Pet Addition
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Add your customers and create a personalized platform to
                    maintain data and enhance your business.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="pet_name" value="Pet Name" />

                    <ProfileTextInput
                        id="pet_name"
                        className="mt-1 block w-full"
                        value={data.pet_name}
                        onChange={(e) => setData("pet_name", e.target.value)}
                        required
                        isFocused
                        autoComplete="pet_name"
                    />

                    <InputError className="mt-2" message={errors.pet_name} />
                </div>

                <div>
                    <InputLabel htmlFor="d_o_b" value="Date of Birth" />

                    <ProfileTextInput
                        id="=d_o_b"
                        className="mt-1 block w-full"
                        value={data.d_o_b}
                        type="date"
                        onChange={(e) => setData("d_o_b", e.target.value)}
                        required
                        isFocused
                        autoComplete="d_o_b"
                    />

                    <InputError className="mt-2" message={errors.d_o_b} />
                </div>
                <div>
                    <InputLabel htmlFor="" value="Pet Type" />
                    <LocationSelector
                        options={petTypes}
                        onSelect={(selectedOption) => {
                            setSelectedPetType(selectedOption.value);
                            setData("type_id", selectedOption.value); // Update country value
                        }}
                        placeholder={selectedPetTypeName}
                        value="{{ data.type_id }}"
                        name="type_id"
                    />
                    <InputError message={errors.type_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="" value="Pet Breed" />
                    <LocationSelector
                        options={petBreeds}
                        onSelect={(selectedOption) => {
                            setSelectedpetBreed(selectedOption.value);
                            setData("breed", selectedOption.value); // Update country value
                        }}
                        placeholder={selectedpetBreedName}
                        value="{{ data.breed }}"
                        name="breed"
                    />
                    <InputError message={errors.breed} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="" value="Gender" />

                    <LocationSelector
                        options={genderOptions}
                        onSelect={(selectedOption) => {
                            setSelectedGender(selectedOption.value);
                            setData("gender", selectedOption.value); // Update gender value
                        }}
                        placeholder={selectedGenderName}
                        value="{data.gender}"
                        name="gender"
                    />
                    <InputError message={errors.gender} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="last_vaccine_date"
                        value="Last Vaccination Date"
                    />

                    <ProfileTextInput
                        id="last_vaccine_date"
                        className="mt-1 block w-full"
                        value={data.last_vaccine_date}
                        type="date"
                        onChange={(e) =>
                            setData("last_vaccine_date", e.target.value)
                        }
                        required
                        isFocused
                        autoComplete="last_vaccine_date"
                    />

                    <InputError className="mt-2" message={errors.fname} />
                </div>

                <div>
                    <MultipleSelect
                        options={Vaccines} // Pass your vaccine options here
                        label="Select Vaccines"
                        selectedValues={selectedVaccineIds}
                        setSelectedValues={handleVaccineChange}
                    />
                    <InputError className="mt-2" message={errors.vaccine_ids} />
                </div>
                <div>
                    <InputLabel htmlFor="owner_name" value="Owner Name" />

                    <ProfileTextInput
                        id="owner_name"
                        className="mt-1 block w-full"
                        value={data.owner_name}
                        onChange={(e) => setData("owner_name", e.target.value)}
                        required
                        isFocused
                        autoComplete="owner_name"
                    />

                    <InputError className="mt-2" message={errors.owner_name} />
                </div>
                <div>
                    <InputLabel htmlFor="owner_email" value="Owner Email" />

                    <ProfileTextInput
                        id="owner_email"
                        className="mt-1 block w-full"
                        type="email"
                        value={data.owner_email}
                        onChange={(e) => setData("owner_email", e.target.value)}
                        required
                        isFocused
                        autoComplete="owner_email"
                    />

                    <InputError className="mt-2" message={errors.owner_email} />
                </div>
                <div>
                    <InputLabel
                        htmlFor="owner_contact"
                        value="Owner's Contact No."
                    />
                    <PhonenumberInput
                        id="owner_contact"
                        type="tel"
                        name="owner_contact"
                        placeholder="Your Contact Number"
                        value={data.owner_contact}
                        className="mt-1 block w-full"
                        autoComplete="owner_contact"
                        onChange={(e) =>
                            setData("owner_contact", e.target.value)
                        }
                        setData={setData}
                        required
                    />

                    <InputError
                        message={errors.owner_contact}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
               <LocationSelector
                                options={countryOptions}
                                onSelect={(selectedOption) => {
                                    setSelectedCountry(selectedOption.value);
                                    setData('country', selectedOption.value); // Update country value
                                }}
                                placeholder="Select Country"
                                value="{{ data.country }}"
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
                                value="{{ data.state }}"
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
                                value="{{ data.city }}"
                                name="city"
                             
                            />
                            <InputError message={errors.city} className="mt-2" />
                                </div>
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
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
                        <p className="text-sm text-gray-600">
                            Pet Added Successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
