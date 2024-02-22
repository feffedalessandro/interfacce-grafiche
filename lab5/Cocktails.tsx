import {useNavigate, useParams} from "react-router-dom";
import {Card, CardActionArea, CardMedia, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

function CocktailCard({cocktail}: any) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/cocktail/${cocktail.idDrink}`)
    }
    return (
        <Card
            style={{
                margin: '1em',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component={'img'}
                    //image={`https://www.thecocktaildb.com/images/media/drink/${cocktail.idDrink}.jpg`}
                    image={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    style={{ width: '200px', height: '200px' }}
                />
                <Typography  style={{
                    margin:'1em',
                }}
                > {cocktail.strDrink} </Typography>
            </CardActionArea>
        </Card>
    )
}


const CocktailsList = () => {
    const { ingredient } = useParams()
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`, {
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((obj) => {
                if (obj.drinks) {
                    setResult(obj.drinks)
                } else {
                    setError('No cocktails found')
                }
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }, [ingredient])

    return (
        <div>
            {loading && result==null && error==null &&
                <h3>Loading...</h3>
            }
            {error!==null && <h1> Error: {error}</h1>}
            {
                result!==null &&
                <div
                    style={{
                        display: "flex",
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin:'0 10em'
                    }}
                >
                    <div
                        style={{
                            display:"flex",
                            flexDirection:'row',
                            flexWrap:'wrap',
                            justifyContent:'center',

                        }}
                    >
                        {result.map((cocktail: any, index:number) => (
                                <CocktailCard key={index} cocktail={cocktail}/>
                            )
                        )}
                    </div>

                </div>
            }

        </div>
    )
}

export default CocktailsList
