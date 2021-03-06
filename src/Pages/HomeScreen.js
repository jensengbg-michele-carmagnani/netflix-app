import React, { useEffect, useState } from "react";

import Banner from "../components/Header/Banner";
import Row from "../components/HomeScreenLayout/Row";
import requests from "../lib/Requests";
import css from "./HomeScreen.module.css";
import Modal from "../components/UI/ModalNotification";

const HomeScreen = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showSession = sessionStorage.getItem("modal");
  
  const showModal = () => {
    sessionStorage.setItem("modal", "true");
    setModalIsOpen(true);
  };
  
  if (showSession !== "true" || null) {
    setTimeout(() => {
      showModal();
    }, 3000);
  }
  const closeModal = async () => {
    await setModalIsOpen(false);
  };

  const initNotification = async () => {
    const permission = await Notification.requestPermission();
    switch (permission) {
      case "granted": {
        console.log("Permission granted");
        break;
      }
      case "denied": {
        console.log("Permission denied");
        break;
      }
      default: {
        console.log("The user refuse to answer");
      }
    }
  };

  if ("Notification" in window) {
    initNotification();
  }

  useEffect(() => {
    window.addEventListener("scroll", props.homeScreenHandler);
    return () => window.removeEventListener("scroll", props.homeScreenHandler);
  }, [props.homeScreenHandler]);

  return (
    <div className={css.homescreen}>
      <Banner />
      <Modal show={modalIsOpen} closed={closeModal} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="Top Rated" fetchUrl={requests.fetchTopReted} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchCommedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetchUrl={requests.fetchRomaticMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default HomeScreen;
