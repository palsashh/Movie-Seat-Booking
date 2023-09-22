//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
// Use moviesList array for displaing the Name in the dropdown menu
//Add eventLister to each unoccupied seat
//Add eventLsiter to continue Button
//Add eventListerner to Cancel Button
// Movie data


// Get DOM elements
const selectMovie = document.getElementById("selectMovie");
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const seatContainer = document.getElementById("seatCont");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatElement = document.getElementById("numberOfSeat");
const cancelButton = document.getElementById("cancelBtn");
const proceedButton = document.getElementById("proceedBtn");

let selectedMovie = moviesList[0]; // Default movie selection
let selectedSeats = [];
let totalPrice = 0;

// Initialize dropdown menu with movie options
moviesList.forEach((movie, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = movie.movieName;
  selectMovie.appendChild(option);
});

// Function to update movie details
function updateMovieDetails() {
  movieNameElement.textContent = selectedMovie.movieName;
  moviePriceElement.textContent = `$ ${selectedMovie.price}`;
}

// Function to update the total price
function updateTotalPrice() {
  totalPriceElement.textContent = `$ ${totalPrice}`;
}

// Event listener for movie selection
selectMovie.addEventListener("change", () => {
  const selectedIndex = selectMovie.value;
  selectedMovie = moviesList[selectedIndex];
  updateMovieDetails();
  updateTotalPrice();
});

// Event listeners for seat selection
seatContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    const seatIndex = [...seatContainer.querySelectorAll(".seat")].indexOf(e.target);
    if (selectedSeats.includes(seatIndex)) {
      selectedSeats = selectedSeats.filter((seat) => seat !== seatIndex);
      totalPrice -= selectedMovie.price;
    } else {
      selectedSeats.push(seatIndex);
      totalPrice += selectedMovie.price;
    }
    updateSelectedSeats();
    updateTotalPrice();
  }
});

// Function to update selected seats
function updateSelectedSeats() {
  selectedSeatsHolder.innerHTML = "";
  if (selectedSeats.length === 0) {
    selectedSeatsHolder.innerHTML = '<span class="noSelected">No Seat Selected</span>';
  } else {
    selectedSeats.forEach((seatIndex) => {
      const seat = document.createElement("span");
      seat.classList.add("selectedSeat");
      seat.textContent = `Seat ${seatIndex + 1}`;
      selectedSeatsHolder.appendChild(seat);
    });
  }
  numberOfSeatElement.textContent = selectedSeats.length;
}

// Event listener for cancel button
cancelButton.addEventListener("click", () => {
  selectedSeats.forEach((seatIndex) => {
    seatContainer.querySelectorAll(".seat")[seatIndex].classList.remove("selected");
    seatContainer.querySelectorAll(".seat")[seatIndex].classList.remove("occupied");
  });
  selectedSeats = [];
  totalPrice = 0;
  updateSelectedSeats();
  updateTotalPrice();
});

// Event listener for proceed button
proceedButton.addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Oops! No seat selected.");
  } else {
    selectedSeats.forEach((seatIndex) => {
      seatContainer.querySelectorAll(".seat")[seatIndex].classList.remove("selected");
      seatContainer.querySelectorAll(".seat")[seatIndex].classList.add("occupied");
    });
    selectedSeats = [];
    totalPrice = 0;
    updateSelectedSeats();
    updateTotalPrice();
    alert("Yayy! Your seats have been booked.");
  }
});

// Initialize default movie details
updateMovieDetails();
updateTotalPrice();
updateSelectedSeats();
