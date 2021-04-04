import axios from 'axios';

const form = document.querySelector('form')!;
const addressEl = form.querySelector('#address') as HTMLInputElement;
const mapEl = document.getElementById('map')! as HTMLDivElement;

const HERE_API_KEY = 'UXUW9lUMMymPGT9UvU2ke0muFeSUGwpVY7Xnly4pS_Y';

declare const H: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressEl.value && encodeURI(addressEl.value);
  console.log(enteredAddress);
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${enteredAddress}&apiKey=${HERE_API_KEY}`;
  axios
    .get(url)
    .then((response) => {
      const searchItems = response.data.items;
      if (searchItems.length > 0) {
        return searchItems[0].position;
      }
    })
    .then((position) => {
      console.log(position);
      const platform = new H.service.Platform({
        apikey: HERE_API_KEY,
      });
      const defaultLayers = platform.createDefaultLayers();

      mapEl.innerHTML = '';
      const map = new H.Map(
        mapEl,
        defaultLayers.vector.normal.map,
        {
          zoom: 13,
          center: position,
        }
      );
    })
    .catch((error) => console.log(error));
}

form.addEventListener('submit', searchAddressHandler);
