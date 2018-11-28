var root_URL = 'http://localhost:3000';

let statusCheck = null;
let statusCheck2 = null;

let checkOrderStatus = () => {
  if (statusCheck === 1) {
    clearInterval(intervalID);
  }
  const id = document.getElementById('order-id').value;
  const status = document.getElementById('status');
  const linkStatus = document.getElementById('link-status');
  axios.get(`${root_URL}/order/${id}/json`)
    .then((response) => {
      if (response.data.willServe === false) {
        status.innerText = 'Sorry, Your Order has been Rejected';
        linkStatus.innerHTML = '<a href="/order">Make New Order</a>';

        statusCheck = 1;
      } else if (response.data.willServe === true) {
        status.innerText = 'YAY! your order has been accepted';
      } else {
        status.innerText = 'We are awaiting confirmation';
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
        statusCheck2 = 1;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const intervalID = setInterval(checkOrderStatus, 500);
const intervalID2 = setInterval(checkDeliveredStatus, 2000);
