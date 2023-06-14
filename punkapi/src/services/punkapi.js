import axios from 'axios';

const API_URL = 'https://api.punkapi.com/v2/';

class PunkAPIService {
  static async fetchResources(page = 1, per_page = 20) {
    try {
      const response = await axios.get(`${API_URL}beers?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async fetchResource(id) {
    const response = await axios.get(`${API_URL}beers/${id}`);
    return response.data[0]; // API returns an array with a single item, we want the item
  }
}

export default PunkAPIService;
