let modal = document.getElementById("modal_display");
let filter_value = document.getElementById("genre");
let btn_submit = document.getElementById("submit");
let card_display = document.getElementById("render");

import { createElement, createImage, createFilter } from "./create.js";
let response_data="";let id_val = "";
let div1 = "";
let disp = [{}];
let display_sections = [{}];
let buy_links = "";
fetch(
  "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=Gtdym4qr4grJV7x3aOBuAu0CcmchgkGj"
)
  .then((response) => response.json())
  .then((response) =>  {
    getList(response)
    

  
function getList(response) {
  createFilter(response);
  renderHeader(0, response.results.lists.length, response);
}

function renderHeader(st, end, books) {
  let i = 0;
  let list = books.results;
  for (i = st; i < end; i++) {
    id_val = "section-title" + i;
    div1 = createElement("div");
    div1.setAttribute("id", id_val);
    div1.setAttribute(
      "style",
      "position: sticky;top:10px;background-color:#fff"
    );
    document.getElementById("render").appendChild(div1);
    let book_title = document.createElement("h2");
    book_title.innerText = list.lists[i].display_name;
    book_title.setAttribute("class", "book_title");
    div1.appendChild(book_title);
    render(books, st, list.lists[i].display_name);
    st++;
  }
}
async function render(data, i, section_title) {
  await data.results.lists[i].books.forEach((path) => {
    buy_links = path.buy_links;
    const img = createImage("img", path.book_image);
    img.setAttribute("style", "padding:5px;width:331px;height:500px");
    img.setAttribute("id", section_title + i);
    img.setAttribute(
      "alt",
      path.title +
        "!" +
        path.author +
        "!" +
        path.description +
        "!" +
        path.contributor +
        "!" +
        path.publisher +
        "!" +
        path.book_review_link +
        "!" +
        path.primary_isbn10 
    );
    img.setAttribute("onclick","console.log(hello)");

    div1.appendChild(img);
    display_sections.push(div1);
  });
  disp.push(display_sections);
  btn_submit.onclick = () => {
    let j = 0;
    let k = 0;
    for (j = 0; j < data.results.lists.length; j++) {
      const filter_display = "section-title" + j;
      document.getElementById(filter_display).style.display = "none";
    }
    for (k = 0; k < data.results.lists.length; k++) {
      const filter_displayy = "section-title" + k;
      if (data.results.lists[k].list_id == filter_value.value) {
        document.getElementById(filter_displayy).style.display = "block";

        break;
      } else if (filter_value.value == "all") {
        renderHeader(0, response.results.lists.length, response);
        break;
      }
    }
  };
}

card_display.onclick = function (event) {
  let modalarray = "";
  try {
    modalarray = event.target.alt.split("!");
    console.log(modalarray);
  } catch (e) {}
  modal_display(
    modalarray[0],
    event.target.src,
    modalarray[1],
    modalarray[2],
    modalarray[3],
    modalarray[4],
    modalarray[5],
    modalarray[6],
  );
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.getElementById("hidePopUp").onclick = function (event) {
  modal.style.display = "none";
};

function modal_display(
  s_title,
  s_img,
  s_author,
  s_des,
  s_cont,
  s_pub,
  s_isbn
) {
  modal.style.display = "block";
  document.getElementById("buylinks").innerHTML = "";
  document.getElementById("popedimg").setAttribute("src", s_img);
  document.getElementById("title").innerHTML = s_title;
  document.getElementById("author").innerHTML = s_author;
  document.getElementById("description").innerHTML = s_des;
  document.getElementById("contributor").innerHTML = s_cont;
  document.getElementById("publisher").innerHTML = s_pub;
  document.getElementById("default-review").innerHTML = "";
  fetch(
    `https://api.nytimes.com/svc/books/v3/reviews.json?api-key=Gtdym4qr4grJV7x3aOBuAu0CcmchgkGj&title=${s_title}`
  )
    .then((response) => response.json())
    .then((response) => {
      if(response.num_resultss === 0){
        document.getElementById("default-review").innerHTML =
          "NO REVIEWS FOUND FOR THIS BOOK";
      }
      else if (response.num_results != 0) {
        document.getElementById("default-review").innerHTML = response.results[0].summary;
        
      }
    })
    .catch((err) => console.error(err));
  buy_links.forEach((nu) => {
    document.getElementById(
      "buylinks"
    ).innerHTML += `<a href="${nu.url}" target="_blank">${nu.name}</a>`;
  });
  const data = response.results.lists.map(item => {
    return item.books.filter(book => book.primary_isbn10 === s_isbn)
  });
  console.log(data);
  if(data === null)
  {

  }
  else {
    data.forEach ( img => {
      const imgg = createImage("img", img.book_image);
      imgg.setAttribute("style", "padding:5px;width:331px;height:500px");
      document.getElementById("similar-container").appendChild(imgg);
    })
  }
}

})
.catch((err) => console.error(err));