import React, { useEffect, useState } from "react";

import Banner from "../components/Header/Banner";
import Row from "../components/HomeScreenLayout/Row";
import requests from "../lib/Requests";
import css from "./HomeScreen.module.css";
import Modal from "../components/UI/ModalNotification";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../features/userSlice";

const HomeScreen = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const show = useSelector((state) => state.user.show);
  const dispatch = useDispatch();

  const showModal = () => {
    setTimeout(() => {
      setModalIsOpen(true);
      dispatch(setModal(true));
    }, 3000);
  };

  if (show === false) {
    showModal();
  }

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

  const closeModal = async (btnPermision) => {
    setModalIsOpen((prevState) => !prevState);
  };
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
