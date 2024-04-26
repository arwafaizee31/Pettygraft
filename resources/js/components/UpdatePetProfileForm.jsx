import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileTextInput from "@/components/ProfileTextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import LocationSelector from "@/components/LocationSelector";
import MultipleSelect from "@/components/MultipleSelect";
import axios from "axios";
export default function UpdatePetProfileForm({
    mustVerifyEmail,
    status,
    className = "",
    users,
}) {
    const user = users;
    const [petTypes, setPetTypes] = useState([]);
    const [selectedPetType, setSelectedPetType] = useState("");
    const [selectedPetTypeName, setSelectedPetTypeName] = useState("");
    const [petBreeds, setPetBreeds] = useState([]);
    const [selectedpetBreed, setSelectedpetBreed] = useState("");
    const [selectedpetBreedName, setSelectedpetBreedName] = useState("");
    const [genderOptions, setGenderOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedGenderName, setSelectedGenderName] = useState("");
    
    const [Vaccines, setVaccines] = useState([]);
    const [selectedVaccines, setSelectedVaccines] = useState([]);

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
    useEffect(() => {
        // Fetch roles data from your API endpoint
        fetch("/api/allVaccines")
            .then((response) => response.json())
            .then((data) => {
                const options = data.map((vaccine) => ({
                    label: vaccine.vaccine_name,
                    value: vaccine.id,
                }));

                setVaccines(options);

                // Set roles data in state
            })
            .catch((error) => {
                console.error("Error fetching pettypes:", error);
            });
    }, []);
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            pet_name: user.pet_name,
            d_o_b: user.d_o_b,
            last_vaccine_date: user.last_vaccine_date,
            type_id: user.type_id,
            breed: user.breed,
            gender: user.gender,
            vaccines: selectedVaccines,
            
        });

    const submit = (e) => {
        e.preventDefault();
        put(route("update-pet-profile", { petId: user.id }), { // Pass user's ID as petId
            preserveScroll: true,
         
        });
        console.log(data);
       
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
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
                        options={Vaccines}
                        label={"Vaccinations Applied"}
                        selectedVaccines={selectedVaccines}
                        setSelectedVaccines={setSelectedVaccines}
                    />
                    <InputError className="mt-2" message={errors.vaccines} />
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
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
