let worryEntries;

function initMoodGraph(destChild, dataArr, xAxisArr, yAxisMap) {
    const context = destChild.getContext('2d');
    const moodGraph = new Chart(context, {
        type: 'line',
        data: {
            labels: xAxisArr,
            datasets: [{
                label: `Mood level`,
                data: dataArr,
                backgroundColor: '#CEB5FF',
                borderColor: '#6545a4',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return yAxisMap.get(value);
                        }
                    }

                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 0,
                        boxHeight: 0
                    }
                }
            }
        }
    })
}

var canvasElement = document.getElementById("summaryBarGraph");
var config = {
    type: "bar",
    data: {
        labels: ["😰", "🙁", "😐", "🙂", "😃"],
        datasets: [
            {
                label: "Number of moods you've been feeling",
                data: [1, 2, 5, 10, 4],
                backgroundColor: [
                    'rgba(144, 98, 234, 1)',
                    'rgba(144, 98, 234, 1)',
                    'rgba(144, 98, 234, 1)',
                    'rgba(144, 98, 234, 1)',
                    'rgba(144, 98, 234, 1)',
                ],
                borderColor: [
                    'rgba(106, 69, 165, 1)',
                    'rgba(106, 69, 165, 1)',
                    'rgba(106, 69, 165, 1)',
                    'rgba(106, 69, 165, 1)',
                    'rgba(106, 69, 165, 1)',
                ],
                borderWidth: 1,

            },
        ],
    },
}

// var summaryBarGraph = new Chart(canvasElement, config)

async function getWorryEntries() {
    const resp = await fetch('../../worryEntriesAll')
    const data = await resp.json()
    return data
}

function setup() {

    const moodGraphCanvas = document.querySelector("#moodgraph");

    const moodLevels = new Map();
    moodLevels.set(1, "😰");
    moodLevels.set(2, "🙁");
    moodLevels.set(3, "😐");
    moodLevels.set(4, "🙂");
    moodLevels.set(5, "😃");

    const times = [6, 7, 8, 9, 10, 11, 12];
    const sampleData = [3.4, 3.2, 5.0, 4.9, 1.4, 1.4, 4.5];
    // initMoodGraph(moodGraphCanvas, sampleData, times, moodLevels);
        /* let val be the array of mood entries...
         * group every val that has the same day
         * for every day group, get the average mood level
         * then for every average mood level of a day is a point in the mood graph
         */
}

function processWorryEntries(data) {
    let parsedData = new Map()

    data.map((datum) => {
        return { date: datum.datetime.split("T")[0], mood: datum.moodLevel }
    }).forEach((pair) => {
        console.log(pair)
        if (groupedData.has(pair.date)) {
            groupedData.get(pair.date).push(pair.mood)
        } else {
            groupedData.set(pair.date, [pair.mood])
        }
    })


    console.log(parsedData)

}

document.addEventListener("DOMContentLoaded", getWorryEntries().then((data) => {
    worryEntries = processWorryEntries(data);
    setup()
}));