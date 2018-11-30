
// section 1 - address
const goToFoodButton = document.getElementById('go-to-food-button');
const goBackToAddressButton = document.getElementById('go-back-to-address-button');
const addressSection = document.getElementById('form-address');
const foodSection = document.getElementById('form-food');
const foodAppear = () => {
  goToFood(foodSection, addressSection);
};
const goToFood = (foodSection, addressSection) => {
  addressSection.classList = 'hide-section';
  removeHide(foodSection);
  goBackToAddressButton.classList.remove('hidden');
  goToFoodButton.classList.add('hidden');
  showSection(foodSection);
  hideSection(addressSection);
  hideSection(goToFoodButton);
};
goToFoodButton.addEventListener('click', foodAppear);

const addressAppear = () => {
  goBackToAddress(foodSection, addressSection);
};

const goBackToAddress = (foodSection, addressSection) => {
  addressSection.classList.remove('hide-section');
  goBackToAddressButton.classList.add('hidden');
  goToFoodButton.classList.remove('hidden');
  showSection(addressSection);
  resetHeight(addressSection);
};

goBackToAddressButton.addEventListener('click', addressAppear);

// section 2 - food
const goToAllergiesButton = document.getElementById('go-to-allergies-button');
const goBackToFoodButton = document.getElementById('go-back-to-food-button');
const allergySection = document.getElementById('form-allergies');
const budgetSection = document.getElementById('form-budget');
const allergiesAppear = () => {
  goToAllergies(addressSection, allergySection);
};
goToAllergiesButton.addEventListener('click', allergiesAppear);

const goToAllergies = () => {
  foodSection.classList = 'hide-section';
  removeHide(allergySection);
  goBackToFoodButton.classList.remove('hidden');
  goToAllergiesButton.classList.add('hidden');
  showSection(budgetSection);
  resetHeight(budgetSection);
  hideSection(foodSection);
  hideSection(goToAllergiesButton);
};

const foodAppearBack = () => {
  goBackToFood(addressSection, allergySection);
};

const goBackToFood = () => {
  foodSection.classList.remove('hide-section');
  goBackToFoodButton.classList.add('hidden');
  goToAllergiesButton.classList.remove('hidden');
  showSection(foodSection);
  addHeight(foodSection);
};

goBackToFoodButton.addEventListener('click', foodAppearBack);

// section 3 - allergies/delivery
/*
const goToBudgetButton = document.getElementById('go-to-budget-button');
const goBackToAllergiesButton = document.getElementById('go-back-to-allergies-button');
const budgetSection = document.getElementById('form-budget');
const budgetAppear = () => {
  goToBudget(allergySection, budgetSection);
};
goToBudgetButton.addEventListener('click', budgetAppear);
const goToBudget = () => {
  allergySection.classList = 'hide-section';
  removeHide(budgetSection);
  goBackToAllergiesButton.classList.remove('hidden');
  goToBudgetButton.classList.add('hidden');
  showSection(budgetSection);
  hideSection(allergySection);
  hideSection(goToAllergiesButton);
};
*/
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
// set height to 0 in final section
const resetHeight = section => {
  section.style.height = '50vh';
};

// set height to 0 in final section
const addHeight = section => {
  section.style.height = '100vh';
};

const removeHide = section => {
  section.className.remove = 'hide-section';
};
