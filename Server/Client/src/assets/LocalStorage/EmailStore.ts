import create from "zustand"
import { persist, devtools } from "zustand/middleware"
import { produce } from 'immer';


interface IStoreState
{
    EmailState: {
        ResponseObject: {
            email: String,
            password: Array<String>,
            description: String
        }
    }
}
type ResponseObjectType = {
    ResponseObject: any
}
let StoreEmailState = ( set: Function ) => ( {
    EmailState: {
        ResponseObject: {
            email:"",
            password: [],
            description: ""
        }
    },
    setStoreState: ( ResponseObject:ResponseObjectType ):void => set( produce( (state:IStoreState): void =>
    {
        state.EmailState.ResponseObject.email = ResponseObject?.ResponseObject?.email;
        state.EmailState.ResponseObject.password = ResponseObject?.ResponseObject?.password;
        state.EmailState.ResponseObject.description = ResponseObject?.ResponseObject?.description;
    }
    ))
})

export const useEmailStoreState = create(
    devtools(
        persist(
            StoreEmailState,
            {name:"Emails list"} ),
        {} )
)

export default useEmailStoreState