import React from 'react'
import useAxios from "axios-hooks";
function App(){
    const [{data,loading,error}]
        = useAxios('https://dummyjson.com/products')
    // cosa faccio vedere
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.code}</p>
    if (data) return (
        <div>
            {data.products.map((d:any) =>
                <div style={{width:'20em', padding:'1em'}} key={d.id}>
                    <h1> {d.title} </h1>
                    <img src={d.thumbnail} alt={d.title}/>
                    <p>{d.description}</p>
                </div>
            )}
        </div>

    )
    else return null
}
