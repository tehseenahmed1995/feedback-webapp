import axios from 'axios';

export const fetchCsrfToken = async () => {
  try {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    const http = axios.create({
    'baseURL' : process.env.REACT_APP_API_URL,
    headers : {
      'X-Requested-With' : 'XMLHttpRequest',
    }
  });
   await http.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};