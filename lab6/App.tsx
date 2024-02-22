function App(){
    const router = createBrowserRouter([
        {path:'/', element:<Template/>, children:[
                {path:'', element:<HomePage/>},
                {path:'luoghi/:luogoId', element:<DettagliLuogo/>},
                {path:'prenotazione/:luogoId/:prenotazioneId', element:<FormPrenotazione/>},
                {path:'prenotazioni/', element:<ElencoPrenotazioni/>}
            ]}
    ])

    return(
        <StateContext.Provider value={useReducer(reducer, InitialState)}>
            <RouterProvider router={router}/>
        </StateContext.Provider>
    )
}

export default App
