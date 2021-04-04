import axios from 'axios';

const form = document.querySelector('form')!;
const addressEl = form.querySelector('#address') as HTMLInputElement;
const mapEl = document.getElementById('map')! as HTMLDivElement;

const HERE_API_KEY = 'UXUW9lUMMymPGT9UvU2ke0muFeSUGwpVY7Xnly4pS_Y';

declare const H: any;

type HereResponse = {
  items: {
    id: string;
    address: {
      city: string;
      countryCode: string;
      countryName: string;
      country: string;
      label: string;
    };
    position: {
      lat: number;
      lng: number;
    };
    title: string;
  }[];
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressEl.value && encodeURI(addressEl.value);
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${enteredAddress}&apiKey=${HERE_API_KEY}`;
  axios
    .get<HereResponse>(url)
    .then((response) => {
      const searchItems = response.data.items;
      if (searchItems.length > 0) {
        const goodMatched = searchItems[0];
        console.log(goodMatched.position, goodMatched.title);
        return goodMatched.position;
      }
      throw Error('Could not find the address!');
    })
    .then((position) => {
      const platform = new H.service.Platform({
        apikey: HERE_API_KEY,
      });
      const defaultLayers = platform.createDefaultLayers();

      mapEl.innerHTML = '';
      const map = new H.Map(mapEl, defaultLayers.vector.normal.map, {
        zoom: 13,
        center: position,
      });
      const marker = new H.map.Marker(position);
      map.addObject(marker);
    })
    .catch((error) => alert(error));
}

form.addEventListener('submit', searchAddressHandler);
