let id_val = "";
let render_section = "";
import { createElement, createImage } from "./create.js";

export function renderHeader(st, end, books) {
    let i = 0;
    let list = books.results;
    for (i = st; i < end; i++) {
      id_val = "section-title" + i;
      render_section = createElement("div");
      render_section.setAttribute("id", id_val);
      render_section.setAttribute(
        "style",
        "position: sticky;top:10px;background-color:#fff"
      );
      document.getElementById("render").appendChild(render_section);
      let book_title = document.createElement("h2");
      book_title.innerText = list.lists[i].display_name;
      book_title.setAttribute("class", "book_title");
      render_section.appendChild(book_title);
      renderimage(books, st);
      st++;
    }
  }

  export async function renderimage(data, i) {
    await data.results.lists[i].books.forEach((path) => {
      const img = createImage("img", path.book_image);
      img.setAttribute("style", "padding:5px;width:331px;height:500px");
      img.setAttribute("id", path.primary_isbn10);
      render_section.appendChild(img);
    });
}