import React, {useState, useEffect, useReducer} from 'react'
import {initialState, reducer, StateContext} from "./Reducer";
import MainPanel from "./MainPanel";

function App() {
    return(
       <StateContext.Provider value={useReducer(reducer, initialState)}>
           <div>
               <MainPanel/>
           </div>
       </StateContext.Provider>
    )
}

export default App;
