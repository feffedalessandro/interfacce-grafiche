import {Card, CardActionArea, CardMedia, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useLoaderData, useNavigate, useNavigation} from "react-router-dom";


function IngredientCard ({ingredient}:any){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/cocktail/${ingredient}`)
    }

    return (
        <Card
            style={{
                margin: '1em',
                display: "flex",
                flexDirection: 'column'
            }}
        >
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component={'img'}
                    image={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                    alt={ingredient}
                    style={{ width: '150px', height: '150px'}}
                />
                <Typography
                    style={{
                        margin:'1em',
                    }}
                > {ingredient} </Typography>
            </CardActionArea>
        </Card>
    )
}
function IngredientsList() {
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list', {
            mode: 'cors',
        })
            // se server risponde
            .then(response =>{
                if (response.ok)
                    return response.json()
                throw new Error

            })
            .then((obj) =>{
                const ingredients = obj.drinks
                    // itera su ogni drink nell'elenco drink
                    // flatMap() per avere un array piatto
                    .flatMap((drink: any) =>
                        // restituisce array con le chiavi di drink --> ['strIngredient1''strIngredient1'...]
                        Object.keys(drink)
                            // mostra solo drink selezionati
                            .filter((key) =>
                                //drink[key].toLowerCase().startsWith('a') &&
                                drink[key].toLowerCase().includes('rum'))
                            // itera sulle chiavi filtrate per ottenere gli ingredienti
                            .map((key) => drink[key])
                    )
                    // seleziona solo 5 ingredienti
                    .slice(0,5)
                setResult(ingredients)
            })

            // rileva errore e interrompe esecuzione
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div>
            {
                loading && result==null && error==null &&
                <h3>Loading...</h3>
            }
            {error!==null && <h1> Error: {error}</h1>}
            {
                result !== null &&
                <div style={{
                    display: "flex",
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Scegli l'ingrediente di base</p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                        {result.map((ingredient: string, index: number) => (
                            <IngredientCard key={index} ingredient={ingredient}/>
                        ))}
                    </div>
                </div>
            }
        </div>

    )
}

export default IngredientsList
