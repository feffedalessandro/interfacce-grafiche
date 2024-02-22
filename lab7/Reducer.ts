import React from "react";
import {Appartamento, elencoAppartamenti} from "./ElencoAppartamenti";

export interface FiltriAppartamento {
    tipologiaOfferta: 'Affitto' | 'Vendita' | null,
    superficieMinima: number | null,
    numeroLocali: number | null,
    piano: number | null,
    classeEnergetica: 'G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'A+' | 'A++' | 'A+++' | null,
    prezzoMassimo: number | null
}
export type State = {
    appartamenti: Appartamento[],
    appartamentiVisibili: Appartamento[],
    filtri: FiltriAppartamento,
    ordinamento:'PREZZO_ASC' | 'PREZZO_DESC' | 'SUPERFICIE_ASC' | 'SUPERFICIE_DESC' | 'DEFAULT',
    mappa: boolean // visualizzazione mappa e lista alternate
}
export const initialState:State = {
    appartamenti: elencoAppartamenti,
    appartamentiVisibili: elencoAppartamenti,
    filtri:{
        tipologiaOfferta:null,
        superficieMinima:null,
        numeroLocali:null,
        piano:null,
        classeEnergetica:null,
        prezzoMassimo:null
    },
    ordinamento:'DEFAULT',
    mappa: true
}

export type Action =
    | {type:'FILTRA', filtri: Partial<State['filtri']>} // filtri opzionali, non devono essere selezionati tutti
    | {type:'ORDINA', ordinamento: State['ordinamento']}

export function filtraAppartamenti(filtri: Partial<State['filtri']>): Action {
    return { type: 'FILTRA', filtri };
}
export function ordinaAppartamenti(ordinamento: State['ordinamento']): Action {
    return { type: 'ORDINA', ordinamento };
}

export const StateContext =
    React.createContext<[State, React.Dispatch<Action>]>(
        [initialState, (_:Action)=>{}]
    )


export function reducer(state:State, action:Action){
    switch (action.type){
        case 'FILTRA':{
            // combina filtri esistenti e quelli dell'azione
            const filtri = { ...state.filtri, ...action.filtri }
            // filtra appartamenti in base ai filtri applicati
            const appartamentiVisibili =
                //elencoAppartamenti.filter
                state.appartamenti.filter(appartamento => {
                return (
                    (filtri.tipologiaOfferta === null || appartamento.tipologiaOfferta === filtri.tipologiaOfferta) &&
                    (filtri.superficieMinima === null || appartamento.superficie >= filtri.superficieMinima) &&
                    (filtri.numeroLocali === null || appartamento.numeroLocali === filtri.numeroLocali) &&
                    (filtri.piano === null || appartamento.piano === filtri.piano) &&
                    (filtri.classeEnergetica === null || appartamento.classeEnergetica === filtri.classeEnergetica) &&
                    (filtri.prezzoMassimo === null || appartamento.prezzo <= filtri.prezzoMassimo)
                )
            })
            // ritorna nuovo stato con filtri e appartamenti visibili aggiornati
            return { ...state, filtri:filtri, appartamentiVisibili: appartamentiVisibili}

        }
        case 'ORDINA':{
            // crea copia degli appartamenti visibili per ordinarla
            let appartamentiVisibili = [...state.appartamentiVisibili]
            switch (action.ordinamento) {
                case 'PREZZO_ASC':
                    appartamentiVisibili.sort(
                        (a, b) => a.prezzo - b.prezzo)
                    break
                case 'PREZZO_DESC':
                    appartamentiVisibili.sort(
                        (a, b) => b.prezzo - a.prezzo)
                    break
                case 'SUPERFICIE_ASC':
                    appartamentiVisibili.sort(
                        (a, b) => a.superficie - b.superficie)
                    break
                case 'SUPERFICIE_DESC':
                    appartamentiVisibili.sort(
                        (a, b) => b.superficie - a.superficie)
                    break
                case "DEFAULT":
                    appartamentiVisibili.sort((a, b) => a.id - b.id);
                    break
            }
            // ritorna nuovo stato con ordinamento e appartamenti visibili aggiornati
            return { ...state, ordinamento: action.ordinamento, appartamentiVisibili}
        }
        default: return state
    }
}
