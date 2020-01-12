import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);


// EVENT LISTENERS //

$('.login-btn').on('click', evaluateCredentials);

// DOM UPDATES
function evaluateCredentials() {
  let passwordInputVal = $('.password-input').val();
  let usernameInputVal = $('.username-input').val();
  let customerUserName = usernameInputVal.slice(0,8);
  let customerId = parseInt(usernameInputVal.slice(8,10));

  if (usernameInputVal.length === 10 && customerUserName === 'customer' && customerId <= 50 && passwordInputVal === 'overlook2019') {
    changeToCustomerDash();
  } else if (usernameInputVal === 'manager' && passwordInputVal === 'overlook2019') {
    changeToManagerDash();
  } else {
    displayErrors();
  }
}

function changeToCustomerDash() {
  console.log('showing customer dash');
}

function changeToManagerDash() {
  console.log('showing manager dash');
}

function displayErrors() {
  console.log('showing login error');
}
