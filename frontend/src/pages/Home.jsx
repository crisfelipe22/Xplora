// eslint-disable-next-line no-unused-vars
import React from "react";
import "../styles/Home.css"; // Import styles
import { Container, Typography } from '@mui/material';
import ProductoAleatorio from "../components/productoAleatorio";


const Home = () => {
  return (
    <main className="home-container">
      <section className="search-bar">
        <p>Search bar placeholder</p>
      </section>
      <section className="categories">
        <p>Categories placeholder</p>
      </section>
      {/* <section className="suggestions">
        <Container>
          <Typography variant="h5" className="titulo-recomendados" >
            Lo que nuestros Xplorers recomiendan
          </Typography>
          <ProductoAleatorio />
        </Container>
      </section> */}
    </main>
  );
};

export default Home;
