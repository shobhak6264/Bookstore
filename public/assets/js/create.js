function createElement(elType, content,attribute_1,attribute_2) {
    const title = document.createElement(elType);
   
    // if(attribute_1==null)
    // {
    //   title.setAttribute("id",attribute_2);
    // }
    // else if(attribute_2==null)
    // {
    //   title.setAttribute("class",attribute_1);
    // }
    if(content==null)
    {
      // title.setAttribute("id",id);
      return title;
    }
    else
    {
      title.setAttribute("class",attribute_1);
      title.setAttribute("id",attribute_2);
      title.innerText = content;

    return title;

    }
    console.log(title);
  }

  function createImage(elType, content) {
    const div = document.createElement(elType);
    div.setAttribute("src", content);
    return div;
  }

  function createFilter(response)
  {
    response.results.lists.forEach((genreList) => {
      let filter_option=document.createElement('option'); 
      filter_option.innerText = genreList.display_name;
      filter_option.setAttribute('value',genreList.list_id);
      const shell = document.getElementById("genre");
      shell.appendChild(filter_option);
    });
  }
 

  export {createElement,createImage,createFilter}
  