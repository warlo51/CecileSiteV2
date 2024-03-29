import * as React from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
    return (
        <div className="Footer">
            <div className="BlocLeft">
                <ul>
                    <li>Cecile Fabié</li>
                    <li><LocalPhoneIcon />06.27.41.10.49</li>
                    <li><MailOutlineIcon />cecile.fabie@gmail.com</li>
                </ul>
            </div>
            <div className="DernierActivite">
                <div className="centerOfFooter">
                    <Image alt=""  width={150} height={150} src={"/LogoEntier.png"} style={{backgroundColor:"#F8E7DD",border:"solid", borderRadius:"20px",marginTop:"15px"}}/>
                    <div className="logosReseaux">
                        <a href="https://m.facebook.com/yogatherapiebycecile/" target={"_blank"}><FacebookIcon sx={{ color: "#ee9251" }}/></a>
                        <a href="https://www.instagram.com/yogavedasante/?hl=nb" target={"_blank"}><InstagramIcon sx={{ color: "#ee9251" }}/></a>
                    </div>
                </div>
            </div>
            <div className="Divers">
                <ul>
                    <li>CGV</li>
                    <li>Politique de confidentialité</li>
                    <li>Mentions Légales</li>
                </ul>
            </div>
        </div>
    );
}
