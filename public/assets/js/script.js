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

export const getIP = () => {
    return fetch(
      "https://gwarflbvd2.execute-api.us-west-1.amazonaws.com/dev/whatismyip"
    )
      .then((res) => res.json())
      
  };

  getIP().then((response) => {
   console.log(response);
  });
  

function getList() {
  getData().then((response) => {
    response_data = response; 
    createFilter(response);
    renderHeader(0, response.results.lists.length, response_data);
  });
}

getList();