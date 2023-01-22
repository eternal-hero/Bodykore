import { Disclosure } from '@headlessui/react';

interface SubmissionFormProps {
  }
  
  const SubmissionForm = ({  }: SubmissionFormProps) => {
  
    return (

    <form className="max-w-7xl m-auto">
        <div className="flex flex-wrap -mx-3 mb-6"> 
            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-name">
                Name *
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-name" type="text" placeholder="Enter your name"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-email-address">
                Email address *
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-email-address" type="text" placeholder="Enter your email"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-phone-number">
                Phone Number
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight" id="grid-phone-number" type="text" placeholder="Phone Number"></input>
            </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-date-purchase">
                Date of purchase *
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-date-purchase" type="text" placeholder="dd / mm / yyyy"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-item-name">
                Item name *
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-item-name" type="text" placeholder="Item name"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-order-number">
                Order Number *
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight" id="grid-order-number" type="text" placeholder="Order number"></input>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-street-address">
                Address
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-street-address" type="text" placeholder="Street Address"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-country">
                Country
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight" id="grid-country" type="text" placeholder="Country"></input>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-street-address">
                Address
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-street-address" type="text" placeholder="Street Address"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-state">
                State
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight" id="grid-state" type="text" placeholder="State/Province"></input>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-city">
                City
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight" id="grid-city" type="text" placeholder="City"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-zip">
                ZIP
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 mb-3 leading-tight" id="grid-zip" type="text" placeholder="ZIP/Postal Code"></input>
            </div>

            <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-black-1c2023 text-sm font-roboto mb-2" htmlFor="grid-marketplace">
                Marketplace purchase from
            </label>
            <input className="appearance-none block w-full bg-white text-grey-848484 border-2 border-black-1c2023 py-3 px-4 leading-tight" id="grid-marketplace" type="text" placeholder="Marketplace"></input>
            </div>
        </div>
        <div className="pb-2">
            <label className="pb-1 block text-sm font-roboto text-black-1c2023 sm:mt-px sm:pt-2">
                Comments
            </label>
            <div className="mt-1 sm:mt-0">
                <textarea
                        id="comments"
                        name="comments"
                        rows={3}
                        className="shadow-sm block w-full text-sm border-2 border-black-1c2023 pl-4 pt-2 h-44"
                        defaultValue={''}
                        required
                />
            </div>
        </div>
        <div className="block">
            <div className="mt-2">
                <div>
                <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox"></input>
                    <span className="ml-2">Accept Terms and Conditions</span>
                </label>
                </div>
            </div>
        </div>
        </form>
    )
  }
  
  export default SubmissionForm