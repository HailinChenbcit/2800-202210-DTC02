let worryEntries;

// Initializes the user's mood bar graph
function initMoodBar(destChild, dataArr, xAxisArr) {
  const context = destChild.getContext("2d");
  const moodGraph = new Chart(context, {
    type: "bar",
    data: {
      labels: xAxisArr,
      datasets: [
        {
          label: "Number of moods you've been feeling",
          data: dataArr,
          backgroundColor: [
            "rgba(144, 98, 234, 1)",
            "rgba(144, 98, 234, 1)",
            "rgba(144, 98, 234, 1)",
            "rgba(144, 98, 234, 1)",
            "rgba(144, 98, 234, 1)",
          ],
          borderColor: [
            "rgba(106, 69, 165, 1)",
            "rgba(106, 69, 165, 1)",
            "rgba(106, 69, 165, 1)",
            "rgba(106, 69, 165, 1)",
            "rgba(106, 69, 165, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

// Initializes the user's mood line graph
function initMoodLine(destChild, dataArr, xAxisArr, yAxisMap) {
  const context = destChild.getContext("2d");
  const moodGraph = new Chart(context, {
    type: "line",
    data: {
      labels: xAxisArr,
      datasets: [
        {
          label: `Mood level`,
          data: dataArr,
          backgroundColor: "#CEB5FF",
          borderColor: "#6545a4",
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value, index, ticks) {
              return yAxisMap.get(value);
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            boxWidth: 0,
            boxHeight: 0,
          },
        },
      },
    },
  });
}

// Fetches all of the user's worry entries from the server
async function getWorryEntries() {
  const resp = await fetch("../../worryEntriesAll");
  const data = await resp.json();
  return data;
}

// Runs when the page has loaded and the worry entries data has been received
function setup() {
  const { times, moods, count } = processWorryEntries(worryEntries);

  const moodGraphCanvas = document.querySelector("#moodgraph");
  const canvasElement = document.getElementById("summaryBarGraph");

  const moodLevels = new Map();
  moodLevels.set(1, "????");
  moodLevels.set(2, "????");
  moodLevels.set(3, "????");
  moodLevels.set(4, "????");
  moodLevels.set(5, "????");

  // Initializes both graphs
  initMoodLine(moodGraphCanvas, moods, times, moodLevels);
  initMoodBar(canvasElement, count, Array.from(moodLevels.values()));
}

// Returns the average of an array of Numbers
function average(numArr) {
  let sum = 0;
  numArr.forEach((num) => (sum += num));
  return sum / numArr.length;
}

// Processes the data received from the server
function processWorryEntries(data) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let parsedData = new Map();
  let moodCount = new Map();
  for (let i = 1; i <= 5; i++) {
    moodCount.set(i, 0);
  }

  // Parses the data
  data
    .map((datum) => {
      moodCount.set(datum.moodLevel, moodCount.get(datum.moodLevel) + 1);
      let fmtDate = new Date(datum.datetime);
      return {
        date: `${months[fmtDate.getMonth()]} ${fmtDate.getDate()}`,
        mood: datum.moodLevel,
      };
    })
    .forEach((pair) => {
      if (parsedData.has(pair.date)) {
        parsedData.get(pair.date).push(pair.mood);
      } else {
        parsedData.set(pair.date, [pair.mood]);
      }
    });

  // Sorts the data map according to date 
  parsedData = new Map([...parsedData.entries()]
    .sort((a, b) => {
      let parsed2A = parseInt(a[0].substr(4));
      let parsed2B = parseInt(b[0].substr(4));

      return parsed2A - parsed2B;
    })
    .sort((a, b) => {
      let parsedA = months.indexOf(a[0].slice(0, 3));
      let parsedB = months.indexOf(b[0].slice(0, 3));
      return parsedA - parsedB;
    }));

  // Splits the parsed data into arrays ready for graphing
  let stamps = Array.from(parsedData.keys());
  let avgMoods = Array.from(parsedData.values(), (values) => average(values));
  let countMoods = Array.from(moodCount.values());

  return { times: stamps, moods: avgMoods, count: countMoods };
}

// Runs when the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  // Gets worry entries data from the server
  getWorryEntries().then((data) => {
    worryEntries = data;
    setup();
  });

  // Adds event handler for image upload event
  const avatarInput = document.querySelector("#avatar");
  avatarInput.style.opacity = 0;
  avatarInput.addEventListener("change", () => {
    const formdata = new FormData();
    formdata.append("avatar", avatarInput.files[0]);
    fetch("/avatarUpload", {
      method: "POST",
      body: formdata,
    }).then((data) => window.location.reload());
  });
});
