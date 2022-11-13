import React from 'react'
import { handleChangle, handleSubmit } from '../../util/utilies'
import axios from 'axios'

const GetPersonalForm = () =>
{
    const [ FormState, setFormState ] = React.useState( {} )

    const onSubmitHandler = async ( e: any, FormState: any ) =>
    {
        e.preventDefault();
        try
        {
            axios.defaults.baseURL = "http://localhost:3000/"

            await axios.post( "/get/info", {
                RequestData: FormState
            }, {
                method: "POST",
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            } ).then( response => response.data );

        } catch ( error )
        {
            console.error( [ "Error from onSubmitHandler", error ] )
        }

    }
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    {/* Header of the form */ }
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a Email and Secret Key. <br /> Don't forget to add email</h2>
                    <form method='POST'>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {/* Email input field */ }
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={ ( e ) => handleChangle( e, setFormState, FormState ) } type={ "email" } name="email" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter the email" required />
                            </div>
                            {/* Secret-Key input field */ }

                            <div className="w-full sm:col-span-2">
                                <label htmlFor="secretkey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Secret-Key(xxx-xxxx-xxx-x)</label>
                                <input onChange={ ( e ) => handleChangle( e, setFormState, FormState ) } type={ "password" } name="secretkey" id="secretkey" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter you secretkey" required />
                            </div>
                            <br />
                            <button type="submit" onClick={ ( e ) => onSubmitHandler( e, FormState ) } className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </section></>
    )
}

export default GetPersonalForm