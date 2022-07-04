import axios from 'axios';
import { BASE_URI, MAPBOX_URI } from '../../config';

export const httpClient = axios.create({
    baseURL: BASE_URI,
});



httpClient.defaults.headers.post['Content-Type'] = 'application/json';

export const apiMapBox = axios.create({
    baseURL:MAPBOX_URI ,
    params: {
        'access_token': 'pk.eyJ1IjoibWFyaW8xOTkyIiwiYSI6ImNraTNweGxubDFyaDIyeHBkYndoMnJiaTIifQ.-s924jXs9tqZ-Ign6zJdvw',
        'limit': 5,
        'language': 'es'
      }
});

apiMapBox.defaults.headers.post['Content-Type'] = 'application/json';