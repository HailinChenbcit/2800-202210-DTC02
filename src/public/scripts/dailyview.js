const deleteEntryUrl = "https://aqueous-brook-37004.herokuapp.com/dailyView/remove/";
const worryCards = document.querySelectorAll(".worry-card");

// Handles the deletion of the given worryCard
const handleDelete = async (worryCard) => {
  worryCard.parentElement.removeChild(worryCard);
  await fetch(`/dailyView/remove/${worryCard.id}`, {
    method: "DELETE",
  });
};

// Adds delete button functionalities for each worry card in the daily view page
worryCards.forEach((worryCard) => {
  worryCard.addEventListener("click", (e) => {
    switch (e.target.className) {
      case "btn btn-primary confirmDeletion":

        // Closes the Bootstrap modal using JS
        let worryCardModal = worryCard.querySelector(".modal");
        let worryCardModalComponent = new bootstrap.Modal(worryCardModal);

        worryCardModal.addEventListener('hidden.bs.modal', () => {
          handleDelete(worryCard);
        });
        worryCardModalComponent.hide();
        break;
    }
  });
});

// Adds edit button functionalities for each worry card in the daily view page
document.querySelectorAll(".editBtn").forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    window.location.href = `/editWorryEntry/${editBtn.id}`;
  });
});