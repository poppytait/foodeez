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

// section 2 - food
const goToAllergiesButton = document.getElementById('go-to-allergies-button');
const goBackToFoodButton = document.getElementById('go-back-to-food-button');
const allergySection = document.getElementById('form-allergies');
const allergiesAppear = () => {
  goToAllergies(addressSection, allergySection);
};
goToAllergiesButton.addEventListener('click', allergiesAppear);

const goToAllergies = () => {
  foodSection.classList = 'hide-section';
  removeHide(allergySection);
  goBackToFoodButton.classList.remove('hidden');
  goToAllergiesButton.classList.add('hidden');
  showSection(allergySection);
  hideSection(foodSection);
  hideSection(goToAllergiesButton);
};

// section 3 - allergies/delivery
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
