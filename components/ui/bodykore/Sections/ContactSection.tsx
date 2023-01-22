import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactSectionProps {
    title1: string
    title2: string
    description: string
    btnText1: string
    btnText2: string
}

interface ContactForm {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    terms: string;
}

export default function ContactSection({ title1, title2, description, btnText1, btnText2 }: ContactSectionProps) {

    const { reset, register, handleSubmit, formState: { errors } } = useForm<ContactForm>();
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: ContactForm) => {
        const timestamp = new Date().toISOString();
        const body = JSON.stringify({ ...data, timestamp });
        const res = await (await fetch('/api/contact', { method: 'POST', body })).json();
        setSuccess(res);
        reset();
    }

    return (
        <>
        <section className="w-full">
            <div className="bg-no-repeat w-full bg-center bg-cover bg-contact-image flex">
                <div className={`bg-gradient-to-b from-black via-black to-transparent w-full flex justify-center`}>
                    <div className='flex flex-wrap justify-center w-full'>
                        <div className='lg:w-1/2 px-20 lg:px-0 lg:mt-32 mt-20'>
                            <h1 className={`lg:text-bebas lg:text-7xl text-6xl italic font-bebas font-bold text-white`} style={{ letterSpacing: '2px' }}>
                                CONTACT US
                            </h1>
                            <p className="pt-2 font-roboto text-white-f2f9fa lg:w-3/5 w-full">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.
                            </p>
                            <div>
                                <div className="flex items-center text-white font-roboto pt-5">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    >
                                    <g id="Phonecall" transform="translate(0 0)">
                                        <rect
                                        id="Rectángulo_7"
                                        data-name="Rectángulo 7"
                                        width="40"
                                        height="40"
                                        transform="translate(0 0)"
                                        fill="#fff"
                                        opacity="0"
                                        />
                                        <path
                                        id="Icon_feather-phone-call"
                                        data-name="Icon feather-phone-call"
                                        d="M14.048,4.857A4.2,4.2,0,0,1,17.37,8.173M14.048,1.5a7.561,7.561,0,0,1,6.686,6.665m-.841,6.7v2.518a1.681,1.681,0,0,1-1.833,1.679A16.663,16.663,0,0,1,10.8,16.483a16.383,16.383,0,0,1-5.046-5.036A16.59,16.59,0,0,1,3.175,4.169a1.68,1.68,0,0,1,1.674-1.83H7.371A1.681,1.681,0,0,1,9.053,3.783a10.761,10.761,0,0,0,.589,2.359,1.676,1.676,0,0,1-.378,1.771L8.2,8.979a13.443,13.443,0,0,0,5.046,5.036l1.068-1.066a1.684,1.684,0,0,1,1.774-.378,10.815,10.815,0,0,0,2.363.588A1.68,1.68,0,0,1,19.893,14.863Z"
                                        transform="translate(7.92 9.587)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.7"
                                        />
                                    </g>
                                    </svg>
                                    <h1 className="pl-4">949-325-3088</h1>
                                </div>
                                <div className="flex items-center text-gray-200 font-roboto">
                                    <svg
                                    id="Sales"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    >
                                    <rect
                                        id="Rectángulo_7"
                                        data-name="Rectángulo 7"
                                        width="40"
                                        height="40"
                                        fill="#fff"
                                        opacity="0"
                                    />
                                    <path
                                        id="Icon_ionic-md-paper-plane"
                                        data-name="Icon ionic-md-paper-plane"
                                        d="M3.375,14.832l6.111,2.292.761,7.633,3.819-5.345,5.345,5.345L24.757,3.375Zm15.157,6.476-4.261-4.292,5.906-8.3L10.859,15.8,7.328,14.528,22.284,6.5Z"
                                        transform="translate(5.625 5.625)"
                                        fill="#fff"
                                    />
                                    </svg>
                                    <h1 className="pl-4">sales@bodykore.com</h1>
                                </div>
                                <div className="flex items-center text-gray-200 font-roboto lg:pt-2">
                                    <svg
                                    id="Clock"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    >
                                    <rect
                                        id="Rectángulo_7"
                                        data-name="Rectángulo 7"
                                        width="40"
                                        height="40"
                                        fill="#fff"
                                        opacity="0"
                                    />
                                    <g
                                        id="Icon_feather-clock"
                                        data-name="Icon feather-clock"
                                        transform="translate(7 7)"
                                    >
                                        <path
                                        id="Trazado_8824"
                                        data-name="Trazado 8824"
                                        d="M23,13A10,10,0,1,1,13,3,10,10,0,0,1,23,13Z"
                                        transform="translate(0)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        />
                                        <path
                                        id="Trazado_8825"
                                        data-name="Trazado 8825"
                                        d="M17.873,11,18,18l5.25,2.333"
                                        transform="translate(-6.25 -3.333)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        />
                                    </g>
                                    </svg>
                                    <h1 className="pl-4">
                                    MON-FRI (9AM-5PM PST) <br></br> Sat - Sun (Closed )
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-1/2 mt-5 mb-20' style={{ width: '450px' }}>
                            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                                <div className="bg-white py-8 mx-5 lg:mx-0 px-4 shadow rounded-lg sm:px-10">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" action="#" method="POST">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                            <span className='text-sm font-medium text-red-bc2026 pl-1'>*</span>
                                            </label>
                                            <div className="mt-1">
                                            <input
                                                id="name"
                                                type="text"
                                                autoComplete="name"
                                                {...register('name', { required: true })}
                                                className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                                                placeholder="Enter your name"
                                            />
                                            {errors.name && <p className='text-sm text-red-bc2026 pt-2'>Required field</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                            <span className='text-sm font-medium text-red-bc2026 pl-1'>*</span>
                                            </label>
                                            <div className="mt-1">
                                            <input
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                {...register('email', { required: true })}
                                                className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && <p className='text-sm text-red-bc2026 pt-2'>Required field</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone number
                                            </label>
                                            <div className="mt-1">
                                            <input
                                                id="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                {...register('phone')}
                                                className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                                                placeholder="Phone Number"
                                            />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="Textarea" className="block text-sm font-medium text-gray-700 pb-1">
                                            Message
                                            </label>
                                            <textarea
                                            className="appearance-none block w-full px-3 py-2 border border-black-373933 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-bc2026 focus:border-red-bc2026 sm:text-sm"
                                            id="Textarea"
                                            placeholder="Your message"
                                            {...register('message')}
                                            style={{ maxHeight: '150px', minHeight: '40px' }}
                                            ></textarea>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                {...register('terms', { required: true })}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-black-373933 rounded"
                                            />
                                            <label htmlFor="terms" className="ml-2 block text-sm text-black-373933 font-roboto">
                                                Accept Terms and Conditions
                                            </label>
                                            </div>
                                        </div>
                                        <div>
                                            {errors.terms && <p className='text-sm text-red-bc2026'>Please accept Terms and Conditions</p>}
                                        </div>

                                        <div>
                                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black-373933 hover:bg-red-bc2026 duration-200">
                                                SUBMIT
                                            </button>
                                        </div>
                                        {success && <p className='text-sm pt-2 text-green'>Message sent succesfully</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}