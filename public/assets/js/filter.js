let filter_value = document.getElementById("genre");
let btn_submit = document.getElementById("submit");
// import { renderHeader} from "./render.js";
import { response_data } from "./script.js";
btn_submit.onclick = () => {
    let j = 0;
    let k = 0;
    for (j = 0; j < response_data.results.lists.length; j++) {
      const filter_display = "section-title" + j;
      document.getElementById(filter_display).style.display = "none";
    }
    for (k = 0; k < response_data.results.lists.length; k++) {
      const filter_displayy = "section-title" + k;
      if (response_data.results.lists[k].list_id == filter_value.value) {
        document.getElementById(filter_displayy).style.display = "block";

        break;
      } else if (filter_value.value == "all") {
        location.reload();
        // renderHeader(0, response_data.results.lists.length, response_data);
        break;
      }
    }
  };