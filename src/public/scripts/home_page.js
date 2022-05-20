// Back and forward month
let nav = 0;
// Calendar day select
let clicked = null;

const calendar = document.getElementById("calendar");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }
  // Get Values of the currrent day
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  // First day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  // To determine how many days there are in the month (the last day of the month)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Converting the values into date format with current weekday
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // "Padding days" = The weekdays that are not included in the begining and end of the month
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  // Display Current month and year
  document.getElementById(
    "monthDisplayTitle"
  ).innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;

  // Refresh the page for different month (so it doesn't append a different calendar to the current one)
  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayLink = document.createElement("a");
    dayLink.href = `/dailyView/${year}${String(month).padStart(2, "0")}${String(i - paddingDays).padStart(2, "0")}`;

    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.id = `${year}${month}${String(i).padStart(2, "0")}`;
      if (i - paddingDays === day && nav === 0) {
        daySquare.classList.add("currentDay");
      }
    } else {
      daySquare.classList.add("padding");
    }
    dayLink.appendChild(daySquare);
    calendar.appendChild(dayLink);
  }
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

initButtons();
load();
