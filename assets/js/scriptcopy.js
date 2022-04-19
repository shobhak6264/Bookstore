let modal = document.getElementById("modal_display");
import {
  createElement,
  createImage,
  CreateDiv,
  createFilter,
} from "./create.js";

fetch(
  "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=Gtdym4qr4grJV7x3aOBuAu0CcmchgkGj"
)
  .then((response) => response.json())
  .then((response) => getList(response))
  .catch((err) => console.error(err));

function getList(response) {
  createFilter(response);
  renderHeader(0, 4, response);
}
function renderHeader(st, end, books) {
  let i = 0;
  let list=books.results;
  for(i=st;i<end;i++){
    let book_title = document.createElement("h2");
      book_title.innerText = list.lists[i].display_name;
      book_title.setAttribute(
        "style",
        "width:100%;background-color: antiquewhite;position:sticky"
      );
      document.getElementById("section-title").appendChild(book_title);
        render(books, st, list.lists[i].display_name);
        st++;
  }
  
}
// let i = 0;
//   data.results.lists.forEach((xyz) => {
//      console.log(xyz);
//     xyz.filter ( list => {
//       switch(list.list_name)
//       {
//         case 704 :
//       }
//     });
//     let book_title = document.createElement("h2");
//     book_title.innerText = xyz.display_name;
//     book_title.setAttribute(
//       "style",
//       "width:100%;background-color: antiquewhite;position:sticky"
//     );
//     document.getElementById("section-title").appendChild(book_title);
//     render(data, i, xyz.display_name);
//     i++;

let buy_links = "";
async function render(data, i, section_title) {
  await data.results.lists[i].books.forEach((path) => {
    const disp = document.getElementById("cards");
    const div1 = CreateDiv();
    const div2 = CreateDiv();
    //   let k = modal_display(s_title,s_img,s_des,s_author);
    buy_links = path.buy_links;
    const img = createImage("img", path.book_image);
    img.setAttribute("style", "padding:5px;width:331px;height:500px");
    img.setAttribute("id", section_title);
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
        path.book_review_link
    );
    document.getElementById("section-title").appendChild(img);
  });
}

let a1 = "";
// window.onclick = function (event) {
//   try {
//     a1 = event.target.alt.split("!");
//   } catch (e) {
//     // console.log(e);
//   }
//   modal_display(a1[0], event.target.src, a1[1], a1[2],a1[3],a1[4],a1[5]);
//   console.log(a1[2]);
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

function modal_display(s_title, s_img, s_author, s_des, s_cont, s_pub, s_rev) {
  modal.style.display = "block";
  document.getElementById("popedimg").setAttribute("src", s_img);
  document.getElementById("title").innerHTML = s_title;
  document.getElementById("author").innerHTML = s_author;
  document.getElementById("description").innerHTML = s_des;
  document.getElementById("contributor").innerHTML = s_cont;
  document.getElementById("publisher").innerHTML = s_pub;
  if (s_rev == null) {
    document.getElementById("default-review").innerHTML =
      "NO REVIEWS FOUND FOR THIS BOOK";
  } else {
    document.getElementById("default-review").innerHTML = s_pub;
  }
  buy_links.forEach((nu) => {
    document.getElementById(
      "buylinks"
    ).innerHTML += `<a href="${nu.url}" target="_blank">${nu.name}</a>`;
  });
}
