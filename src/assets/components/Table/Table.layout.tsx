import React, { useState, useEffect } from 'react'
import useEmailStoreState from '../../LocalStorage/EmailStore'

const TableLayout: () => JSX.Element = (): JSX.Element =>
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
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ emailList?.ResponseObject?.email }</td>
                        { emailList?.ResponseObject?.password.map( items => <td>{ items }</td> ) }

                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableLayout
