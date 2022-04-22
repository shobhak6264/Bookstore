import { createFilter } from "./create.js";
import { renderHeader} from "./render.js";
export let response_data = {};

export const getData = () => {
  return fetch(
    "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=Gtdym4qr4grJV7x3aOBuAu0CcmchgkGj"
  )
    .then((res) => res.json())
    .then((data) => data);
    
};

function getList() {
  getData().then((response) => {
    response_data = response; 
    createFilter(response);
    renderHeader(0, response.results.lists.length, response_data);
  });
}

getList();