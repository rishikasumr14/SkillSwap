/* =========================================================
   SKILLSWAP - COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   SIGN UP
========================================================= */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                .value
                .trim();


            const email =
                document.getElementById("signupEmail")
                .value
                .trim();


            const password =
                document.getElementById("signupPassword")
                .value;


            const teachSkill =
                document.getElementById("teachSkill")
                .value
                .trim();


            const learnSkill =
                document.getElementById("learnSkill")
                .value
                .trim();


            if (
                name === "" ||
                email === "" ||
                password === "" ||
                teachSkill === "" ||
                learnSkill === ""
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;
            }


            const user = {

                name: name,

                email: email,

                password: password,

                teachSkill: teachSkill,

                learnSkill: learnSkill

            };


            localStorage.setItem(
                "skillSwapUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "isLoggedIn",
                "false"
            );


            alert(
                "Account created successfully! 🎉"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById("email")
                .value
                .trim();


            const password =
                document.getElementById("password")
                .value;


            const savedUser =
                localStorage.getItem(
                    "skillSwapUser"
                );


            if (!savedUser) {

                alert(
                    "No account found. Please create an account first."
                );

                window.location.href =
                    "signup.html";

                return;
            }


            let user;


            try {

                user =
                    JSON.parse(savedUser);

            }

            catch (error) {

                localStorage.removeItem(
                    "skillSwapUser"
                );

                alert(
                    "Account data was corrupted. Please create your account again."
                );

                window.location.href =
                    "signup.html";

                return;
            }


            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                alert(
                    "Login successful! 🎉"
                );


                window.location.href =
                    "dashboard.html";

            }

            else {

                alert(
                    "Incorrect email or password."
                );

            }

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );


    window.location.href =
        "index.html";

}


/* =========================================================
   PROFILE
========================================================= */

