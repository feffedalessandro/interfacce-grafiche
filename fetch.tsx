import React, {useState} from 'react'

function App() {
    const [id, setId] = useState('')
    const [product, setProduct] = useState<any>(null)
    const [error, setError]=useState<any>(null)

    // richiesta in corso
    const [isLoading, setIsLoading]=
        useState(false)

    // richiesta al server per ottenere la Promise
    function loadProduct(id:string){
        // se stringa vuota
        if(id.trim()===''){
            setIsLoading(false)
            setProduct(null)
            setError('Invalid ID')
            return //non fa il resto
        }
        setError(null)
        setProduct(null)
        setIsLoading(true) //sta per partire una richiesta
        // let myPromise =
        fetch(`https://dummyjson.com/products/${id}`)
            // se server risponde
            .then(response=>{
                // chiamata asincrona andata a buon fine
                // restituisce obj response che trasformo in json
                if (response.ok) return response.json()
                // promessa fallita e errore
                throw `${response.status} ${response.statusText}`
            })
            // salva in product l'obj json ottenuto di risposta
            .then(obj => setProduct(obj))
            // rileva l'errore e interrompe esecuzione
            .catch(e => setError(e))
            // finally eseguito indipendentemente dal risultato della promise
            .finally(() => setIsLoading(false))
    }
    return(
        <div>
            <div style={{padding:'1em'}}>
                <input type={'text'} value={id} onChange={e=> setId(e.target.value)}/>
                <button onClick={()=>loadProduct(id)}>Load</button>
            </div>

            { // se prodotto ed errore nulli, metto un loading, aspetta risposta dal server
                isLoading && product==null && error==null &&
                <div><h3>Loading...</h3></div>
            }
            {product!=null &&
                <div>
                    <h1>{product.title}</h1>
                    <img src={product.thumbnail} alt={product.title}/>
                    <p>{product.description}</p>
                </div>
            }
            {error!=null &&
                <div style={{backgroundColor:'#ffaaaa'}}>
                    <h1>Error: {error}</h1>
                </div>
            }
        </div>
    )
}
