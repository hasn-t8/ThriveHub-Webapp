export const API_BASE_URL = 'http://localhost:3000/api';
// export const API_BASE_URL = 'https://api.app.thrivehub.ai/api';
// import { API_URL } from '$env/static/public';
import { PUBLIC_API_URL_PRODUCTION, PUBLIC_ENV } from '$env/static/public';

const api_url = function () {
	console.log('PUBLIC_API_URL_PRODUCTION:', PUBLIC_API_URL_PRODUCTION);

    if (PUBLIC_API_URL_PRODUCTION && PUBLIC_ENV === 'production') {
        return PUBLIC_API_URL_PRODUCTION;
    }
    return 'http://localhost:3000/api';
};

export const API_BASE_URL = api_url();
// export const API_BASE_URL = 'https://api.app.thrivehub.ai/api';
