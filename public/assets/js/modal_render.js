import { getData } from "./script.js";
import { createImage } from "./create.js";
let card_display = document.getElementById("render");
let similar_books = document.getElementById("similar-container");
let modal = document.getElementById("modal_display");
card_display.onclick = function (event) {
  let img_id = event.target.id;
  let img_src=event.target.src;
    render_modal(img_id,img_src);
  
};
similar_books.onclick = function (event) {
    // modal.innerHTML=``;
    let img_id = event.target.id;
    let img_src=event.target.src;
      render_modal(img_id,img_src);
    
  };

function render_modal(img_id,img_src)
{
    let data = "";
    getData().then((res) => {
        // document.getElementById("similar-container").innerHTML = ``;
        data = res.results.lists.map((item) => {
          return item.books.filter((book) => book.primary_isbn10 === img_id);
        });
        let i=0;
        data.forEach((list) => {
          if (list.length === 0) {
              console.log("Array length is zero");
          } else {
            modal_display(
              list[0].title,
              img_src,
              list[0].author,
              list[0].description,
              list[0].contributor,
              list[0].publisher,
              list[0].primary_isbn10,
              list[0].buy_links
            );
          }
          i++;
        });
      });
      if (event.target == modal) {
        modal.style.display = "none";
      }
}

document.getElementById("hidePopUp").onclick = function (event) {
  modal.style.display = "none";
};

function modal_display(s_title, s_img,s_author,s_des,s_cont,s_pub, s_isbn,s_buy_links) {
  modal.style.display = "block";
  document.getElementById("buylinks").innerHTML = ``;
  document.getElementById("popedimg").setAttribute("src", s_img);
  document.getElementById("title").innerHTML = s_title;
  document.getElementById("author").innerHTML = s_author;
  document.getElementById("description").innerHTML = s_des;
  document.getElementById("contributor").innerHTML = s_cont;
  document.getElementById("publisher").innerHTML = s_pub;
  document.getElementById("default-review").innerHTML = "";
  s_buy_links.forEach((nu) => {
    document.getElementById("buylinks").innerHTML += `<a href="${nu.url}" target="_blank">${nu.name}</a>`;
  });
  fetch(
    `https://api.nytimes.com/svc/books/v3/reviews.json?api-key=Gtdym4qr4grJV7x3aOBuAu0CcmchgkGj&title=${s_title}`
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.num_results === 0) {
        document.getElementById("default-review").innerHTML =
          "NO REVIEWS FOUND FOR THIS BOOK";
      } else if (response.num_results != 0) {
        document.getElementById("default-review").innerHTML =
          response.results[0].summary;
      }
    })
    .catch((err) => console.error(err));

  getData().then((res) => {
    document.getElementById("similar-container").innerHTML = ``;
    const data = res.results.lists.map((item) => {
      return item.books.filter((book) => book.primary_isbn10 !== s_isbn);
    });
    if (data === null) {
    } else {
      data.forEach((img) => {
        for (let h = 0; h < img.length; h++) {
          const imgg = createImage("img", img[h].book_image);
          imgg.setAttribute("style", "padding:5px;width:331px;height:500px");
          document.getElementById("similar-container").appendChild(imgg);
        }
      });
    }
  });
}
