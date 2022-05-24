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


function initSlider(row) {
    const toggle = row.querySelector(".form-check-input")
    const email = row.querySelector(".email").innerHTML.trim()

    console.log(toggle);

    toggle.addEventListener("click", () => {
        console.log("CLICK")

        $.ajax({
           url: `/admin/toggleStatus/${email}`,
           method: "get", 
           success: () => {
               window.location.href = "/accounts"
           }
        })
    })
}

/**
 * Sets up event listeners of every user account displayed.
 */
function setupUserOptions() {
    const accounts = document.querySelector("#accounts-target");
    const accountsList = [...accounts.children];

    accountsList.forEach((userElement, i) => {
        initDotMenuBtn(`dotted${i}`, accounts);
        initSlider(userElement)
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