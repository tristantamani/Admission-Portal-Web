document.addEventListener("DOMContentLoaded", () => {
    const nextButton = document.getElementById('nextBtn'); // Next button
    const goBackButton = document.getElementById('goBackBtn'); // Go Back button
    const form = document.querySelector('form'); // Form reference
    const pageName = window.location.pathname.split("/").pop(); // Get current page name
    let formData = {};
    const searchButton = document.querySelector('.btn[data-bs-target="#privacyModal"]');

    if (pageName === "welcome.html") {
        const privacyModal = new bootstrap.Modal(document.getElementById('privacyModal'), {
            backdrop: 'static', // Prevent closing the modal by clicking outside
            keyboard: false // Prevent closing the modal with the Escape key
        });
        privacyModal.show(); // Show the modal
    }

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const modal = new bootstrap.Modal(document.getElementById('privacyModal'));
            modal.show();
        });
    }

    // Attach Next Button Logic for both tabs
    nextButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission and page reload
    
        // Validate only required fields
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach((field) => {
            if (!field.checkValidity()) {
                isValid = false; // If any required field is invalid
            }
        });
    
        if (isValid) {
            form.classList.remove("was-validated"); // Clear validation classes
    
            // Save form data to localStorage
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
    
            // Log the form data to console to verify
            console.log('Form Data to Store:', formObject);
    
            // Store form data for each page
            if (pageName === "applicant.html") {
                localStorage.setItem('applicantForm', JSON.stringify(formObject));
            } else if (pageName === "contact.html") {
                localStorage.setItem('contactForm', JSON.stringify(formObject));
            } else if (pageName === "confirmation.html") {
                localStorage.setItem('confirmationForm', JSON.stringify(formObject));
            }
    
            // Go to the next tab or page
            if (pageName === "applicant.html") {
                window.location.href = "contact.html"; // Go to contact page
            } else if (pageName === "contact.html") {
                window.location.href = "prevschool.html"; // Go to prevschool page
            } else if (pageName === "prevschool.html") {
                window.location.href = "confirmation.html"; // Go to confirmation page
            } else if (pageName === "confirmation.html") {
                window.location.href = "submit.html"; // Go to confirmation page
            }
        } else {
            form.classList.add("was-validated"); // Mark the form as validated
            alert("Please review your entries. Ensure all fields are filled out");
        }
    });    

    // Attach Go Back Button Logic (simulating browser's back button behavior)
    goBackButton.addEventListener("click", () => {
        event.preventDefault();
        window.history.back(); // This goes back to the previous page in the session history
    });

    // Populate data for 'submit.html'
    if (pageName === "submit.html") {
        const applicantData = JSON.parse(localStorage.getItem('applicantForm')) || {};
        const contactData = JSON.parse(localStorage.getItem('contactForm')) || {};
        const confirmationData = JSON.parse(localStorage.getItem('confirmationForm')) || {};

        document.getElementById('lastName').innerText = applicantData.lastName || '';
        document.getElementById('firstName').innerText = applicantData.firstName || '';
        document.getElementById('middleName').innerText = applicantData.middleName || '';
        document.getElementById('program').innerText = applicantData.program || '';
        document.getElementById('campus').innerText = applicantData.campus || '';
        document.getElementById('class').innerText = applicantData.class || '';
        document.getElementById('emailAddress').innerText = contactData.emailAddress || ''; 
        document.getElementById('examDateTime').innerText = confirmationData.examDateTime || ''; 
    }
});