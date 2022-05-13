let worryEntries;

function initMoodBar(destChild, dataArr, xAxisArr) {
    const context = destChild.getContext('2d');
    const moodGraph = new Chart(context, {
        type: "bar",
        data: {
            labels: xAxisArr,
            datasets: [
                {
                    label: "Number of moods you've been feeling",
                    data: dataArr,
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
    })
}

function initMoodLine(destChild, dataArr, xAxisArr, yAxisMap) {
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

// var summaryBarGraph = new Chart(canvasElement, config)

async function getWorryEntries() {
    const resp = await fetch('../../worryEntriesAll')
    const data = await resp.json()
    return data
}

function setup() {
    const {times, moods, count} = processWorryEntries(worryEntries)

    const moodGraphCanvas = document.querySelector("#moodgraph");

    const moodLevels = new Map();
    moodLevels.set(1, "😰");
    moodLevels.set(2, "🙁");
    moodLevels.set(3, "😐");
    moodLevels.set(4, "🙂");
    moodLevels.set(5, "😃");

    initMoodLine(moodGraphCanvas, moods, times, moodLevels);
    initMoodBar(canvasElement, count, ["😰", "🙁", "😐", "🙂", "😃"])
}

function average(numArr) {
    let sum = 0;
    numArr.forEach(num => sum+=num)
    return sum / numArr.length
}

function processWorryEntries(data) {
    let parsedData = new Map()
    let moodCount = new Map()
    for (let i = 1; i <= 5; i++) {
        moodCount.set(i, 0)
    }

    data.map((datum) => {
        moodCount.set(datum.moodLevel, moodCount.get(datum.moodLevel) + 1)
        return { date: datum.datetime.split("T")[0], mood: datum.moodLevel }
    }).forEach((pair) => {
        if (parsedData.has(pair.date)) {
            parsedData.get(pair.date).push(pair.mood)
        } else {
            parsedData.set(pair.date, [pair.mood])
        }
    })

    let stamps = Array.from(parsedData.keys(), key => key.substr(-2))
    let avgMoods = Array.from(parsedData.values(), values => average(values))
    let countMoods = Array.from(moodCount.values())

    return {times: stamps, moods: avgMoods, count: countMoods}


    // for (const x of parsedData.entries()) {
        
    // }
    
    // parsedData.forEach((value, key) => {
    //     console.log(value)
    //     console.log(`${key}: ${average(value)}`)
    // })

}

document.addEventListener("DOMContentLoaded", getWorryEntries().then((data) => {
    worryEntries = data;
    setup()
}));