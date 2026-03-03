// NAV TOGGLE
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// HERO BUTTON
document.getElementById("heroBtn").addEventListener("click", () => {
    alert("Welcome to CloudDev Full Practical Project!");
});

// DYNAMIC YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// DYNAMIC FEATURES
const features = [
    "Fully Responsive Design",
    "API Integration",
    "Form Validation",
    "Dynamic Rendering"
];

const featureContainer = document.getElementById("featureContainer");

features.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("feature-card");
    div.textContent = item;
    featureContainer.appendChild(div);
});

// FORM VALIDATION
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "All fields are required!";
        formMessage.style.color = "red";
    } else {
        formMessage.textContent = "Form submitted successfully!";
        formMessage.style.color = "green";
        form.reset();
    }
});

// API FETCH
const fetchBtn = document.getElementById("fetchBtn");
const status = document.getElementById("status");
const dataList = document.getElementById("dataList");

fetchBtn.addEventListener("click", () => {
    status.textContent = "Loading data...";
    status.style.color = "blue";
    dataList.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then(data => {
            status.textContent = "Data fetched successfully!";
            status.style.color = "green";

            data.forEach(post => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
                dataList.appendChild(li);
            });
        })
        .catch(error => {
            status.textContent = "Error fetching data!";
            status.style.color = "red";
            console.error(error);
        });
});