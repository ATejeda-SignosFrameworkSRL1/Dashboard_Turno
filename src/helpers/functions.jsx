import { useNavigate } from "react-router-dom";

/*
Added by: Luis A. Sierra
Added Date: 19/12/2024

Added setTimeout and setOptionMenu fucntions
Added variable tiempoAleatorio para modificacion global

*/

export const formattedDate = (creationDate) => {
  const date = new Date(creationDate);
  const año = date.getFullYear();
  const mes = date.getMonth() + 1;
  const dia = date.getDate();
  const formattedDate =
    año + "-" + (mes < 10 ? "0" : "") + mes + "-" + (dia < 10 ? "0" : "") + dia;

  return formattedDate;
};

export const capitalizeWord = (word) => {
  const capitalizeWord =
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return capitalizeWord;
};


export const goPath = (navigate, route, text) => {
  
  navigate(route);

  const myTimeout = setTimeout(setOptionMenu, 100);

  function setOptionMenu() {
   
    const TextNavbarText = document.getElementById('OptionMenu');
    TextNavbarText.setAttribute("style",'color:yellow;font-size:20px;text-align:left;');
    TextNavbarText.innerHTML = text
  }

};

//export const tiempoAleatorio =  Math.floor(Math.random() * (90000 - 60000 + 1)) + 60000;
export const tiempoAleatorio =  1000;