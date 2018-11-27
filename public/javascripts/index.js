'use strict';
const main = () => {
  // if you click the nav enter the text box

  const getFocus = () => {
    document.querySelector('.location-input').focus();
    console.log('focus');
  };
  const navBar = document.querySelector('#nav-bar');
  navBar.addEventListener('click', getFocus);

  // add click to search return options
  const addClickToInput = (li) => {
    let list = document.querySelectorAll('li');
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener('click', (event) => {
        let locationInput = document.querySelector('.location-input');
        locationInput.value = event.target.innerText;
        locationList.innerHTML = '';
      });
    }
  };

  // location get
  const locationEntry = document.querySelector('.location-input');
  const locationList = document.querySelector('.location-list');
  // track the entry in the top bar
  let input = '';
  locationEntry.addEventListener('keyup', () => {
    input = locationEntry.value;
    if (input.length > 1) {
      locationFinder(input);
    } else if (input.length >= 1) {
      locationList.innerHTML = '';
    }
  });
  // get locations from json file - places exists in locations
  const locationFinder = (input) => {
    let returnedLocations = [];
    for (let i = 0; i < places.length; i++) {
      if (places[i].name.toLowerCase().includes(input.toLowerCase())) {
        returnedLocations.push(places[i].name);
        appendLocations(returnedLocations);
      }
    }
  };
  // put locations in the list
  const appendLocations = (returnedLocations) => {
    locationList.innerHTML = '';
    for (let i = 0; i < returnedLocations.length && !i < 5; i++) {
      let li = document.createElement('li');
      li.innerText = returnedLocations[i];
      locationList.appendChild(li);
      addClickToInput(li);
    }
  };
};

window.addEventListener('load', main);
