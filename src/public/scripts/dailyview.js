const deleteEntryUrl = "https://aqueous-brook-37004.herokuapp.com/dailyView/remove/";
const worryCards = document.querySelectorAll(".worry-card");

const handleDelete = async (worryCard) => {
  worryCard.parentElement.removeChild(worryCard);
  await fetch(`/dailyView/remove/${worryCard.id}`, {
    method: "DELETE",
  });
};

worryCards.forEach((worryCard) => {
  worryCard.addEventListener("click", (e) => {
    switch (e.target.className) {
      case "btn btn-primary confirmDeletion":
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

document.querySelectorAll(".editBtn").forEach((editBtn) => {
  editBtn.addEventListener("click", () => {
    window.location.href = `/edit/${editBtn.id}`
  })
})