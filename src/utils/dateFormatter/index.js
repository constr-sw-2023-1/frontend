const dateFormatter = (date) => {
    const splittedDate = date.split("/");
  
    return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
  }
  
  export default dateFormatter