function loadProfile() {

    const savedUser =
        localStorage.getItem(
            "skillSwapUser"
        );


    if (!savedUser) {
        return;
    }


    const user =
        JSON.parse(savedUser);


    const profileName =
        document.getElementById(
            "profileName"
        );


    const profileEmail =
        document.getElementById(
            "profileEmail"
        );


    const teachSkillDisplay =
        document.getElementById(
            "teachSkillDisplay"
        );


    const learnSkillDisplay =
        document.getElementById(
            "learnSkillDisplay"
        );


    if (profileName) {

        profileName.textContent =
            user.name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            user.email;

    }


    if (teachSkillDisplay) {

        teachSkillDisplay.textContent =
            user.teachSkill;

    }


    if (learnSkillDisplay) {

        learnSkillDisplay.textContent =
            user.learnSkill;

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function loadDashboard() {

    const savedUser =
        localStorage.getItem(
            "skillSwapUser"
        );


    if (!savedUser) {
        return;
    }


    const user =
        JSON.parse(savedUser);


    const dashboardName =
        document.getElementById(
            "dashboardName"
        );


    const dashboardTeachSkill =
        document.getElementById(
            "dashboardTeachSkill"
        );


    const dashboardLearnSkill =
        document.getElementById(
            "dashboardLearnSkill"
        );


    const myTeachSkill =
        document.getElementById(
            "myTeachSkill"
        );


    const myLearnSkill =
        document.getElementById(
            "myLearnSkill"
        );


    const dashboardRequests =
        document.getElementById(
            "dashboardRequests"
        );


    if (dashboardName) {

        dashboardName.textContent =
            user.name;

    }


    if (dashboardTeachSkill) {

        dashboardTeachSkill.textContent =
            user.teachSkill;

    }


    if (dashboardLearnSkill) {

        dashboardLearnSkill.textContent =
            user.learnSkill;

    }


    if (myTeachSkill) {

        myTeachSkill.textContent =
            user.teachSkill;

    }


    if (myLearnSkill) {

        myLearnSkill.textContent =
            user.learnSkill;

    }


    const requests =
        JSON.parse(
            localStorage.getItem(
                "skillRequests"
            )
        ) || [];


    if (dashboardRequests) {

        dashboardRequests.textContent =
            requests.length;

    }

}


/* =========================================================
   GO TO DASHBOARD
========================================================= */

function goToDashboard() {

    window.location.href =
        "dashboard.html";

}


/* =========================================================
   VIDEO PREVIEW
========================================================= */

const teachingVideo =
    document.getElementById(
        "teachingVideo"
    );


const videoPreview =
    document.getElementById(
        "videoPreview"
    );


if (
    teachingVideo &&
    videoPreview
) {

    teachingVideo.addEventListener(
        "change",
        function () {

            const file =
                teachingVideo.files[0];


            if (!file) {

                videoPreview.innerHTML =
                    "<p>No video selected.</p>";

                return;
            }


            if (
                !file.type.startsWith(
                    "video/"
                )
            ) {

                alert(
                    "Please select a valid video file."
                );


                teachingVideo.value =
                    "";


                videoPreview.innerHTML =
                    "<p>No video selected.</p>";


                return;
            }


            const videoURL =
                URL.createObjectURL(
                    file
                );


            videoPreview.innerHTML = `

                <p>
                    <strong>
                        Video Preview 🎥
                    </strong>
                </p>

                <video
                    src="${videoURL}"
                    controls>
                </video>

            `;

        }
    );

}


/* =========================================================
   OFFER A SKILL
========================================================= */

const offerForm =
    document.getElementById(
        "offerForm"
    );


if (offerForm) {

    offerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const savedUser =
                localStorage.getItem(
                    "skillSwapUser"
                );


            if (!savedUser) {

                alert(
                    "Please create an account first."
                );


                window.location.href =
                    "login.html";


                return;
            }


            const user =
                JSON.parse(savedUser);


            const offeredSkill =
                document.getElementById(
                    "offeredSkill"
                )
                .value
                .trim();


            const skillCategory =
                document.getElementById(
                    "skillCategory"
                )
                .value;


            const skillDescription =
                document.getElementById(
                    "skillDescription"
                )
                .value
                .trim();


            const experienceLevel =
                document.getElementById(
                    "experienceLevel"
                )
                .value;


            const videoInput =
                document.getElementById(
                    "teachingVideo"
                );


            let videoName = "";


            if (
                videoInput &&
                videoInput.files.length > 0
            ) {

                videoName =
                    videoInput.files[0].name;

            }


            if (
                offeredSkill === "" ||
                skillCategory === "" ||
                skillDescription === "" ||
                experienceLevel === ""
            ) {

                alert(
                    "Please fill all skill details."
                );


                return;
            }


            const skill = {

                id:
                    Date.now(),

                name:
                    offeredSkill,

                category:
                    skillCategory,

                description:
                    skillDescription,

                experience:
                    experienceLevel,

                teacher:
                    user.name,

                video:
                    videoName

            };


            let skills =
                JSON.parse(
                    localStorage.getItem(
                        "offeredSkills"
                    )
                ) || [];


            skills.push(skill);


            localStorage.setItem(
                "offeredSkills",
                JSON.stringify(
                    skills
                )
            );


            alert(
                "Your skill has been added successfully! 🎉"
            );


            window.location.href =
                "skills.html";

        }
    );

}


/* =========================================================
   DISPLAY STUDENT SKILLS
========================================================= */

