import React, { useState, useEffect } from 'react'
import useStoreState from '../../LocalStorage/IsForm'
import { handleChangle, handleSubmit } from '../../util/utilies'
const PersonalInfoForm: () => JSX.Element = (): JSX.Element =>
{
    const [ FormState, setFormState ] = useState( {} )

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    {/* Header of the form */ }
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a Email and Password with secret-Key. <br /> Don't forget to add description</h2>
                    <form method='POST'>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {/* Email input field */ }
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={ ( e ) => handleChangle( e, setFormState, FormState ) } type={ "email" } name="email" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter the email" required={ true } />
                            </div>
                            {/* Password input field */ }

                            <div className="w-full">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={ ( e ) => handleChangle( e, setFormState, FormState ) } type={ "password" } name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter the Password" required={ true } />
                            </div>
                            {/* Secret-Key input field */ }

                            <div className="w-full">
                                <label htmlFor="secretkey" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Secret-Key(xxx-xxxx-xxx-x)</label>
                                <input onChange={ ( e ) => handleChangle( e, setFormState, FormState ) } type={ "password" } name="secretkey" id="secretkey" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter you secretkey" required={ true } />
                            </div>
                            {/* Description input field */ }

                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" onChange={ ( e ) => handleChangle( e, setFormState, FormState ) } id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 resize-none" placeholder="Your description here"></textarea>
                            </div>
                        </div>
                        <button type="button" onClick={ ( e ) => handleSubmit( e, FormState ).then( ( response:{message:String} ):void => alert( response?.message ) ) } className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Save
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default PersonalInfoForm
