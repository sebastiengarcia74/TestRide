import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PunkAPIService from "../services/punkapi";
import axios from "axios";

const ResourceDetail = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resource = await PunkAPIService.fetchResource(id);
      setResource(resource);
      console.log (resource);
    };

    fetchData();
  }, [id]);

  const handleSave = () => {
    // Simulate a POST request with axios here
    // As there's no real endpoint, it will return an error
    axios
      .post("/fakeApiEndpoint", { id: resource.id, name: resource.name })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  if (!resource) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-yellow-200 rounded">
      <div className="card lg:card-side bg-base-100 shadow-xl rounded-lg">
        <figure><img src={resource.image_url} alt={resource.name} className="w-20 h-6"/></figure>
        <div className="card-body">
          <h2 className="card-title">{resource.name} {resource.tagline}</h2>
          <div style={{width: '50%', overflow: 'auto'}}>
            <p>{resource.description}</p>
          </div>
          <div className="card-actions justify-end">
            <button onClick={handleSave} className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ResourceDetail;
