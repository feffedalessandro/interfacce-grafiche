
export type Appartamento = {
    id: number
    tipologiaOfferta: 'Affitto' | 'Vendita',
    posizione: { lat: number, long: number, localita: string},
    superficie: number,
    numeroLocali: number,
    piano: number,
    classeEnergetica: 'G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'A+' | 'A++' | 'A+++',
    prezzo: number,
    descrizione: string,
    mappa: string,
    galleriaFotografica: string[]
}

export const elencoAppartamenti:Appartamento[] = [
    {
        id: 1,
        tipologiaOfferta: 'Affitto',
        posizione: { lat: 45.07110, long: 7.68299, localita: 'Torino' },
        superficie: 80,
        numeroLocali: 3,
        piano: 2,
        classeEnergetica: 'B',
        prezzo: 1200,
        descrizione: 'Appartamento accogliente in centro città',
        mappa: 'link-mappa-appartamento-1',
        galleriaFotografica: ['foto-1', 'foto-2', 'foto-3']
    },
    {
        id: 2,
        tipologiaOfferta: 'Vendita',
        posizione: { lat: 45.067655, long: 7.687584, localita: 'Torino' },
        superficie: 100,
        numeroLocali: 4,
        piano: 3,
        classeEnergetica: 'A+',
        prezzo: 200000,
        descrizione: 'Splendido appartamento con vista panoramica',
        mappa: 'link-mappa-appartamento-2',
        galleriaFotografica: ['foto-4', 'foto-5', 'foto-6']
    },
    {
        id: 3,
        tipologiaOfferta: 'Affitto',
        posizione: { lat: 45.070851, long: 7.696958, localita: 'Torino' },
        superficie: 60,
        numeroLocali: 2,
        piano: 1,
        classeEnergetica: 'C',
        prezzo: 800,
        descrizione: 'Appartamento luminoso in zona tranquilla',
        mappa: 'link-mappa-appartamento-3',
        galleriaFotografica: ['foto-7', 'foto-8', 'foto-9'],
    },
];
