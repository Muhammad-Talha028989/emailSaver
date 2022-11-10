import create from "zustand"
import { persist, devtools } from "zustand/middleware"
import { produce } from 'immer';


interface IStoreState
{
  
    StoreState: {
        isProtectedForm: Boolean
    }
}
let StoreFormState = ( set: Function ) => ( {
    StoreState: {
        isProtectedForm: false
    },
    setStoreState: ( isProtectedForm: Boolean ):void => set( produce( (state:IStoreState): void =>
    {
        state.StoreState.isProtectedForm = isProtectedForm;
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