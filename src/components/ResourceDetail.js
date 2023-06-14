import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PunkAPIService from "../services/punkapi";
import axios from "axios";

const ResourceDetail = () => {
  const { id } = useParams(); // reprend l'id de l'url grace a useParams()
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => { // fetch d'une resource tel que defini dans le service
      const resource = await PunkAPIService.fetchResource(id);
      setResource(resource);
      // console.log(resource);
    };

    fetchData(); //call de la foncction quand le component est rendered
  }, [id]); // rerender du component quand id change

  const handleSave = () => { // fonction pour faire une requete post a un faux endpoint et retourner une erreur
    axios
      .post("/fakeApiEndpoint", { id: resource.id, name: resource.name })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  if (!resource) { //display "loading" tant que la resource n'est pas dispo
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex flex-col bg-yellow-200 shadow-xl rounded-2xl p-6">
      {resource.image_url ? (  // condtionnal rendering, s'il y a une image dans la resource, elle est displayed, sinon c'est un message dans la div
          <figure className="w-full">
            <img
              src={resource.image_url}
              alt={resource.name}
              className="w-full h-60 object-contain"
            />
          </figure>
        ) : (
          <div className="w-full h-60 bg-white flex items-center justify-center rounded-md">
            <span>Image not available</span>
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {resource.name}
            <span className="italic text-gray-500">({resource.tagline})</span>
          </h2>
          <p className="my-2">{resource.description}</p>
          <p>
            <strong>ABV:</strong> {resource.abv}
          </p>
          <p>
            <strong>Volume:</strong> {resource.volume.value}{" "}
            {resource.volume.unit}
          </p>

          <p className="font-bold text-xl mt-4">Ingredients:</p>
          <div className="pl-4">
            <p className="font-bold">Malt:</p>
            <ul>
              {resource.ingredients.malt.length ? (  //conditionnal rendering , checke si [malt] n'est pas vide, si oui, message sinon
                resource.ingredients.malt.map((malt, index) => ( // map de l'array et affichage des datas en liste
                  <li key={index}>
                    <span className="font-semibold">{malt.name}:</span>{" "}
                    {malt.amount.value} {malt.amount.unit}
                  </li>
                ))
              ) : (
                <li>No malt ingredients available</li>
              )}
            </ul>

            <p className="font-bold mt-2">Hops:</p>
            <ul>
              {resource.ingredients.hops.length ? ( //même chose que pour malt
                resource.ingredients.hops.map((hop, index) => (
                  <li key={index}>
                    <span className="font-semibold">{hop.name}:</span>{" "}
                    {hop.amount.value} {hop.amount.unit},
                    <span className="font-semibold ml-2">Add:</span> {hop.add},
                    <span className="font-semibold ml-2">Attribute:</span>{" "}
                    {hop.attribute}
                  </li>
                ))
              ) : (
                <li>No hops ingredients available</li>
              )}
            </ul>
          </div>

          <div className="py-4">
            <h3 className="font-bold">Food Pairing:</h3>
            <ul className="list-disc list-inside">
              {resource.food_pairing.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4">
            <strong>Brewer's Tips:</strong> {resource.brewers_tips}
          </p>
          <div className="card-actions justify-end">
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
