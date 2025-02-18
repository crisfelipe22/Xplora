// eslint-disable-next-line no-unused-vars
import React from "react";
import "../styles/Home.css"; // Import styles
import CardRecomendaciones from "../components/CardRecomendaciones";

const Home = () => {
  return (
    <main className="home-container">
      <section className="search-bar">
        <p>Search bar placeholder</p>
      </section>
      <section className="categories">
        <p>Categories placeholder</p>
      </section>
      <section className="suggestions">
        <p>Suggestions placeholder</p>
        <CardRecomendaciones />
      </section>
    </main>
  );
};

export default Home;
