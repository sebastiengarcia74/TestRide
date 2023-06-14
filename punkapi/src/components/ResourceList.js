import React, { useState, useEffect } from 'react';
import PunkAPIService from '../services/punkapi';
import Pagination from './Pagination';
import './ResourceList.css';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const resources = await PunkAPIService.fetchResources(currentPage);
      setResources(resources);
      console.log(resources);
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table>
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
          {resources.map(resource => (
            <tr key={resource.id}>
              <td>{resource.id}</td>
              <td><a href={`/resource/${resource.id}`}>{resource.name}</a></td>
              <td>{resource.first_brewed}</td>
              <td>{resource.abv}</td>
              <td>{resource.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  );
};


export default ResourceList;
