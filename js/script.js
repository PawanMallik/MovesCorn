// let navbar = document.querySelector('.header .navbar');

// window.onscroll=()=>{
//     navbar.classList.remove('active');
//     if(window.scrollY>0){
//         document.querySelector('.header').classList.add('active');
//     }else{
//         document.querySelector('.header').classList.remove('active');
//     }
// };

document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("loggedIn")) {
        showMainPage();
    }
});

function showSignup() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("signup-box").style.display = "block";
}

function showLogin() {
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
}

function showMainPage() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("main-page").style.display = "block";
}



function signup() {
    let username = document.getElementById("signup-username").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let otp = document.getElementById("otp").value;

    if (!username || !email || !password || !otp) {
        alert("Please fill all fields.");
        return;
    }

    fetch("php/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "username=" + encodeURIComponent(username) +
            "&email=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password) +
            "&otp=" + encodeURIComponent(otp)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Signup successful! Redirecting...");
                window.location.href = "index.html"; // Redirect to login page
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            alert("Network error: " + error);
        });
}


function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if (username === "" || password === "") {
        alert("Please enter both username and password.");
        return;
    }

    fetch("php/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                window.location.href = "movie_request.html"; // Redirect after login
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            alert("Network error: " + error);
        });
}


function submitRequest() {
    let fullName = document.getElementById("full-name").value;
    let email = document.getElementById("request-email").value;
    let movieName = document.getElementById("movie-name").value;
    let note = document.getElementById("note").value;

    if (!fullName || !email || !movieName || !note) {
        alert("Please fill in all required fields.");
        return;
    }

    fetch("./php/submit_request.php", {  // Ensure 'php/' is correct
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "full_name=" + encodeURIComponent(fullName) +
              "&email=" + encodeURIComponent(email) +
              "&movie_name=" + encodeURIComponent(movieName) +
              "&note=" + encodeURIComponent(note)
    })
    
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Movie request submitted successfully!");
            document.getElementById("movie-request-form").reset();
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => {
        console.error("Request Error:", error);
        alert("Network error. Try again.");
    });
}


function showForgotPassword() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("forgot-password-box").style.display = "block";
}





function sendOTP() {
    let email = document.getElementById("signup-email").value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    fetch("php/send_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "email=" + encodeURIComponent(email)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("OTP sent successfully to your email.");
                document.getElementById("otp").style.display = "block";
                document.getElementById("verify-btn").style.display = "block";
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            alert("Network error: " + error);
        });
}


function sendForgotOTP() {
    let email = document.getElementById("forgot-email").value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    fetch("php/send_forgot_otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "email=" + encodeURIComponent(email)
    })
        .then(response => response.json()) // Convert to JSON
        .then(data => {
            if (data.status === "success") {
                alert("OTP sent! Check your email.");
                document.getElementById("forgot-otp").style.display = "block";
                document.getElementById("new-password").style.display = "block";
                document.getElementById("reset-btn").style.display = "block";
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            alert("Network error: Unable to send OTP. Check console for details.");
        });
}

function resetPassword() {
    let email = document.getElementById("forgot-email").value;
    let otp = document.getElementById("forgot-otp").value;
    let newPassword = document.getElementById("new-password").value;

    if (!email || !otp || !newPassword) {
        alert("All fields are required.");
        return;
    }

    fetch("php/reset_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "email=" + encodeURIComponent(email) +
            "&otp=" + encodeURIComponent(otp) +
            "&new_password=" + encodeURIComponent(newPassword)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Password reset successful! Redirecting to login...");
                window.location.href = "index.html"; // Redirect to login page
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            alert("Network error: " + error);
        });
}

function logout() {
    fetch("php/logout.php", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Logged out successfully!");
                window.location.href = "index.html"; // Redirect to login
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error("Logout Error:", error);
            alert("Network error. Try again.");
        });
}


