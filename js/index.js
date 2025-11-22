/* ========================================= */
/*          تشغيل القائمة (Menu)             */
/* ========================================= */
let menuIcon = document.querySelector("#menu-item");
let navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };
}

/* ========================================= */
/*      الروابط النشطة وتثبيت الهيدر         */
/* ========================================= */
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        let target = document.querySelector("header nav a[href*=" + id + "]");
        if (target) target.classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  if (header) header.classList.toggle("sticky", window.scrollY > 100);

  if (menuIcon) menuIcon.classList.remove("bx-x");
  if (navbar) navbar.classList.remove("active");
};

/* ========================================= */
/*      انيميشن السكرول (ScrollReveal)       */
/* ========================================= */
try {
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(
      ".home-img, .services-container, .portfolio-box, .contact form",
      { origin: "bottom" }
    );
    ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
    ScrollReveal().reveal(".home-content p, .about-content", {
      origin: "right",
    });
    ScrollReveal().reveal(".footer", { origin: "bottom", delay: 500 });
  }
} catch (error) {
  console.error("خطأ في ScrollReveal:", error);
}

/* ========================================= */
/*      انيميشن الكتابة (Typed.js)           */
/* ========================================= */
try {
  if (
    typeof Typed !== "undefined" &&
    document.querySelector(".multiple-text")
  ) {
    const typed = new Typed(".multiple-text", {
      strings: ["Frontend Developer", "App Developer", "Sales"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  }
} catch (error) {
  console.error("خطأ في Typed.js:", error);
}

/* ========================================= */
/*      Send Data to Google Sheets           */
/* ========================================= */

// تأكد إن الرابط ده هو أحدث رابط عملتله Deploy
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxeHfgy60-hCLed1V_ox2WMawojyPGOkAnc_P2sqvi1m-7Xk9X4tDh-T2DoA2s81pK_WA/exec";

const sheetForm = document.forms["submit-to-google-sheet"];

if (sheetForm) {
  sheetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = sheetForm.querySelector('input[type="submit"]');
    if (submitBtn) submitBtn.value = "Sending...";

    fetch(scriptURL, { method: "POST", body: new FormData(sheetForm) })
      .then((response) => {
        alert("Success! I will contact you soon.");
        sheetForm.reset();
        if (submitBtn) submitBtn.value = "Let's Work Together";
      })
      .catch((error) => {
        console.error("Error!", error.message);
        // لو حصل خطأ، الرسالة دي هتظهرلك في الـ Console
        alert("Error! Check Console for details.");
        if (submitBtn) submitBtn.value = "Let's Work Together";
      });
  });
}
