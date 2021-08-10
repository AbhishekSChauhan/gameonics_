// const API_KEY = "914b1fb52d0e46e1a557fbf0a3e5d092";

// const BASE_URL = `https://api.rawg.io/api/`;
// const KEY = `key=${API_KEY}`;
// const gamesPerPage = 5;

// const getMonth = () => {
//     const month = new Date().getMonth() + 1;
//     if(month < 10){
//         return `0${month}`;
//     }else{
//         return month;
//     }
// };

// const getDay = () => {
//     const day = new Date().getDate();
//     if(day < 10){
//         return `0${day}`;
//     }else{
//         return day;
//     }
// };

// const currentYear = new Date().getFullYear();
// const currentMonth = getMonth();
// const currentDay = getDay();

// const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
// const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
// const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

// const popular_games = `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=${gamesPerPage}`;
// const upcoming_games = `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=${gamesPerPage}`;
// const new_Games = `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=${gamesPerPage}`;

// export const popularGamesURL = () => `${BASE_URL}${popular_games}${KEY}`;
// export const upcomingGamesURL = () => `${BASE_URL}${upcoming_games}${KEY}`;
// export const newGamesURL = () => `${BASE_URL}${new_Games}${KEY}`;
// export const getGameDetailsURL = (game_id) => `${BASE_URL}games/${game_id}`;
// export const getGameScreenshotsURL = (game_id) => `${BASE_URL}games/${game_id}/screenshots`;
// export const searchedGamesURL = (game_name) => `${BASE_URL}games?search=${game_name}&page_size=9`;







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
  const key = API_KEY;
  
  const popularGames = `games?key=${key}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=12`;
  const upcomingGames = `games?key=${key}&dates=${currentDate},${nextYear}&ordering=-added&page_size=12`;
  const newGames = `games?key=${key}&dates=${lastYear},${currentDate}&ordering=-released&page_size=12`;
  

  export const popularGamesURL = () => `${baseURL}${popularGames}`;
  export const upcomingGamesURL = () => `${baseURL}${upcomingGames}`;
  export const newGamesURL = () => `${baseURL}${newGames}`;
  
  export const gamesDetailsURL = (game_id) => `${baseURL}games/${game_id}?${key}`;
  
  export const gamesScreenshotsURL = (game_id) =>
    `${baseURL}games/${game_id}/screenshots?${key}`;
  
  export const searchGameURL = (game_name) =>
    `${baseURL}games?${key}&search=${game_name}&page_size=20`;