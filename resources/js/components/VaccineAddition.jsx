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

export default function VaccineAddition({ mustVerifyEmail, status, className = '',user }) {
    const [petTypes, setPetTypes] = useState([]);
    const [selectedPetType, setSelectedPetType] = useState("");
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
              
               
            })
            .catch((error) => {
                console.error("Error fetching pettypes:", error);
            });
    }, []);
    const { data, setData, post, errors, processing, recentlySuccessful,reset } = useForm({
            vaccine_name: "",
            min_age: "",
            max_age: "",
            pet_type_id: ""
       
    });
    const submit = (e) => {
      
        e.preventDefault();
    
      
        post(route("vaccineAddition", { Id: user.id }), {
            onSuccess: () => reset(),
            // Pass user's ID as petId
            preserveScroll: true,
        });
        
    };
    
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Vaccine Addition</h2>

                <p className="mt-1 text-sm text-gray-600">
                Add your vaccines to attract more customers and enhance your business growth.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="vaccine_name" value="Vaccine Name" />

                    <ProfileTextInput
                        id="vaccine_name"
                        className="mt-1 block w-full"
                        value={data.vaccine_name}
                        onChange={(e) => setData('vaccine_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="vaccine_name"
                    />

                    <InputError className="mt-2" message={errors.vaccine_name} />
                </div>
                <div>
                    <InputLabel htmlFor="" value="Pet Type" />
                    <LocationSelector
                        options={petTypes}
                        onSelect={(selectedOption) => {
                            setSelectedPetType(selectedOption.value);
                            setData("pet_type_id", selectedOption.value); // Update country value
                        }}
                        placeholder="Select Pet Type"
                        value="{{ data.pet_type_id }}"
                        name="pet_type_id"
                    />
                            <InputError message={errors.pet_type_id} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="min_age" value="Minimum Age (in years)" />

                    <ProfileTextInput
                        id="min_age"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.min_age}
                        onChange={(e) => setData('min_age', e.target.value)}
                        required
                        isFocused
                        autoComplete="min_age"
                    />

                    <InputError className="mt-2" message={errors.min_age} />
                </div>
                <div>
                    <InputLabel htmlFor="max_age" value="Maximum Age (in years)" />

                    <ProfileTextInput
                        id="max_age"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.max_age}
                        onChange={(e) => setData('max_age', e.target.value)}
                        required
                        isFocused
                        autoComplete="max_age"
                    />

                    <InputError className="mt-2" message={errors.fname} />
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
                        <p className="text-sm text-gray-600">Your Vaccine has been added successfully. Kindly wait for PettyGraft's approval.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
