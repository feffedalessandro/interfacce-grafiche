function Template(){
    return (
        <Container maxWidth="lg">
            <Grid container direction="column">
                <Grid item>
                    <div
                        style={{
                            backgroundColor: 'brown',
                            padding: '0.5em',
                            display: 'flex',
                            alignItems: 'baseline',
                        }}
                    >
                        <h1 style={{ color: 'white' }}>Agenzia Immobiliare</h1>
                    </div>
                </Grid>
                <Grid item>
                    <hr />
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    )
}

function App(){
    const router = createBrowserRouter([
        {path:'/', element:<Template/>, children:[
                {path:'', element:<HomePage/>, children:[
                        {path:'mappa/', element:<MappaAppartamenti/>},
                        {path:'lista/', element:<ListaAppartamenti/>},
                    ]},
                {path:'appartamento/:id', element:<DettagliAppartamento/>}
            ]}
    ])

    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            <RouterProvider router={router}/>
        </StateContext.Provider>
    )

}
