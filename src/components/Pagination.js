import React from "react";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";

const Pagination = ({ currentPage, handlePageChange, totalPages }) => {
  // le component recupere les 3 props données pas le parent ResourceList
  const renderPageNumbers = () => {
    const pageNumbers = []; // declare un array qu'on va peupler avec la boucle
    for (let i = 1; i <= totalPages; i++) {
      // pour chaque element de l'array, je cree un bouton avec le numero de page, definis une fonction onclick
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)} // la fonction passée en props qui change la page actuelle
          className={`px-1 mx-1 rounded bg-yellow-200 text-black ${
            currentPage === i ? "active" : ""
          }`} // fait appel à la classe "active" qui change l'apparence du bouton de la page actuelle
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      {currentPage > 1 && ( // conditionnal rendering, ne s'affiche pas sur la page 1
        <PreviousButton onClick={() => handlePageChange(currentPage - 1)} /> // component previous avec call de la fonction en props au onclick puis call de la fonction pour generer les boutons de page
      )}
      {renderPageNumbers()}
      <NextButton onClick={() => handlePageChange(currentPage + 1)} />
    </div> // component next avec call de la fonction en props
  );
};

export default Pagination;
