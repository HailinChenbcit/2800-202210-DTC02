// Sample Database
const userArr = [
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "jalfonsclarito@gmail.com",
        admin: true
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "jimmy123@gmail.com",
        admin: true
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "phil_dunphy@hotmail.com",
        admin: false
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "johndoe@my.bcit.ca",
        admin: false
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "jeremywang@google.ca",
        admin: false
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "lud_win@google.com",
        admin: false
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "jake_park21212121212121212121212121212@yahoo.com",
        admin: true
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "ramendestroyer1111111111111111111@canada.gov.ca",
        admin: false
    },
    {
        firstname: "Fonse",
        lastname: "Clarito",
        email: "aimer@google.jp",
        admin: false
    }
]

function populatePage(users) {
    let users_div = document.querySelector("#accounts-target");

    let i = 0;
    users.forEach((user) => {
        let email_sect = `<span class="email">${user.email}</span>`;
        let admin_sect = ``;
        if (user.admin) {
            admin_sect = `<span class="badge bg-secondary h-50">Admin</span>`;
        }

        let options_sect = `<button type="button" class="btn" id=${i}>
                            <span class="material-symbols-outlined">more_vert</span>
                            </button>`;
        
        let single_cell = document.createElement("LI");
        single_cell.classList.add("list-group-item");
        single_cell.innerHTML = `<div class="singlecell">${email_sect + admin_sect + options_sect}</div>`;

        users_div.appendChild(single_cell);
        i++;
    })
}

function setup() {
    // fetchUsers(); Get users from MongoDB database
    populatePage(userArr);
}

document.addEventListener("DOMContentLoaded", setup);