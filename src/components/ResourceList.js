import React, { useState, useEffect } from "react";
import PunkAPIService from "../services/punkapi";
import Pagination from "./Pagination";
import SortList from "./SortList";
import Search from "./Search";
import "./ResourceList.css";

const ResourceList = () => {
  const [resources, setResources] = useState([]); // les ressources données par le fetch api
  const [currentPage, setCurrentPage] = useState(1); // pour updater la page actuelle
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState(""); // pour updater les options de tri
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedResources = await PunkAPIService.fetchResources(currentPage); // fetch les données en fonction de la page actuelle (20 resultats par page) selon la fonction definié dans le servive
      setResources(fetchedResources);
      setFilteredResources(fetchedResources); // Initialize filteredResources with all resources
       const totalResources = 325; // Nombre total des bières
      const resourcesPerPage = 20; // nombre d'éléments par page
      const totalPages = Math.ceil(totalResources / resourcesPerPage); // calcul nombre de pages
      setTotalPages(totalPages);
    };

    fetchData();
  }, [currentPage]); // rerender lorsque la page actuelle change

  
  const handlePageChange = (pageNumber) => {
    // fonction pour changer la page actuelle passée en props au component pagination
    setCurrentPage(pageNumber);
  };
  
  const handleSort = (option) => { //fonction de gestion des tris 
    setSortOption(option);
    
    const sortedResources = [...filteredResources].sort((a, b) => { //spread des ressources pour ne pas muter l'array
      if (option === "abv") {
        return a.abv - b.abv;
      } else if (option === "name") {
        return a.name.localeCompare(b.name);
      } else if (option === "first_brewed") {
        return a.first_brewed.localeCompare(b.first_brewed); //tri avec differentes options
      }
      return 0;
    });
    
    setFilteredResources(sortedResources); //filteredresource devient le resultat du tri
  };
  
  useEffect(() => {
    const applyFilters = () => { //function qui filtre l'array resource selon l'input
      const filtered = resources.filter((resource) => {
        const { name, first_brewed, abv, description } = resource; //destructuring de resource
        const lowercaseSearchTerm = searchTerm.toLowerCase(); // passe en minuscule l'input pour eviter le case sensitive
        return (
          name.toLowerCase().includes(lowercaseSearchTerm) || // check si l'input est dans les noms
          first_brewed.toLowerCase().includes(lowercaseSearchTerm) || //ou dans firstbrewed
          abv.toString().includes(lowercaseSearchTerm) || //ou dans abv
          description.toLowerCase().includes(lowercaseSearchTerm) //ou dans description
          );
        });
        // console.log("filtered" + filtered);
      setFilteredResources(filtered); //store le resultat dans filteredresources
    };

    applyFilters(); //call de la function
  }, [resources, searchTerm]); // le component va render si resources ou searchterm change

  const handleSearch = (searchTerm) => { // fonction search passée en props au search componenr
    setSearchTerm(searchTerm);
  };

  return (
    <div className="container mx-auto">
    <div className="flex justify-between">
      <SortList handleSort={handleSort} />  {/* component tri avec la fonction gestion tri passée en props */}
      <Search handleSearch={handleSearch} />
    </div>
      <table className="my-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>First Brewed</th>
            <th>ABV</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map((resource) => ( // map la data pour pouvoir afficher les éléments choisis
            <tr
              key={resource.id} // rend la ligne clickable pour accéder à la vue unitaire
              onClick={() => {
                window.location.href = `/resource/${resource.id}`;
              }}
              style={{ cursor: "pointer" }}
            >
              <td>{resource.id}</td>
              <td>{resource.name}</td>
              <td>{resource.first_brewed}</td>
              <td>{resource.abv}</td>
              <td>{resource.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 mb-4 flex justify-center items-center">
        <Pagination //component pagination auquel je passe 3 props
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ResourceList;
