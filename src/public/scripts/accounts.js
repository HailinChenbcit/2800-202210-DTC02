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

// Reset Password button listener
function initResetBtn(btnID, user) {
    document.querySelector(`#${btnID}`).addEventListener("click", () => {
        console.log(`This function is doing something`)
    });
}

// Trash icon button listener
function initDelBtn(btnID, toRemove, removeFrom) {
    let index = btnID.substr(-1, 1);
    document.querySelector(`#${btnID}`).addEventListener("click", () => {
        userArr.splice(index, 1);
        removeFrom.removeChild(toRemove);
    });
}

// Three-dotted menu button listener
function initDotMenuBtn(btnID, users_container) {
    let btn = document.querySelector(`#${btnID}`);

    btn.addEventListener("click", () => {
        let users = [...users_container.getElementsByClassName("list-group-item")];
        // console.log(users);
        users.forEach((user) => {
            if (!user.querySelector(`#${btnID}`)) {
                user.querySelector(".collapse").classList.remove('show');
            }
        })
    });
}

// Check slider admin privileges button listener
function initSlider(btnID, usercell, user) {
    let btn = document.querySelector(`#${btnID}`);

    btn.querySelector(`.form-check-input`).addEventListener("click", () => {
        if (user.admin) {
            let admin_sect = usercell.querySelector(".admin-sect");
            admin_sect.classList.remove("badge");
            admin_sect.innerHTML = ``;
            user.admin = false;
        } else {
            let admin_sect = usercell.querySelector(".admin-sect");
            // console.log(btnID   )
            admin_sect.classList.add("badge");
            admin_sect.innerHTML = `Admin`;
            user.admin = true;
        }
    });
}

function populatePage(users) {
    let users_div = document.querySelector("#accounts-target");

    let i = 0;
    users.forEach((user) => {
        let email_sect = `<span class="email">${user.email}</span>`;
        let admin_sect = `<span class="bg-secondary admin-sect"></span>`;
        let autochecked = "";
        if (user.admin) {
            admin_sect = `<span class="badge bg-secondary admin-sect">Admin</span>`;
            autochecked = "checked";
        }

        let optionsbtn_sect = `<button type="button" class="btn" id="dotted${i}" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapseExample">
                                <span class="material-symbols-outlined">more_vert</span>
                               </button>`;
        
        let options_sect = `<div class="collapse" id="collapse${i}">
                                <div class="form-check form-switch" id="slidecheck${i}">
                                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault${i}" ${autochecked}>
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

        initResetBtn(`reset${i}`, user);
        initDelBtn(`del${i}`, single_cell, users_div, user);
        initSlider(`slidecheck${i}`, single_cell, user);
        initDotMenuBtn(`dotted${i}`, users_div);

        i++;
    })
}

function setupUserOptions() {
    const accounts = document.querySelector("#accounts-target");
    const accountsList = [...accounts.children]
    // console.log(accountsList);

    accountsList.forEach((user, i) => {
        console.log(user);
        // initResetBtn(`reset${i}`, user);
        // initDelBtn(`del${i}`, single_cell, users_div, user);
        // initSlider(`slidecheck${i}`, single_cell, user);
        initDotMenuBtn(`dotted${i}`, accounts);
    })
}

function setup() {
    // fetchUsers(); Get users from MongoDB database
    // populatePage(userArr);
    // initDotMenuBtn(`dotted1`, document.querySelector("#accounts-target"))
    // console.log();
    setupUserOptions();
}

document.addEventListener("DOMContentLoaded", setup);