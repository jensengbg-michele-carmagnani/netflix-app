import React, { useEffect, useState } from "react";

import Banner from "../components/Header/Banner";
import Row from "../components/HomeScreenLayout/Row";
import requests from "../lib/Requests";
import css from "./HomeScreen.module.css";
import Modal from "../components/UI/ModalNotification";
import {useDispatch, useSelector} from 'react-redux';
import { setModal } from "../features/userSlice";


const HomeScreen = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const show = useSelector(state=> state.user.show)
  const dispatch = useDispatch()


console.log('state of show', show);

  const showModal = () => {
    setTimeout(() => {
      setModalIsOpen(true);
      dispatch(setModal(true))
    }, 3000);
  };
  
  if (show === false) {
    showModal();
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", props.homeScreenHandler);
    return () => window.removeEventListener("scroll", props.homeScreenHandler);
  }, [props.homeScreenHandler]);

  return (
    <div className={css.homescreen}>
      <Banner />
      {modalIsOpen && <Modal show={modalIsOpen} closed={closeModal} />}
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
