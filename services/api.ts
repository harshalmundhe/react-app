

export const AN_CONFIG = {
    BASE_URL: 'https://api.jikan.moe/v4',
    API_KEY: '',
    headers: {
        accept: 'application/json',
        Authorization: ''
    }

}

export const fetchAnime = async ({query} : {query : string}) => {
     const endpoint = 
        query ? 
        `${AN_CONFIG.BASE_URL}/anime?query=${encodeURIComponent(query)}`:
        `${AN_CONFIG.BASE_URL}/anime?order_by=popularity&limit=20`;

        console.log(endpoint);
     const response = await fetch(endpoint, {
        method: "GET",
        mode: 'cors',
        headers: AN_CONFIG.headers
     } );

     if(!response.ok) {
        // @ts-ignore
        throw new Error('failed to fetch details', response.statusText);
     }

     const data =  await response.json();

     return data.data;
}
