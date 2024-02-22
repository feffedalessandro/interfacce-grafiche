function Template(){
    const { ingredient } = useParams()
    const [ultimoIngrediente, setUltimoIngrediente] = useState('')
    useEffect(() => {
        if(ingredient) setUltimoIngrediente(ingredient)
    }, [ingredient]) // effetto solo quando ingredient cambia

    return(
        <div>
            <div
            style={{
                backgroundColor:'orangered',
                padding:'0.5em 1em',
                display:'flex',
                flexDirection:'row',
                alignItems:'baseline'
            }}>
                <Link to={'/'} style={{fontSize: '30px', marginLeft: '1em', textDecoration: 'none', color:"white"}}>
                    CocktailApp
                </Link>
                {
                    ultimoIngrediente &&
                    <Link to={`/cocktail/${ultimoIngrediente}`} style={{marginLeft: '1em', textDecoration: 'none', color:"white"}}>
                        {ultimoIngrediente} cocktail
                    </Link>
                }


            </div>
            <Outlet/>
        </div>
    )
}


function CocktailDetail() {
    const {cocktail}:any = useParams()
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?s=${cocktail}`, {
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((obj) => {
                if (obj.drinks) {
                    setResult(obj.drinks[0]) // usa solo il primo drink dall'array
                } else {
                    setError('No cocktail found')
                }
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }, [cocktail])

    const ingredients = Object.keys(result)
        .filter((key:any) => key.includes('strIngredient') && result[key]!==null)
        .map((key:any) => result[key])

    return (
        <div>
            {
                loading && result==null && error==null &&
                <h3>Loading...</h3>
            }
            {error!==null && <h1> Error: {error}</h1>}
            {
                result !== null &&
                <div>
                    <h1>{cocktail.strDrink}</h1>
                    <p>descrizione: {cocktail.strInstructionsIT}</p>
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
                    <h2>Ingredienti</h2>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}> {ingredient} </li>
                        ))}
                    </ul>
                </div>
            }

        </div>
    )
}

function App() {
    async function cocktailLoader(req: LoaderFunctionArgs) {
        const cocktail = req.params.cocktail
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktail}`)
    }
    async function cocktailDetailLoader(req: LoaderFunctionArgs) {
        const cocktail = req.params.cocktail
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?s=${cocktail}`)
    }

    const router = createBrowserRouter([
        {
            path: '/', element: <Template/>, children:[
                {path:'', element:<IngredientsList/>},
                {path:'cocktail/:ingredient', element:<CocktailsList/>, loader:cocktailLoader},
                {path:'cocktail/:ingredient/:id', element:<CocktailDetail/>, loader:cocktailDetailLoader}

            ]
        }
    ])
    return(
        <RouterProvider router={router}/>
    )
}

export default App
