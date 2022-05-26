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

const emojis = {
  1: "&#128549;",
  2: "&#128542;",
  3: "&#128563;",
  4: "&#128522;",
  5: "&#128513;",
  6: "&#9675;",
};

let worryEntries;

// Displaying and hiding worry time button
function hideLoading() {
  const loadingWheel = document.querySelector(".loading");
  if (loadingWheel) {
    loadingWheel.classList.add("hidden");
  }
}

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

  const addOneDay = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  let today = firstDayOfMonth;

  // Linked the day to the worries created on that day
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayLink = document.createElement("a");
    dayLink.href = `/dailyView/${year}${String(month).padStart(2, "0")}${String(
      i - paddingDays
    ).padStart(2, "0")}`;

    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      const oneDayAhead = addOneDay(today);
      const entriesOfTheDay = worryEntries.filter(
        (entry) =>
          new Date(entry.datetime) > today &&
          new Date(entry.datetime) < oneDayAhead
      );

      // Average mood levels
      if (entriesOfTheDay.length > 0) {
        const avgMoodLevel = entriesOfTheDay.reduce(
          (avg, entry, _, { length }) => {
            return avg + entry.moodLevel / length;
          },
          0
        );
        const roundedMoodLevel = Math.round(avgMoodLevel);
        daySquare.innerHTML = `<div> ${i - paddingDays} </div> <div> ${
          emojis[roundedMoodLevel]
        } </div>`;
      } else {
        daySquare.innerHTML = `<div> ${
          i - paddingDays
        } </div> <div> &#9675; </div>`;
      }

      // Identifying the current day
      daySquare.id = `${year}${month}${String(i).padStart(2, "0")}`;
      if (i - paddingDays === day && nav === 0) {
        daySquare.classList.add("currentDay");
      }
      today = oneDayAhead;
    } else {
      daySquare.classList.add("padding");
    }
    dayLink.appendChild(daySquare);
    calendar.appendChild(dayLink);
  }
}

async function setup() {
  const resp = await fetch("/worryEntriesAll");
  worryEntries = await resp.json();

  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  hideLoading();
  load();
}

setup();
