function initMoodGraph(destChild, dataArr, xAxisArr, yAxisMap) {
    const context = destChild.getContext('2d');
    const moodGraph = new Chart(context, {
        type: 'line',
        data: {
            labels: xAxisArr,
            datasets: [{
                label: `January mood level`,
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
                        callback: function(value, index, ticks) {
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

function setup() {
    const moodGraphCanvas = document.querySelector("#moodgraph");

    const moodLevels = new Map();
    moodLevels.set(1, "😰");
    moodLevels.set(2, "🙁");
    moodLevels.set(3, "😐");
    moodLevels.set(4, "🙂");
    moodLevels.set(5, "😃");

    const times = [23, 24, 25, 26, 27, 28, 29, 30, 31];
    const sampleData = [3, 3, 5, 4, 1, 1, 4, 4, 5];
    initMoodGraph(moodGraphCanvas, sampleData, times, moodLevels);
}

document.addEventListener("DOMContentLoaded", setup);