// =========================
// MOBILE NAVIGATION
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// =========================
// CAR FILTERS
// =========================

const searchInput = document.getElementById("carSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const carCards = document.querySelectorAll(".car-card");


function filterCars() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedPrice = priceFilter.value;


    carCards.forEach(function (card) {

        const carName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();


        const carCategory = card
            .querySelector(".car-category")
            .textContent
            .toLowerCase()
            .trim();


        const priceText = card
            .querySelector(".car-price")
            .textContent;


        const carPrice = parseInt(
            priceText.replace(/[^0-9]/g, "")
        );


        // =========================
        // SEARCH CHECK
        // =========================

        const matchesSearch =
            carName.includes(searchValue);


        // =========================
        // CATEGORY CHECK
        // =========================

        const matchesCategory =
            selectedCategory === "all" ||
            carCategory === selectedCategory;


        // =========================
        // PRICE CHECK
        // =========================

        let matchesPrice = true;


        if (selectedPrice === "under-20000") {

            matchesPrice = carPrice < 20000;

        } else if (selectedPrice === "20000-35000") {

            matchesPrice =
                carPrice >= 20000 &&
                carPrice <= 35000;

        } else if (selectedPrice === "above-35000") {

            matchesPrice = carPrice > 35000;

        }


        // =========================
        // FINAL FILTER RESULT
        // =========================

        if (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// =========================
// SEARCH EVENT
// =========================

searchInput.addEventListener(
    "input",
    filterCars
);


// =========================
// CATEGORY EVENT
// =========================

categoryFilter.addEventListener(
    "change",
    filterCars
);


// =========================
// PRICE EVENT
// =========================

priceFilter.addEventListener(
    "change",
    filterCars
);
// =========================
// BOOKING FORM VALIDATION
// =========================

const bookingForm = document.getElementById("bookingForm");

const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const selectedCar = document.getElementById("selectedCar");

const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const carError = document.getElementById("carError");

const pickupError = document.getElementById("pickupError");
const returnError = document.getElementById("returnError");

const bookingSuccess = document.getElementById("bookingSuccess");


// =========================
// BOOKING SUBMIT
// =========================

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Clear previous messages

    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    carError.textContent = "";
    pickupError.textContent = "";
    returnError.textContent = "";

    bookingSuccess.textContent = "";


    let isValid = true;


    // =========================
    // NAME VALIDATION
    // =========================

    if (fullName.value.trim() === "") {

        nameError.textContent = "Please enter your name.";

        isValid = false;

    } else if (fullName.value.trim().length < 3) {

        nameError.textContent =
            "Name must be at least 3 characters.";

        isValid = false;
    }


    // =========================
    // PHONE VALIDATION
    // =========================

    const phonePattern = /^03[0-9]{9}$/;

    if (phone.value.trim() === "") {

        phoneError.textContent =
            "Please enter your contact number.";

        isValid = false;

    } else if (!phonePattern.test(phone.value.trim())) {

        phoneError.textContent =
            "Enter a valid number e.g. 03001234567.";

        isValid = false;
    }


    // =========================
    // EMAIL VALIDATION
    // =========================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    // =========================
    // CAR VALIDATION
    // =========================

    if (selectedCar.value === "") {

        carError.textContent =
            "Please select a car.";

        isValid = false;
    }


    // =========================
    // DATE VALIDATION
    // =========================

    if (pickupDate.value === "") {

        pickupError.textContent =
            "Please select a pickup date.";

        isValid = false;
    }


    if (returnDate.value === "") {

        returnError.textContent =
            "Please select a return date.";

        isValid = false;
    }


    // =========================
    // RETURN DATE CHECK
    // =========================

    if (
        pickupDate.value !== "" &&
        returnDate.value !== ""
    ) {

        const pickup = new Date(pickupDate.value);
        const returnDateValue = new Date(returnDate.value);


        if (returnDateValue < pickup) {

            returnError.textContent =
                "Return date cannot be before pickup date.";

            isValid = false;
        }
    }


    // =========================
    // SUCCESS MESSAGE
    // =========================

    if (isValid) {

        bookingSuccess.textContent =
            "Booking request submitted successfully!";

        bookingForm.reset();
    }

});