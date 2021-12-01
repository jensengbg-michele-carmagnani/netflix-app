import React, { useState } from "react";
import css from "./MediaCard.module.css";

import Card from "@material-ui/core/Card";
import { CardActionArea } from "@material-ui/core/";
import { CardMedia } from "@material-ui/core/";
import Modal from "./Modal";


export default function MediaCard({ id, image, title, tagline, movie }) {
  // const css = useStyles();
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(null);
  }

  function handleOpen() {
    setShowModal((prev) => !prev);
  }

  if (id) {
    return (
      <Card className={css.mediaCard__root}>
        <CardActionArea className={css.mediaCard__card}>
          <CardMedia
            image={image}
            title={title}
            className={css.mediaCard__media}
            onMouseOver={handleOpen}
            onMouseLeave={handleClose}
          />
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            movie={movie}
            className={css.ModalCall}
          />
        </CardActionArea>
      </Card>
    );
  } else {
    console.log("No cards to display");
    return <Card></Card>;
  }
}
