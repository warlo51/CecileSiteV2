import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardTroisImages(props: any) {

    const premiereImage = props.premiereImage;
    const deuxiemeImage = props.deuxiemeImage;
    const troisiemeImage = props.troisiemeImage;

    return (
        <div  className="CardContent" style={{display:"flex",flexDirection:"row", justifyContent: "space-around"}} >
            <CardMedia
                component="img"
                alt=""
                height="100px"
                width="100px"
                image={premiereImage}
                className="imageCardTroisImages"
            />
            <CardMedia
                component="img"
                alt=""
                height="100px"
                width="100px"
                image={deuxiemeImage}
                className="imageCardTroisImages"
            />
            <CardMedia
                component="img"
                alt=""
                height="100px"
                width="100px"
                image={troisiemeImage}
                className="imageCardTroisImages"
            />
        </div>
    );
}
