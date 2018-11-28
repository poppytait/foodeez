console.log('foms linked');
// section 1 - address
const goToFoodButton = document.getElementById('go-to-food-button');
const addressSection = document.getElementById('form-address');
const foodSection = document.getElementById('form-food');
const foodAppear = () => {
  goToFood(foodSection, addressSection);
  console.log('food appear');
};
const goToFood = (foodSection, addressSection) => {
  addressSection.classList = 'hide-section';
  removeHide(foodSection);
  showSection(foodSection);
  hideSection(addressSection);
  hideSection(goToFoodButton);
  console.log('go to food');
};
goToFoodButton.addEventListener('click', foodAppear);

// section 2 - food
const goToAllergiesButton = document.getElementById('go-to-allergies-button');
const allergySection = document.getElementById('form-allergies');
const allergiesAppear = () => {
  goToAllergies(addressSection, allergySection);
};
goToAllergiesButton.addEventListener('click', allergiesAppear);

const goToAllergies = () => {
  foodSection.classList = 'hide-section';
  removeHide(allergySection);
  showSection(allergySection);
  hideSection(foodSection);
  hideSection(goToAllergiesButton);
};

// section 3 - allergies/delivery
const goToBudgetButton = document.getElementById('go-to-budget-button');
const budgetSection = document.getElementById('form-budget');
const budgetAppear = () => {
  goToBudget(allergySection, budgetSection);
};
goToBudgetButton.addEventListener('click', budgetAppear);
const goToBudget = () => {
  allergySection.classList = 'hide-section';
  removeHide(budgetSection);
  showSection(budgetSection);
  hideSection(allergySection);
  hideSection(goToAllergiesButton);
};
// section 4 - budget & amount

// show function

const showSection = section => {
  section.style.transitionDuration = '1s';
  section.style.width = '100%';
  section.style.height = '100vh';
};
// hide function
const hideSection = section => {
  section.style.transitionDuration = '1s';
  section.style.width = '100%';
  section.style.height = '0vh';
};

const removeHide = section => {
  section.className.remove = 'hide-section';
};

function findOdd (A) {
  // happy coding!
  var count;
  A.forEach((element) => {
    for (var i = 0; i < A.length; i++) {
      if (element === A.length) {
        count++;
      }
    };
    if (!count % 2 === 0) {
      return A[i];
    }
  });
}
