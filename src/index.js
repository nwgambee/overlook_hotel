import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// EVENT LISTENERS //

$('.login-btn').on('click', evaluateCredentials);

// DOM UPDATES
function evaluateCredentials() {
  let passwordInputVal = $('.password-input').val();
  let usernameInputVal = $('.username-input').val();
  let customerUserName = usernameInputVal.slice(0,8);
  let customerId = parseInt(usernameInputVal.slice(8,10));

  if (usernameInputVal.length === 10 && customerUserName === 'customer' && customerId <= 50 && passwordInputVal === 'overlook2019') {
    console.log('display customer dashboard');
  } else if (usernameInputVal === 'manager' && passwordInputVal === 'overlook2019') {
    console.log('display manager dashboard');
  } else {
    console.log('display log in error message');
  }
}
