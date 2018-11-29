var root_URL = 'http://localhost:3000';
console.log('linked');
let statusCheck = null;
let statusCheck2 = null;
const status = document.getElementById('status');

let checkOrderStatus = () => {
  if (statusCheck === 1) {
    clearInterval(intervalID);
  }
  const id = document.getElementById('order-id').value;
  const linkStatus = document.getElementById('link-status');
  const mapElement = document.getElementById('map');

  axios.get(`${root_URL}/order/${id}/json`)
    .then((response) => {
      if (response.data.willServe === false) {
        status.innerText = 'Sorry, Your Order has been Rejected';
        linkStatus.innerHTML = '<a href="/order">Make New Order</a>';

        statusCheck = 1;
      } else if (response.data.willServe === true) {
        status.innerText = 'YAY! Your order has been accepted and may come from one of the following restaurants.';
        mapElement.style.display = 'flex';
        statusCheck = 1;
        confetti();
      } else {
        status.innerText = 'We are awaiting confirmation';
        mapElement.style.display = 'none';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

let checkDeliveredStatus = () => {
  if (statusCheck2 === 1) {
    clearInterval(intervalID2);
  }
  const id = document.getElementById('order-id').value;
  const confettiContainer = document.getElementById('confetti-container');

  axios.get(`${root_URL}/order/${id}/json`)
    .then((response) => {
      if (response.data.isCompleted === true) {
        confettiContainer.classList.remove('hidden');
        let mapElement2 = document.getElementById('map');
        mapElement2.style.display = 'none';
        status.innerText = '';

        statusCheck2 = 1;
        statusCheck = 1;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const intervalID = setInterval(checkOrderStatus, 500);
const intervalID2 = setInterval(checkDeliveredStatus, 2000);
