import * as React from 'react';
import {Container, Paper} from "@mui/material";

export default function BlocInformation() {
    return (
        <Paper elevation={3} style={{borderRadius:"20px", marginTop:"50px", height:"300px", paddingTop:"20px"}}>
            <Container style={{display: "flex", flexDirection:"row"}}>
                <div>
                    <img src={"/PhotoCecilePresentation.png"} className={"imagePresentation"}/>
                </div>
                <div>
                    <p className={"textePaperPresentation"}>
                        <span className={"titreBlocInfo"}>Bienvenue à vous !</span><br/><span> Je suis praticienne en Yogathérapie et Massages Ayurvédiques.
                        Ma première formation étant celle d'infirmière, j'ai souhaité me former en médecine complémentaire
                        pour mieux accompagner mes patients au quotidien...
                        C'est lors d'un voyage en Inde que j'ai débuté mes formations puis j'ai poursuivi mes apprentissages au sein de
                        l'IDYT en France (Institut de Formation De Yogathérapie du Dr COUDRON).
                        À ce jour j'accompagne les personnes désireuses d'améliorer leur bien être grâce aux outils de la
                        Yogathérapie et aux massages provenant de la culture indienne.</span>
                    </p>
                </div>
            </Container>
        </Paper>
    );
}
