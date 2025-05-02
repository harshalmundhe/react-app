

export const AN_CONFIG = {
    BASE_URL: 'http://192.168.0.6/pro/test-app-backend/public/index.php/api',
    API_KEY: '',
    headers: {
        "accept": 'application/json',
        "Content-type":'application/json'
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

      const endpoint = `${AN_CONFIG.BASE_URL}/fetch-anime`;
      let requestBody = '';
        if(query) {
         requestBody = JSON.stringify({ type: "filter", q:query.trim(), page:page });
        } else {
         requestBody = JSON.stringify({ type: "latest", page:page });
        }



        console.log(requestBody);
     const response = await fetch(endpoint, {
        method: "POST",
        mode: 'cors',
        body:requestBody,
        headers: AN_CONFIG.headers
     } );

     if(!response.ok) {
        // @ts-ignore
        throw new Error('failed to fetch details', response.statusText);
     }
     
     const data =  await response.json();
     

     return data;
}

export const fetchTrendingAnime = async () => {
   
   const endpoint = `${AN_CONFIG.BASE_URL}/fetch-anime`;

      console.log(endpoint);
      const requestBody = JSON.stringify({ type: "trending" });
   const response = await fetch(endpoint, {
      method: "POST",
      mode: 'cors',
      body:requestBody,
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
      const endpoint = `${AN_CONFIG.BASE_URL}/fetch-anime/${encodeURIComponent(id)}`;

      
   const response = await fetch(endpoint, {
      method: "POST",
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