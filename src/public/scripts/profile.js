const moodLevel = new Map();
moodLevel.set(1, "😰")
moodLevel.set(2, "🙁")
moodLevel.set(3, "😐")
moodLevel.set(4, "🙂")
moodLevel.set(5, "😃")

function initMoodGraph(dest) {
    const context = dest.getContext('2d');
    const moodGraph = new Chart(context, {
        type: 'line',
        data: {
            labels: [`Jan 23`, `Jan 24`, `Jan 25`, `Jan 26`, `Jan 27`, `Jan 28`, `Jan 29`],
            datasets: [{
                label: `Your personal mood levels this month`,
                data: [3, 3, 5, 4, 1, 1, 4],
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
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return moodLevel.get(value);
                        }
                    }
                    
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    })
}

function setup() {
    const moodGraphCanvas = document.querySelector("#moodgraph");
    initMoodGraph(moodGraphCanvas);
}

document.addEventListener("DOMContentLoaded", setup);