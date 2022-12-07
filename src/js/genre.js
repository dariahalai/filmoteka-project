export let genresList;

export async function getOriginGenres() {
    try {
      const searchParams = new URLSearchParams({
        api_key: KEY,
      });
  
      const response = await axios.get(`${API}${GENRES}?${searchParams}`);
  
      if (response.status !== 200) {
        throw new Error(response.status);
      }
  
      return response.data;
    } catch (error) {
      console.log('Підставити картинку, сервер терміново недоступний');
    }
  }

export function getGenres(genreSet) {
    let genreStr = '';
  
    genreSet.forEach(id => {
      for (const genre of genresList) {
        if (genre.id === id) genreStr += genre.name + ', ';
      }
    });
  
    return !genreStr ? '' : genreStr.substring(0, genreStr.length - 2);
  }