import React, {useContext} from "react";
import {filtraAppartamenti, FiltriAppartamento, StateContext} from "./Reducer";
import {
    Accordion, AccordionDetails, AccordionSummary, TextField,
    Typography, Chip
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Filtri (){
    const [state, dispatch] = useContext(StateContext); // Recupera lo stato e la funzione dispatch dal contesto

    const handleFilterChange = (name: keyof FiltriAppartamento, value: any) => {
        const currentValue = state.filtri[name];

        // selezione multipla
        if (Array.isArray(currentValue)) {
            // Verifica se il valore è già presente
            const isSelected = currentValue.includes(value);

            // Aggiungi o rimuovi il valore a seconda della sua presenza
            const updatedValues = isSelected
                ? currentValue.filter((v) => v !== value)
                : [...currentValue, value];

            dispatch(filtraAppartamenti({ ...state.filtri, [name]: updatedValues }));
        }
        // selezione singola
        else {
            if (currentValue === value) {
                // deseleziona il filtro se ha lo stesso valore attuale
                dispatch(filtraAppartamenti({ ...state.filtri, [name]: null }));
            } else {
                // altrimenti applica il nuovo filtro
                dispatch(filtraAppartamenti({ ...state.filtri, [name]: value }));
            }
        }
    };

    return (
        <>
            <div style={{fontSize: '15px', fontWeight: 'bold', margin:'0.5em 0'}}> FILTRA PER:</div>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon/>}>
                    <Typography>Tipologia offerta</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Chip
                        label={'Affitto'}
                        clickable
                        color={state.filtri.tipologiaOfferta === 'Affitto' ? 'primary' : 'default'}
                        onClick={() => handleFilterChange('tipologiaOfferta', 'Affitto')}
                        onDelete={() => handleFilterChange('tipologiaOfferta', null)}
                        style={{marginRight:'0.5em'}}
                    />
                    <Chip
                        label={"Vendita"}
                        clickable
                        color={state.filtri.tipologiaOfferta === 'Vendita' ? 'primary' : 'default'}
                        onClick={() => handleFilterChange('tipologiaOfferta', 'Vendita')}
                        onDelete={() => handleFilterChange('tipologiaOfferta', null)}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography>Classe Energetica</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {['G', 'F', 'E', 'D', 'C', 'B', 'A', 'A+', 'A++', 'A+++'].map((classe) => (
                        <Chip
                            key={classe}
                            label={classe}
                            clickable
                            color={state.filtri.classeEnergetica === classe ? 'primary' : 'default'}
                            onClick={() => handleFilterChange('classeEnergetica', classe)}
                            onDelete={() => handleFilterChange('classeEnergetica', null)}
                            style={{margin:'0 0.5em 0.5em 0'}}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon/>}>
                    <Typography>Superficie Minima (m²) </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        type={"number"}
                        value={state.filtri.superficieMinima || ''}
                        onChange={(e) => handleFilterChange('superficieMinima', e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon/>}>
                    <Typography>Numero Locali </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        type={"number"}
                        value={state.filtri.numeroLocali || ''}
                        onChange={(e) => handleFilterChange('numeroLocali', e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon/>}>
                    <Typography> Piano </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        type={"number"}
                        value={state.filtri.piano || ''}
                        onChange={(e) => handleFilterChange('piano', e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon/>}>
                    <Typography> Prezzo Massimo </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        type={"number"}
                        value={state.filtri.prezzoMassimo || ''}
                        onChange={(e) => handleFilterChange('prezzoMassimo', e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Filtri
