const checkBoxes = () => {
  console.log('im checking boxes');
  const topList = document.querySelector('.selectedFoods');
  const checkOptions = document.getElementsByTagName('input');

  let foodOptions = topList.getAttribute('id');

  foodOptions = foodOptions.split(',');
  console.log(checkOptions);

  for (let i = 0; i < foodOptions.length; i++) {
    console.log(foodOptions[i]);
  }
};
checkBoxes();
