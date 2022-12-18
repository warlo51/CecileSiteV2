import {Accordion, Button, Card, Col, Dropdown, Form, Row, Table} from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import Layout from "../component/Layout";
import LayoutAdmin from "../component/LayoutAdmin";
import {useRouter} from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Modal from "react-bootstrap/Modal";
import {Container, ImageList, ImageListItem, Paper} from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel';
import InfoBulle from "../component/Toast";
import {isAfter, isBefore, format} from "date-fns";


export const getServerSideProps = async (context) =>{
    const accessTokken = context.req.cookies.AccessToken;
    let decoded;
    let profile;

    const auth0searchUser = await fetch(
        `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
        {
            method: "get",
            headers: {
                Authorization: `Bearer ${accessTokken}`,
            },
        }
    ).then((data) => data.json());

    if (accessTokken === undefined) {
        decoded = null;
    } else {
        try{
            decoded = auth0searchUser.email;
        }catch(error){
            decoded = null
        }
    }

    return {
        props: {
            decoded: decoded
        }
    };
}


export default function Administration(props) {

    if(props.decoded !== null){
        return(
            <Layout>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 ><a href={`${process.env.NEXT_PUBLIC_SANITYURL}`} style={{color:"black"}} target="_blank">Lien vers site Admin ICI</a></h1>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </Layout>
        )

    }else{
        return(<>Vous n'avez pas les droits</>)
    }
}
