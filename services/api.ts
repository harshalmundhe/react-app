

export const AN_CONFIG = {
    BASE_URL: 'https://api.jikan.moe/v4',
    API_KEY: '',
    headers: {
        accept: 'application/json',
        Authorization: ''
    }

}

interface FetchAnimeProp {
   query : string,
   page?: number
}

export const fetchAnime = async ({query, page} : FetchAnimeProp) => {
      if(!page) {
         page = 1;
      }

     const endpoint = 
        query ? 
        `${AN_CONFIG.BASE_URL}/anime?q=${encodeURIComponent(query)}`:
        `${AN_CONFIG.BASE_URL}/anime?order_by=end_date&limit=60&sort=desc&page${page}`;

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

export const fetchTrendingAnime = async () => {
   const endpoint = `${AN_CONFIG.BASE_URL}/anime?order_by=favorites&limit=5&sort=desc`;

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


export const fetchAnimeDetails = async (id : string): Promise <MovieDetails> => {
   try {
      const endpoint = `${AN_CONFIG.BASE_URL}/anime/${encodeURIComponent(id)}`;

      
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
   } catch (error) {
      console.log(error)
      throw error;
   }


      
}