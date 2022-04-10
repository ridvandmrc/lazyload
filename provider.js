// function that creates an element to use in container
function createCarElement(indis, cars) {
  const option = document.createElement("div");
  option.value = cars[indis % cars.length];
  option.style.height = "100px";
  option.style.borderBottom = "1px solid gray";
  option.innerHTML = cars[indis % cars.length] + " " + indis;
  return option;
}

// load elements
function loadData() {
  let endIndis = 50;
  const STEP = 50;
  const cars = ["volvo", "saab", "opel", "audi"];
  const elements = [...Array(10000)].map((_, indis) => {
    return createCarElement(indis, cars);
  });

  // select parent
  const selectElement = document.querySelector("div");
  const intersectionObserver = new IntersectionObserver(
    (entry) => {
      // last element start to shown on the screen
      if (entry[0].intersectionRatio > 0) {
        // unobserve to last element
        intersectionObserver.unobserve(
          selectElement.querySelector("div:last-child")
        );

        // add next elements that step size
        console.log("entry: ", entry);
        elements.splice(++endIndis, STEP).forEach((el) => {
          selectElement.appendChild(el);
        });

        // start to observe new last child
        intersectionObserver.observe(
          selectElement.querySelector("div:last-child")
        );
      }
    },
    { threshold: 1 }
  );

  elements.splice(0, STEP).map((_, indis) => {
    selectElement.appendChild(createCarElement(indis, cars));
  });

  intersectionObserver.observe(selectElement.querySelector("div:last-child"));
}
