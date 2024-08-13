const validar = (form) => {
    const elems = document.querySelectorAll(form);
    let bandera = true;
    elems.forEach(element => {
      if (element.value === "") {
        element.classList.add("error");
        bandera = false;
      } else {
        element.classList.remove("error");
      }
    });
    return bandera;
  };
  
  export default validar;