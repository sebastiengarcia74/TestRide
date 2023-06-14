import axios from 'axios';

const API_URL = 'https://api.punkapi.com/v2/';

class PunkAPIService {
  static async fetchResources(page = 1, per_page = 20) { // fonction fetch avec 2 arguments pour recuperer 20 resource par page
    try {
      const response = await axios.get(`${API_URL}beers?page=${page}&per_page=${per_page}`); //page va prendre la valeur currentpage definies dans ResourceList 
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async fetchResource(id) { //fonction fetch pour recuperer une resource selon l'id
    const response = await axios.get(`${API_URL}beers/${id}`);
    return response.data[0]; //comme l'api retourne un array d'objet, on indique qu'on s'interesse au premier element de l'array et qu'on va travailler avec l'objet
  }
}

export default PunkAPIService;
