import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// import classes
import Customer from './Customer.js';
import Manager from './Manager.js';
import Bookings from './Bookings.js';

// variables //
let todaysDate = getDate();
let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);
let currentCustomer;
let chosenDate;
let booking;
let manager;

// fetching logic pt.2 (pt.1 in variables) //
Promise.all([userData, roomData, bookingData]).then(data => {
  userData = data[0];
  roomData = data[1];
  bookingData = data[2];
}).then(() => {
  booking = new Bookings(bookingData, roomData);
})

// EVENT LISTENERS //

$('.login-btn').on('click', evaluateCredentials);
$('.logout-btn').on('click', returnToHome);

// DOM UPDATES //
function returnToHome() {
  location.reload();
}

function evaluateCredentials() {
  let passwordInputVal = $('.password-input').val();
  let usernameInputVal = $('.username-input').val();
  let customerUserName = usernameInputVal.slice(0,8);
  let customerId = parseInt(usernameInputVal.slice(8,10));

  if (usernameInputVal.length === 10 && customerUserName === 'customer' && customerId <= 50 && passwordInputVal === 'overlook2019') {
    currentCustomer = new Customer(customerId, userData.find(data => customerId === data.id).name, booking.findPastBookings(todaysDate, customerId), booking.findUpcomingBookings(todaysDate, customerId));
    changeToCustomerDash();
  } else if (usernameInputVal === 'manager' && passwordInputVal === 'overlook2019') {
    manager = new Manager();
    changeToManagerDash();
  } else {
    displayErrors();
  }
}

function changeToCustomerDash() {
  console.log(currentCustomer);

  $('.login-page').addClass('hidden');
  $('.customer-dash').removeClass('hidden');
  $('.username-h2').text(`${currentCustomer.name}'s Guest Portal`);
  $('#book-room-btn').on('click', showBookingPage);

  updatePastBookingsHTML(currentCustomer.pastBookings);
  updateUpcomingBookingsHTML(currentCustomer.upcomingBookings);
  updateTotalSpendHTML();
}

function updatePastBookingsHTML(pastBookings) {
  pastBookings.forEach(booking => $('.past-booked-list').append(`<li>You stayed in room ${booking.roomNumber} on ${booking.date}</li>`));
}

function updateUpcomingBookingsHTML(upcomingBookings) {
  upcomingBookings.forEach(booking => $('.upcoming-booked-list').append(`<li>You are staying in room ${booking.roomNumber} on ${booking.date}</li>`));
}

function updateTotalSpendHTML(pastBookings) {
  $('#dollar-amount').text(`$${booking.getTotalSpent(currentCustomer.id)}`);
}

function changeToManagerDash() {
  console.log('showing manager dash');
}

function displayErrors() {
  console.log('showing login error');
}

function showBookingPage() {
  $('.room-booking').toggleClass('hidden');
  $('.info-boxes').toggleClass('hidden');
  $('#check-avail-btn').on('click', displayAvailableRooms);
}

function displayAvailableRooms() {
  $('.available-rooms').html('');
  let rawDate = $('#date-input').val();
  let formattedDate = rawDate.toString().replace(/-/g,'/');
  chosenDate = formattedDate;
  let availableRooms = booking.findAvailableRooms(formattedDate);
  availableRooms.forEach(room => $('.available-rooms').append(`<li>Room ${room.number}, a ${room.roomType} with a ${room.bedSize} is available this night. It costs $${room.costPerNight} per night.<button class="book-this-room" id="${room.number}">Book This Room</button></li>`));
  $('.book-this-room').on('click', bookRoom);
}

// this is a little bit of duplication, trying to get around doing this
function bookRoom(event) {
  currentCustomer.bookRoom(event.target.id, chosenDate)
}

// helper functions //

function getDate() {
var today = new Date();
var date = today.getFullYear()+'/0'+(today.getMonth()+1)+'/'+today.getDate();
return date.toString();
}
