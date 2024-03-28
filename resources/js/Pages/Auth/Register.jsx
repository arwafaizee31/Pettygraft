import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import Heading from '@/components/Heading';
import ApplicationLogo from '@/components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';

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
                <div>
                   

                    <TextInput
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                   

                    <TextInput
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
               
                <div className="flex  justify-start mt-4">
                   

                    <PrimaryButton disabled={processing}>
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
