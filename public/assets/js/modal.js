// import { create } from "domain";
import {
  createElement,createAttribute
} from "./create.js";
import { createImage } from "./create.js";
import { getData } from "./script.js";
let modal_displayy = document.getElementById("modal_display");
// export let modal_displayy = createElement("div",null);
// modal_displayy.setAttribute("id","modal_display");

export let modal_container =createElement("div",null);
createAttribute(modal_container,null,"modal-container")
export let book_content = createElement("div",null,"book-content","book-content");
createAttribute(book_content,"book_content","book-content");
export let header = createElement("h6","Book Details");
export let book_container = createElement("div",null);
createAttribute(book_container,null,"book-container");
export let popedbook = createElement("div",null);
createAttribute(popedbook,"popedbook","poped-book");
export let book_img=createElement("img");
createAttribute(book_img,"popedimg","book-img");
book_img.setAttribute("data-book","book");
export let book_details = createElement("div",null);
createAttribute(book_details,null,"book-details");
export let title_header = createElement("label","Title");
export let title = createElement("h6");
createAttribute(title,"title");
export let author_header = createElement("label","author");
export let author = createElement("h6");
createAttribute(author,"author");
export let contributor_header = createElement("label","contributor");
export let contributor = createElement("h6");
createAttribute(contributor,"contributor");
export let publisher_header = createElement("label","publisher");
export let publisher = createElement("h6");
createAttribute(publisher,"publisher");
export let description_header = createElement("label","description");
export let description = createElement("h6");
createAttribute(description,"description");
export let buy_links_header = createElement("label","buy Links");
export let buy_links = createElement("div");
createAttribute(buy_links,"buylinks","buy-links");
export let similar_content = createElement("div");
createAttribute(similar_content,"similar-content","similar-content");
export let similar_control = createElement("div",null,"similar-control");
createAttribute(similar_control,null,"similar-control");
export let similar_books = createElement("h6","Similar Books");
export let hidepopup = createElement("button","X");
createAttribute(hidepopup,"hidePopUp");
export let similar_container = createElement("div");
createAttribute(similar_container,"similar-container","similar-container");
export let review_content = createElement("div",null,"review-content","review-content");
export let book_reviews = createElement("h6","Book Reviews");
export let review_container = createElement("div");
createAttribute(review_container,"review-container","review-container");
export let default_review = createElement("p");

export function get_reviews (title) {
  fetch(
    `https://api.nytimes.com/svc/books/v3/reviews.json?api-key=Gtdym4qr4grJV7x3aOBuAu0CcmchgkGj&title=${title}`
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.num_results === 0) {
        return default_review.innerHTML =
          "NO REVIEWS FOUND FOR THIS BOOK";
      } else if (response.num_results != 0) {
        return default_review.innerHTML =
          response.results[0].summary;
      }
    })
    .catch((err) => console.error(err));
}

export function get_similar_books (isbn) {
  getData().then((res) => {
    similar_container.innerHTML = ``;
    const data = res.results.lists.map((item) => {
      return item.books.filter((book) => book.primary_isbn10 !== isbn);
    });
    if (data === null) {
    } else {
      data.forEach((img) => {
        for (let h = 0; h < img.length; h++) {
          const imgg = createImage("img", img[h].book_image);
          imgg.setAttribute("style", "padding:5px;width:331px;height:500px");
          similar_container.appendChild(imgg);
        }
      });
    }
  });
}


createAttribute(default_review,"default-review","default-review");
book_details.append(title_header,title,author_header,author,contributor_header,contributor,publisher_header,publisher,description_header,description,buy_links_header,buy_links);
similar_control.append(similar_books,hidepopup);
similar_content.append(similar_control,similar_container);
review_container.appendChild(default_review);
review_content.append(book_reviews,review_container);
popedbook.appendChild(book_img);
book_container.append(popedbook,book_details);
book_content.append(header,book_container);
modal_container.append(book_content,similar_content,review_content);
modal_displayy.append(modal_container);




