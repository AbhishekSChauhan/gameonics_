const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    } else {
      return month;
    }
  };
  
  const getCurrentDay = () => {
    const day = new Date().getDate();
    if (day < 10) {
      return `0${day}`;
    } else {
      return day;
    }
  };
  
  const currentYear = new Date().getFullYear();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();
  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
  const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
  
  const baseURL = 'https://api.rawg.io/api/';
  const key = "914b1fb52d0e46e1a557fbf0a3e5d092";
  
  const popularGames = `games?key=${key}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12`;
  const upcomingGames = `games?key=${key}&dates=${currentDate},${nextYear}&ordering=-added&page_size=12`;
  const newGames = `games?key=${key}&dates=${lastYear},${currentDate}&ordering=-released&page_size=12`;
  
  export const allGamesURL = () => `https://api.rawg.io/api/games?key=914b1fb52d0e46e1a557fbf0a3e5d092&ordering=-added&page_size=200`
  
  export const trendingGamesURL = () => `https://api.rawg.io/api/games/lists/main?key=914b1fb52d0e46e1a557fbf0a3e5d092&ordering=-relevance&page_size=12`

  export const popularGamesURL = () => `${baseURL}${popularGames}`;
  export const upcomingGamesURL = () => `${baseURL}${upcomingGames}`;
  export const newGamesURL = () => `${baseURL}${newGames}`;
  
  export const gamesDetailsURL = (game_id) => `${baseURL}games/${game_id}?key=${key}`;
  
  export const gamesScreenshotsURL = (game_id) =>
    `${baseURL}games/${game_id}/screenshots?key=${key}`;

  export const gamesSuggestedURL = (game_id) =>
    `${baseURL}games/${game_id}/suggested?key=${key}`;

  
  
  export const searchedGamesURL = (game_name) =>
    `${baseURL}games?key=${key}&search=${game_name}&page_size=20`;
    export const searchGameURL = (game_name) =>
    `${baseURL}videogameAutocomplete?key=${key}?q=${game_name}`
