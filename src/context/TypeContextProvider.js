import React, {createContext, useReducer} from 'react';

const initialState = {
    simType: "Credit",
    title: "اعتباری",
    disableIncredible: false,
    maximum: 900000,
    minimum: 10000,
    price: "20000",
    incredible: false,
    other: false,
}

const TypeReducer = (state, action) => {
    switch (action.type) {
        case "CONSTANT":
            return {
                ...state,
                simType: "Constant",
                title: "دائمی",
                disableIncredible: true,
                maximum: 2000000,
                price: "50000",
                incredible: false,
                other:false
            }
        case "CREDIT":
            return {
                ...state,
                simType: "Credit",
                title: "اعتباری",
                disableIncredible: false,
                maximum: 900000,
                incredible: false,
                other:false
            }
        case "CHOSEN":
            return {
                ...state,
                price: action.payload,
                other:false
            }
        case "WRITTEN":
            return {
                ...state,
                price: action.payload,
            }
        case "OTHER":
            return {
                ...state,
                other: true,
            }
        case "INCREDIBLE":
            return {
                ...state,
                incredible: !state.incredible,
                price: "50000"
            }
        default:
            return state;
    }
}
export const TypeContext = createContext();

const TypeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(TypeReducer, initialState);
    return (
        <TypeContext.Provider value={{state, dispatch}}>
            {children}
        </TypeContext.Provider>
    );
};

export default TypeContextProvider;
