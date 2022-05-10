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

/**
 * Sets up each user accounts event listeners.
 */
function setupUserOptions() {
    const accounts = document.querySelector("#accounts-target");
    const accountsList = [...accounts.children];

    accountsList.forEach((userElement, i) => {
        initDotMenuBtn(`dotted${i}`, accounts);
    })
}

function setup() {
    setupUserOptions();
}

document.addEventListener("DOMContentLoaded", setup);