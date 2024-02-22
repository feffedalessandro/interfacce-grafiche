import React from 'react'
import {
    createBrowserRouter,
    Link,
    LoaderFunctionArgs,
    Outlet,
    RouterProvider,
    useLoaderData,
    useNavigation,
    useParams
} from "react-router-dom";


function Template(){
    return (
        <div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'baseline',
                backgroundColor:'lightblue',
                color:'white',
                padding:'0, 0.5em'
            }}
            >
                <Link to={'/'} style={{marginLeft:'1em'}}>
                    <h1> Home Page </h1>
                </Link>
                <Link to={'/prodotti'} style={{marginLeft:'1em'}}> Prodotti </Link>
            </div>
            <hr/>
            < // route nested dentro outlet
                Outlet/>
        </div>

    )
}

function Prodotti(){
    // info recuperate dal loader (router) per ogni rotta
    const data: any = useLoaderData()
    // stato di recupero delle info
    const navigation = useNavigation()
    if(navigation.state === 'loading')
        return <h3>Loading...</h3>
    return(
        <div>
            <h1>Elenco prodotti</h1>
            <ul>
                { // per ogni prodotto p crea un link
                    data.products.map((p:any) =>
                        <li key={p.id}>
                            <Link to={`${p.id}`}> {p.title} </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

function Prodotto(){
    const params = useParams()
    // const id = params.id
    const data: any = useLoaderData()
    const navigation = useNavigation()
    if(navigation.state === 'loading')
        return <h3>Loading...</h3>

    return(
        <div style={{padding:'0.5em'}}>
            <h2> Prodotto: {data.title} </h2>
            <p> Descrizione: {data.description} </p>
        </div>
    )
}
function App(){
    // carica qualcosa (contenuti dipendenti dalla URL)
    async function productLoader(req: LoaderFunctionArgs){
        const id = req.params.id
        return fetch(`https://dummyjson.com/products/${id}`)
    }
    async function productListLoader(req:LoaderFunctionArgs){
        return fetch(`https://dummyjson.com/products/`)
    }
    const router= createBrowserRouter([
        {path:'/', element:<Template/>, children:[
            // pagina quando non c'è continuazione
                {path:'prodotti/', children:[
                        {path:'', index:true, element:<Prodotti/>, loader: productListLoader},
                        {path:':id', element: <Prodotto/>, loader: productLoader},
                    ]
                }
            ]
        },
    ])
    return(
        <RouterProvider router={router}/>
    )
}
export default App
