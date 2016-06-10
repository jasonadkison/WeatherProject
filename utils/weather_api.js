const API_KEY = '2a38b356fea0c50bc8fd8c42a27d740a';

export function getWeatherFromZipcode(zip = '', onSuccess = () => {}) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${API_KEY}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((res) => res.json())
    .then((json) => {
      let { name } = json;
      let { main, description } = json.weather[0];
      let { temp } = json.main;
      onSuccess({ name, main, description, temp });
    })
    .catch((error) => {
      console.warn(error);
    });
}
