function createElement(elType, content) {
    const title = document.createElement(elType);
    if(content==null)
    {
      return title;
    }
    else
    {
      title.innerText = content;

    return title;

    }
  }

  function createImage(elType, content) {
    const div = document.createElement(elType);
    div.setAttribute("src", content);
    return div;
  }

  function createAttribute(component,id,classname)
  {
    if(id!==null&&classname===null)
    {
      component.setAttribute("id",id);
    }
    if(id!==null&&classname===null)
    {
      component.setAttribute("class",classname);
    }
    else{
      component.setAttribute("id",id);
      component.setAttribute("class",classname);
    }
  }
  function createFilter(response)
  {
    // let all_filter = createElement("option","all")
    response.results.lists.forEach((genreList) => {
      let filter_option=document.createElement('option'); 
      filter_option.innerText = genreList.display_name;
      filter_option.setAttribute('value',genreList.list_id);
      const shell = document.getElementById("genre");
      shell.appendChild(filter_option);
    });
  }
 

  export {createElement,createImage,createFilter,createAttribute}
  