function displayStudentSkills() {

    const skillsContainer =
        document.getElementById(
            "skillsContainer"
        );


    if (!skillsContainer) {
        return;
    }


    const skills =
        JSON.parse(
            localStorage.getItem(
                "offeredSkills"
            )
        ) || [];


    skills.forEach(
        function (skill) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "skill-card";


            card.setAttribute(
                "data-skill",
                skill.name
            );


            let videoInfo = "";


            if (skill.video) {

                videoInfo = `

                    <p class="video-name">

                        🎥 Teaching Video:
                        ${escapeHTML(skill.video)}

                    </p>

                `;

            }


            card.innerHTML = `

                <h2>
                    ${escapeHTML(skill.name)}
                </h2>

                <p>

                    <strong>
                        Category:
                    </strong>

                    ${escapeHTML(skill.category)}

                </p>

                <p>

                    ${escapeHTML(
                        skill.description
                    )}

                </p>

                <p>

                    <strong>
                        Experience:
                    </strong>

                    ${escapeHTML(
                        skill.experience
                    )}

                </p>

                <p>

                    <strong>
                        Teacher:
                    </strong>

                    ${escapeHTML(
                        skill.teacher
                    )}

                </p>

                ${videoInfo}

                <button
                    class="primary-btn request-skill-btn"
                    type="button">

                    Request Skill

                </button>

            `;


            const button =
                card.querySelector(
                    ".request-skill-btn"
                );


            button.addEventListener(
                "click",
                function () {

                    requestSkill(
                        skill.name,
                        skill.teacher
                    );

                }
            );


            skillsContainer.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SEARCH SKILLS
========================================================= */

function searchSkills() {

    const searchInput =
        document.getElementById(
            "skillSearch"
        );


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".skill-card"
        );


    cards.forEach(
        function (card) {

            const text =
                card.innerText
                    .toLowerCase();


            if (
                text.includes(
                    searchText
                )
            ) {

                card.style.display =
                    "block";

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   REQUEST SKILL
========================================================= */

function requestSkill(
    skill,
    teacher
) {

    const savedUser =
        localStorage.getItem(
            "skillSwapUser"
        );


    if (!savedUser) {

        alert(
            "Please create an account first."
        );


        window.location.href =
            "login.html";


        return;
    }


    const user =
        JSON.parse(savedUser);


    let requests =
        JSON.parse(
            localStorage.getItem(
                "skillRequests"
            )
        ) || [];


    const request = {

        id:
            Date.now(),

        skill:
            skill,

        teacher:
            teacher,

        requester:
            user.name,

        status:
            "Pending"

    };


    requests.push(
        request
    );


    localStorage.setItem(
        "skillRequests",
        JSON.stringify(
            requests
        )
    );


    alert(
        "Skill request sent successfully! 🎉"
    );

}


/* =========================================================
   DISPLAY REQUESTS
========================================================= */

function displayRequests() {

    const container =
        document.getElementById(
            "requestsContainer"
        );


    if (!container) {
        return;
    }


    const requests =
        JSON.parse(
            localStorage.getItem(
                "skillRequests"
            )
        ) || [];


    container.innerHTML =
        "";


    if (requests.length === 0) {

        container.innerHTML =
            "<p>No skill requests yet.</p>";

        return;
    }


    requests.forEach(
        function (request) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "request-card";


            card.innerHTML = `

                <h3>

                    ${escapeHTML(
                        request.skill
                    )}

                </h3>


                <p>

                    Requested by:

                    <strong>

                        ${escapeHTML(
                            request.requester
                        )}

                    </strong>

                </p>


                <p>

                    Teacher:

                    <strong>

                        ${escapeHTML(
                            request.teacher
                        )}

                    </strong>

                </p>


                <p>

                    Status:

                    <strong>

                        ${escapeHTML(
                            request.status
                        )}

                    </strong>

                </p>


                ${
                    request.status === "Pending"

                    ?

                    `

                    <button
                        class="primary-btn"
                        onclick="updateRequest(
                            ${request.id},
                            'Accepted'
                        )">

                        Accept

                    </button>


                    <button
                        class="secondary-btn"
                        onclick="updateRequest(
                            ${request.id},
                            'Rejected'
                        )">

                        Reject

                    </button>

                    `

                    :

                    ""

                }

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   UPDATE REQUEST
========================================================= */

function updateRequest(
    id,
    status
) {

    let requests =
        JSON.parse(
            localStorage.getItem(
                "skillRequests"
            )
        ) || [];


    requests =
        requests.map(
            function (request) {

                if (
                    request.id === id
                ) {

                    request.status =
                        status;

                }


                return request;

            }
        );


    localStorage.setItem(
        "skillRequests",
        JSON.stringify(
            requests
        )
    );


    displayRequests();

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProfile();

        loadDashboard();

        displayStudentSkills();

        displayRequests();

    }
);