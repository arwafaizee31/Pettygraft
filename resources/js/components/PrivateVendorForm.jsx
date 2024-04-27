import { useRef } from "react";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileTextInput from "@/components/ProfileTextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import LocationSelector from "@/components/LocationSelector";


export default function PrivateVendorForm({ className = "", users }) {
    const user = users;
    const [Vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState("");
    const [selectedVendorName, setSelectedVendorName] = useState("");
    useEffect(() => {
        // Fetch roles data from your API endpoint
        fetch("/api/allVendors")
            .then((response) => response.json())
            .then((data) => {
                const options = [
                    { label: "Select Vendor", value: null }, // Add null option
                    ...data.map((vendors) => ({
                        label: vendors.email,
                        value: vendors.id,
                    }))
                ];
                setVendors(options);

                setSelectedVendor(user.permanent_vendor_id);
                const selectedVendor = options.find(
                    (option) => option.value === user.permanent_vendor_id
                );
                if (selectedVendor) {
                    setSelectedVendorName(selectedVendor.label);
                }

                // Set roles data in state
            })
            .catch((error) => {
                console.error("Error fetching vendors:", error);
            });
    }, []);
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        permanent_vendor_id: user.permanent_vendor_id,
    });
    const updateVendor = (e) => {
       
        e.preventDefault();
        const formData = {
            permanent_vendor_id: data.permanent_vendor_id,
        };  
        put(route("privateVendor.update", { petId: user.id }), { // Pass user's ID as petId
            preserveScroll: true,
            onError: (errors) => {
                if (errors.permanent_vendor_id) {
                   
                  
                }

                
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-medium text-gray-900">
                    Make your Pet's Profile Private
                </h2>

                <p className="mt-1 text-lg text-gray-600">
                    Once you designate a permanent vendor for your pet profile's
                    privacy settings, your profile will be displayed exclusively
                    to that vendor as a personal customer.
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    Note: You can only select one personal vendor for your pet's
                    profile. This ensures a tailored experience and establishes
                    a secure connection between you and your chosen service
                    provider.
                </p>
            </header>

            <form onSubmit={updateVendor} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="" value="Select Permanent Vendor" />
                    <LocationSelector
                        options={Vendors}
                        onSelect={(selectedOption) => {
                            setSelectedVendor(selectedOption.value);
                            setData('permanent_vendor_id', selectedOption.value); // Update country value
                        }}
                        placeholder={selectedVendorName}
                        value="{{ $formData['permanent_vendor_id'] ?? '' }}"
                        name="permanent_vendor_id"
                        required
                    />
                    <InputError
                        message={errors.permanent_vendor_id}
                        className="mt-2"
                    />
                </div>

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
