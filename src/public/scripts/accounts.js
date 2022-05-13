/**
 * Initializes the reset password button of a user account element.
 * @param {*} btnID the id of the reset password button
 * @param {*} user the JSON object of the user to reset the password of 
 */
function initResetBtn(btnID, user) {
    document.querySelector(`#${btnID}`).addEventListener("click", () => {
        console.log(`This function is doing something`)
    });
}

/**
 * Initializes the delete button of a user account element.
 * @param {*} btnID the id of the delete button
 * @param {*} toRemove the DOM element of the user account element to remove
 * @param {*} removeFrom the parent DOM element of the user account to remove
 */
function initDelBtn(btnID, toRemove, removeFrom) {
    let index = btnID.substr(-1, 1);
    document.querySelector(`#${btnID}`).addEventListener("click", () => {
        userArr.splice(index, 1);
        removeFrom.removeChild(toRemove);
    });
}

/**
 * Initializes the kebab button functionality.
 * @param {*} btnID the id of the kebab button
 * @param {*} users_container the DOM element containing all of the user account elements
 */
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

/**
 * Initializes the admin slider functionality.
 * @param {*} btnID the id of the slider
 * @param {*} usercell the DOM element of this user account
 * @param {*} user the JSON object of this user
 */
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
 * Sets up event listeners of every user account displayed.
 */
function setupUserOptions() {
    const accounts = document.querySelector("#accounts-target");
    const accountsList = [...accounts.children];

    accountsList.forEach((userElement, i) => {
        initDotMenuBtn(`dotted${i}`, accounts);
    })

    const backBtn = document.querySelector("#back");
    backBtn.addEventListener('click', () => {
        window.location.href = '/profile'
    })
}

/**
 * Gets called when the frontend display has finished loading.
 */
function setup() {
    setupUserOptions();
}

document.addEventListener("DOMContentLoaded", setup);