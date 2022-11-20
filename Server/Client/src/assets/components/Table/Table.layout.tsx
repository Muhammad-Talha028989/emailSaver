import React, { useState, useEffect } from 'react'
import useEmailStoreState from '../../LocalStorage/EmailStore'

const TableLayout = () =>
{

    const EmailStore = useEmailStoreState( state => state?.EmailState )
    const [ emailList, setEmailList ] = useState( EmailStore )

    useEffect( () =>
    {
        let isRender: boolean = true
        if ( isRender )
        {
            setEmailList( EmailStore )
        }
        return (): void =>
        {
            isRender = false
        }
    }, [] )
    return (
        <>
            <table className="shadow-lg bg-white border-collapse table-auto m-3">
                <thead>
                    <tr>
                        <th className="bg-blue-100 border text-left px-8 py-4">Email</th>
                        { emailList?.ResponseObject?.password?.map( ( items, i ) => <th className="bg-blue-100 border px-8 py-4" key={ i }> Passwords</th> ) }
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td className='text-center'>{ emailList?.ResponseObject?.email }</td>
                        { emailList?.ResponseObject?.password?.map( ( items, i ) => <td key={ i }>{ items }</td> ) }
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableLayout
