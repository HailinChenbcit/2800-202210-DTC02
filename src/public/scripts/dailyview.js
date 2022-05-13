async function deleteEntry() {
    entry_id = (this.id).slice(11)
    await $.ajax({
        url: `http://localhost:3000/dailyView/remove/${entry_id}`,
        type: "get",
        success: (e) => {
            console.log(e)
        }
    })
    // refresh div

}

async function saveEntry() {
    entry_id = (this.id).slice(4)
    await $.ajax({
        url: `http://localhost:3000/dailyView/update/${entry_id}`,
        type: "get",
        success: (e) => {
            console.log(e)
        }
    })
    // refresh div

}

$(document).ready(function () {
    $("body").on('click', '.deleteEntry', deleteEntry)
    $("body").on('click', '.saveEntry', saveEntry)

})