import {UNSPLASH_API_URL, UNSPLASH_SEARCH_URL} from './constants/constants.js';
import {ACCESS_KEY} from './constants/unsplash-access-key.js';

export async function fetchImages(query = '') {
    try {
        const url = query
            ? `${UNSPLASH_SEARCH_URL}&query=${query}&client_id=${ACCESS_KEY}`
            : `${UNSPLASH_API_URL}&client_id=${ACCESS_KEY}`;

        const response = await fetch(url);
        let resultJson = await response.json();
        if ( query === '' ) {
            return resultJson;
        } else {
            return resultJson.results;
        }
    } catch (error) {
        console.error('Error while loading images:', error);
        return [];
    }
}
