import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";

export default function PopUpAccompagnement(props: any) {

    const [titrePrincipal, setTitrePrincipal] = useState()
    const [premierTitre, setPremierTitre] = useState()
    const [deuxiemeTitre, setDeuxiemeTitre] = useState()
    const [premierContenu, setPremierContenu] = useState()
    const [deuxiemeContenu, setDeuxiemeContenu] = useState()



    useEffect(()=>{
        setTitrePrincipal(props.titrePrincipal)
        setPremierTitre(props.premierTitre)
        setDeuxiemeTitre(props.deuxiemeTitre)
        setPremierContenu(props.premierContenu)
        setDeuxiemeContenu(props.deuxiemeContenu)
    },[])

    return (
        <>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title" >
                            <h3 style={{padding:"30px", color:"#a2415e"}}>{titrePrincipal}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                        <h3 style={{color:"#a2415e"}}>{premierTitre}</h3>
                        <p style={{textAlign:"center"}}>
                            {premierContenu}
                        </p>
                        <h3 style={{color:"#a2415e"}}>{deuxiemeTitre}</h3>
                        <p style={{textAlign:"center"}}>
                            {deuxiemeContenu}
                        </p>
                        <div style={{marginBottom:"10px"}}>
                            <Link href={"https://www.celeste-community.com/places/cecile-fabie/"} target={"_blank"}><img alt="" src={"/Bouton_rdv_site.svg"} width={200} height={200}/></Link>
                        </div>

                    </div>
                </Modal.Body>
        </>

    );
}
