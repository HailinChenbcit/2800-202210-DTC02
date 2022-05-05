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
        email: "bill@eggonomics.tv",
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

function initResetBtn(btnID) {
    document.querySelector(`#${btnID}`).addEventListener("touchend", () => {
        // console.log(`pushed ${btnID}`)
    });
}

function initDelBtn(btnID) {
    document.querySelector(`#${btnID}`).addEventListener("touchend", () => {
        // console.log(`pushed ${btnID}`)
    });
}

function initDotMenuBtn(btnID, container) {
    let btn = document.querySelector(`#${btnID}`);
    btn.addEventListener("touchend", () => {
        let users = [...container.getElementsByClassName("list-group-item")];
        // console.log(users);
        users.forEach((user) => {
            console.log(user.querySelector(`#${btnID}`), btnID);
            if (!user.querySelector(`#${btnID}`)) {
                user.querySelector(".collapse").classList.remove('show');
            }
        })
    });
}

function initSlider(btnID) {
    document.querySelector(`#${btnID}`).addEventListener("touchend", () => {
        // console.log(`pushed ${btnID}`)
    });
}

function populatePage(users) {
    let users_div = document.querySelector("#accounts-target");

    let i = 0;
    users.forEach((user) => {
        let email_sect = `<span class="email">${user.email}</span>`;
        let admin_sect = ``;
        if (user.admin) {
            admin_sect = `<span class="badge bg-secondary">Admin</span>`;
        }

        let optionsbtn_sect = `<button type="button" class="btn" id="dotted${i}" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapseExample">
                                <span class="material-symbols-outlined">more_vert</span>
                               </button>`;
        
        let options_sect = `<div class="collapse" id="collapse${i}">
                                <div class="form-check form-switch">
                                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault${i}">
                                  <label class="form-check-label" for="flexSwitchCheckDefault${i}">Admin Privileges</label>
                                </div>
                                <button type="button" class="btn btn-reset" id="reset${i}">Reset Password</button>
                                <button type="button" class="btn btn-del" id="del${i}">
                                    <span class="material-symbols-outlined">delete</span>
                                </button>
                            </div>`;
        
        let single_cell = document.createElement("LI");
        single_cell.classList.add("list-group-item");
        single_cell.innerHTML = `<div class="singlecell">${email_sect + admin_sect + optionsbtn_sect + options_sect}</div>`;

        users_div.appendChild(single_cell);
        console.log(single_cell.querySelector(`#reset${i}`));

        initResetBtn(`reset${i}`);
        initDelBtn(`del${i}`);
        initDotMenuBtn(`dotted${i}`, users_div);
        initSlider(`flexSwitchCheckDefault${i}`);

        i++;
    })
}

function setup() {
    // fetchUsers(); Get users from MongoDB database
    populatePage(userArr);
}

document.addEventListener("DOMContentLoaded", setup);