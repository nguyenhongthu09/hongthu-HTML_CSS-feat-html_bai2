export const loading = (array, { status }) => {
  array.forEach((item) => {
    const [className, animationName] = item;
    const className_element = document.querySelector(`.${className}`);
    if (status) {
    
      className_element?.classList.add(animationName);
      className_element?.classList.remove("loader-hidden");
     
      
    } else {
      className_element?.classList.remove(animationName);
      className_element?.classList.add("loader-hidden");
   

    }
  });
};

