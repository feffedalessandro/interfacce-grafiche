
export type Luogo = {
    idLuogo:number,
    nome:string,
    descrizione:string,
    pos: { lat: number, lng: number}
}
export const Luoghi:Luogo[]= [
    {
        idLuogo: 1,
        nome: 'Mole Antonelliana',
        descrizione: 'La Mole Antonelliana è un simbolo di Torino, originariamente costruita come sinagoga e successivamente diventata un monumento storico.',
        pos: { lat: 45.06926920728419, lng:  7.693230908895547 },
    },
    {
        idLuogo: 2,
        nome: 'Palazzo Reale',
        descrizione: 'Il Palazzo Reale è una residenza storica dei Savoia, situata nel cuore del centro storico di Torino.',
        pos: { lat: 45.072955313709755, lng: 7.686267903565504 },
    },
    {
        idLuogo: 3,
        nome: 'Parco del Valentino',
        descrizione: 'Il Parco del Valentino è un grande parco pubblico lungo il fiume Po, ideale per passeggiate e momenti di relax.',
        pos: { lat: 45.054511552743406, lng: 7.68697637755422 },
    },
    {
        idLuogo: 4,
        nome: 'Basilica di Superga',
        descrizione: 'La Basilica di Superga è una chiesa situata sulla collina di Superga, offrendo una vista panoramica sulla città di Torino.',
        pos: { lat: 45.08144225304083, lng: 7.767544955999945 },
    },
    {
        idLuogo: 5,
        nome: 'Museo Egizio',
        descrizione: 'Il Museo Egizio di Torino è uno dei più importanti al mondo per la sua collezione di reperti egizi antichi.',
        pos: { lat: 45.06901609096214, lng: 7.683794573976384 },
    },
    {
        idLuogo: 6,
        nome: 'Porta Palatina',
        descrizione: 'Porta Palatina è un antico monumento romano, parte delle mura romane di Torino, che rappresenta un importante sito archeologico.',
        pos: { lat: 45.07496060267218, lng: 7.6847318570806875 },
    },
    {
        idLuogo: 7,
        nome: 'Galleria Sabauda',
        descrizione: 'La Galleria Sabauda è una galleria d\'arte situata nel Palazzo Reale, con una ricca collezione di opere d\'arte.',
        pos: { lat: 45.07418560078437, lng: 7.686120969830649 },
    },
    {
        idLuogo: 8,
        nome: 'Piazza Castello',
        descrizione: 'Piazza Castello è la piazza principale di Torino, circondata da importanti edifici storici e culturali.',
        pos: { lat: 45.071568693900424, lng: 7.685127053630051 },
    },
    {
        idLuogo: 9,
        nome: 'Museo Nazionale dell\'Automobile',
        descrizione: 'Il Museo Nazionale dell\'Automobile è dedicato alla storia dell\'automobile, con una vasta collezione di veicoli d\'epoca.',
        pos: { lat: 45.03303537571721, lng: 7.675730116168058},
    },
    {
        idLuogo: 10,
        nome: 'Villa della Regina',
        descrizione: 'Villa della Regina è una residenza storica situata sulle colline di Torino, con splendidi giardini e interni affascinanti.',
        pos: { lat: 45.05969935491617, lng: 7.707674643017179 },
    },
]
