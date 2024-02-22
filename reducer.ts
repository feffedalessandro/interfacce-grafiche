import L, {LatLng} from "leaflet";
import React from "react";

// singola tappa
export type Stop = {
    id: number, label:string, pos:L.LatLng
}
// possibili azioni dell'utente
export type Action =
    | {type:'add_inizio', label:string, pos:L.LatLng}
    | {type:'add_fine', label:string, pos:L.LatLng}
    | {type:'remove', id:number}
    | {type:'remove_all'}
// funzioni creatrici
export function addInizio(label:string, pos:L.LatLng): Action{
    return {type:'add_inizio', label, pos}
}
export function addFine(label:string, pos:L.LatLng): Action{
    return {type:'add_fine', label, pos}
}
export function remove(id:number): Action{
    return {type:'remove', id}
}
export function removeAll(label:string, pos:L.LatLng): Action{
    return {type:'remove_all'}
}
// lista tappe e distanza tot tra tappe
export type State = {
    stops: Stop[], distance:number
}

// creazione id stop
let id= 0
function nextId(): number {
    return ++id // parte da 1
}
// calcola distanza tra tappe adiacenti
function totDistance(stops:Stop[]): number{
    let tot = 0 // azzera variabile distanza tot
    // ciclo for somma distanze tra tappe
    for(let i=1; i<stops.length; i++)
        tot += stops[i].pos.distanceTo(stops[i-1].pos)
    // ritorna distanza in chilometri
    return Math.round(tot/1000)
}
// gestisce evoluzione dello stato
export function reducer(state:State, action:Action){
    switch (action.type){
        case 'add_inizio':{
            const stop:Stop = {id:nextId(), label:action.label, pos:action.pos}
            const stops = [stop, ...state.stops]
            const distance = totDistance(stops)
            return {...state, stops, distance}
        }
        case 'add_fine':{
            const stop:Stop = {id:nextId(), label:action.label, pos:action.pos}
            const stops = [ ...state.stops, stop]
            const distance = totDistance(stops)
            return {...state, stops, distance}
        }
        case 'remove':{
            const stops = state.stops.filter(
                // tiene solo elementi con id diverso da quello selezionato
                (s) => s.id !== action.id
            )
            const distance = totDistance(stops)
            return {...state, stops, distance}

        }
        case 'remove_all':{
            return {...state, stops:[], distance:0}
        }
        default:
            return state
            // throw new Error()
    }
}

export const initialState: State = {stops:[], distance:0}

export const StateContext =
    React.createContext<[State, React.Dispatch<Action>]>(
        [initialState, (_:Action)=>{}]
    )
