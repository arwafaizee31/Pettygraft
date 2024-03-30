import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import Heading from '@/components/Heading';
import ApplicationLogo from '@/components/ApplicationLogo';
import Dropdown from '@/components/Dropdown';
import { Head, Link, useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <div class="flex gap-4 sm:max-w-md lg:max-w-2xl mt-6 p-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
               
           <div class='lg:w-80 md:w-80'>
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
                   

                   <TextInput
                   icon={
                    <FontAwesomeIcon
                        icon={faPhone}
                        className="h-5 w-5 text-gray-400"
                    />
                }
                       id="phone_no"
                       type="tel"
                       name="phone_no"
                       placeholder="Your Contact Number"
                       value={data.phone_no}
                       className="mt-1 block w-full"
                       autoComplete="phone_no"
                       onChange={(e) => setData('phone_no', e.target.value)}
                       required
                   />

                   <InputError message={errors.phone_no} className="mt-2" />
               </div>
              
               <div className="mt-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {/* Your currently selected country */}
                            {data.country || 'Select Country'}
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {/* Content for the Country dropdown */}
                        {/* Replace 'Country 1', 'Country 2', etc. with your actual country names */}
                        <Dropdown.Link id="country" name="country" onClick={() => setData('country', 'Country 1')}>
                            Country 1
                        </Dropdown.Link>
                        <Dropdown.Link id="country" name="country" onClick={() => setData('country', 'Country 2')}>
                            Country 2
                        </Dropdown.Link>
                        {/* Add more Dropdown.Link components as needed */}
                    </Dropdown.Content>
                </Dropdown>
                <InputError message={errors.country} className="mt-2" />
            </div>

            <div className="mt-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {/* Your currently selected state */}
                            {data.state || 'Select State'}
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {/* Content for the State dropdown */}
                        {/* Replace 'State 1', 'State 2', etc. with your actual state names */}
                        <Dropdown.Link id="state" name="state" onClick={() => setData('state', 'State 1')}>
                            State 1
                        </Dropdown.Link>
                        <Dropdown.Link id="state" name="state" onClick={() => setData('state', 'State 2')}>
                            State 2
                        </Dropdown.Link>
                        {/* Add more Dropdown.Link components as needed */}
                    </Dropdown.Content>
                </Dropdown>
                <InputError message={errors.state} className="mt-2" />
            </div>

            <div className="mt-4">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            {/* Your currently selected city */}
                            {data.city || 'Select City'}
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        {/* Content for the City dropdown */}
                        {/* Replace 'City 1', 'City 2', etc. with your actual city names */}
                        <Dropdown.Link id="city" name="city" onClick={() => setData('city', 'City 1')}>
                            City 1
                        </Dropdown.Link>
                        <Dropdown.Link id="city" name="city" onClick={() => setData('city', 'City 2')}>
                            City 2
                        </Dropdown.Link>
                        {/* Add more Dropdown.Link components as needed */}
                    </Dropdown.Content>
                </Dropdown>
                <InputError message={errors.city} className="mt-2" />
            </div>
            </div>
                <div className="flex  gap-3 justify-start mt-4">
                   
                <Link
                        href={route('login')}
                        className="underline lg:hidden md:hidden text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already a member?
                    </Link>
                    <PrimaryButton disabled ={processing}>
                        Register
                    </PrimaryButton>
                   
                </div>
                
            </form>
            </div>
            
            <div className='flex flex-col sm:justify-center items-center'>
           
            <img
        className="hidden lg:block md:block w-45 h-50 fill-current text-gray-500 drop-shadow-md hover:drop-shadow-xl"
        src="register.png" alt="Your Image Alt Text"
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
