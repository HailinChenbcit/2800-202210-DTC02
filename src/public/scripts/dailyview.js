const deleteEntryUrl = "http://localhost:3000/dailyView/remove/";
const worryCards = document.querySelectorAll(".worry-card");

const handleDelete = async (worryCard) => {
  worryCard.parentElement.removeChild(worryCard);
  await fetch(`${deleteEntryUrl}${worryCard.id}`, {
    method: "DELETE",
  });
};

worryCards.forEach((worryCard) => {
  worryCard.addEventListener("click", (e) => {
    console.log(e.target.className);
    switch (e.target.className) {
      case "deleteEntry btn secondary-primary":
        handleDelete(worryCard);
        break;
    }
  });
});

document.querySelectorAll(".editBtn").forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    window.location.href = `/edit/${editBtn.id}`
  })
})

// async function deleteEntry(e) {
//   e.preventDefault();
//   entry_id = this.id.slice(11);
//   const resp = await fetch(
//     `http://localhost:3000/dailyView/remove/${entry_id}`
//   );
//   console.log(this)
//   this.parentElement.parentElement.removeChild(this.parentElement);
// }

// async function saveEntry() {
//   entry_id = this.id.slice(4);
//   await $.ajax({
//     url: `http://localhost:3000/dailyView/update/${entry_id}`,
//     type: "get",
//     success: (e) => {
//       console.log(e);
//     },
//   });
//   // refresh div
// }

// $(document).ready(function () {
//   $("body").on("click", ".deleteEntry", deleteEntry);
//   $("body").on("click", ".saveEntry", saveEntry);
// });
