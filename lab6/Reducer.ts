import React from "react";
import {listaLuoghi, Luogo} from "./ListaLuoghi";

export type Prenotazione = {
    id:number,
    luogo:Luogo,
    luogoId:any,
    data:string,
    ora:string,
    nome:string,
    cognome:string,
    numero:string
}
// lista prenotazioni
export type State = {
    prenotazioni: Prenotazione[]
}
export type Action =
    | {type:'submit', id:number, luogo:Luogo, data:string, ora:string, nome:string, cognome:string, numero:string }
    | {type:'remove', id:number}
    | {type:'modify', id:number, prenotazione:Prenotazione}
export function submit(id:number, luogo:Luogo, data:string, ora:string, nome:string, cognome:string, numero:string):Action{
    return {type:'submit', id, luogo, data, ora, nome, cognome, numero}
}
export function remove(id:number):Action {return {type:'remove', id}}
export function modify(id:number, prenotazione:Prenotazione):Action{
    return {type:'modify', id, prenotazione}
}

export function reducer(state:State, action:Action){
    switch (action.type){
        case 'submit':{
            const idEsistente = state.prenotazioni.findIndex(
                p => p.id === action.id
            );
            if (idEsistente !== -1) {
                const prenotazioni = state.prenotazioni.map(p => {
                    if (p.id === action.id) {
                        return {
                            ...p,
                            luogo: action.luogo,
                            data: action.data,
                            ora: action.ora,
                            nome: action.nome,
                            cognome: action.cognome,
                            numero: action.numero,
                        };
                    }
                    return p;
                });

                return { ...state, prenotazioni };
            } else {
                const prenotazione = {
                    id: state.prenotazioni.length,
                    luogo: action.luogo,
                    luogoId: listaLuoghi.findIndex(l => l.nome === action.luogo.nome),
                    data: action.data,
                    ora: action.ora,
                    nome: action.nome,
                    cognome: action.cognome,
                    numero: action.numero,
                };
                const prenotazioni = [...state.prenotazioni, prenotazione];
                return { ...state, prenotazioni };
            }

            // const prenotazione: Prenotazione = {
            //     id: state.prenotazioni.length,
            //     luogo: action.luogo,
            //     luogoId: listaLuoghi.findIndex(l => l.nome === action.luogo.nome),
            //     data: action.data,
            //     ora: action.ora,
            //     nome: action.nome,
            //     cognome: action.cognome,
            //     numero: action.numero,
            // }
            // const prenotazioni = [...state.prenotazioni, prenotazione];
            // return {...state, prenotazioni};
        }
        case 'remove':{
            const prenotazioni = state.prenotazioni.filter(
                // tiene solo elementi con id diverso da quello selezionato
                p => p.id !== action.id
            )
            return {...state, prenotazioni}
        }
        case 'modify':{
            const prenotazioni = state.prenotazioni.map(p => {
                if (p.id === action.id) {
                        p.luogo = action.prenotazione.luogo
                        p.data = action.prenotazione.data
                        p.ora = action.prenotazione.ora
                        p.nome = action.prenotazione.nome
                        p.cognome = action.prenotazione.cognome
                        p.numero = action.prenotazione.numero
                    }
                return p
            })
            return {...state, prenotazioni}
        }
        default: return state
    }
}

export const initialState: State = {prenotazioni: []}
export const StateContext =
    React.createContext<[State, React.Dispatch<Action>]>(
        [initialState, (_:Action)=>{}]
    )
