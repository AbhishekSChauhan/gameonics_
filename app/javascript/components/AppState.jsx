import React, {useReducer, useContext} from 'react'

const initialState = {
    url: "http://localhost:3000"
}


///////////////////////////////
// REDUCER
///////////////////////////////

const reducer = (state,action) => {

    switch(action.type){
        default:
            return state
    }
}

///////////////////////////////
// AppContext
///////////////////////////////

const AppContext = React.createContext(null)

export const AppState = (props) =>{

    const [state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value={{state,dispatch}}>
        {props.children}
    </AppContext.Provider>
}


export const useAppState = () => {
    return React.useContext(AppContext)
}

