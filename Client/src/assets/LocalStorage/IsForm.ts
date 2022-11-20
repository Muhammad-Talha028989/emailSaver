import create from "zustand"
import { persist, devtools } from "zustand/middleware"
import { produce } from 'immer';


interface IStoreState
{
  
    StoreState: {
        ResponseMessage: {
            isSuccessful: Boolean,
            message: String
        }
    }
}
type ResponseObjectType = {isSuccessful:Boolean,message:String}
let StoreFormState = ( set: Function ) => ( {
    StoreState: {
        ResponseMessage: {isSuccessful: true, message:""}
    },
    setStoreState: ( ResponseObject:ResponseObjectType ):void => set( produce( (state:IStoreState): void =>
    {
        state.StoreState.ResponseMessage.isSuccessful = ResponseObject.isSuccessful;
        state.StoreState.ResponseMessage.message = ResponseObject.message;
    }
    ))
})

export const useStoreState = create(
    devtools(
        persist(
            StoreFormState,
            {name:"Form-Switcher"} ),
        {} )
)

export default useStoreState