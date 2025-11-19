// Get form elements
const form = document.getElementById('contactForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateFullName() {
    const value = fullNameInput.value.trim();
    
    if (value === '') {
        showError(fullNameInput, nameError, 'Full name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError(fullNameInput, nameError, 'Full name must be at least 2 characters');
        return false;
    }
    
    clearError(fullNameInput, nameError);
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showError(emailInput, emailError, 'Email address is required');
        return false;
    }
    
    if (!emailRegex.test(value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailInput, emailError);
    return true;
}

function validateSubject() {
    const value = subjectInput.value.trim();
    
    if (value === '') {
        showError(subjectInput, subjectError, 'Subject is required');
        return false;
    }
    
    if (value.length < 3) {
        showError(subjectInput, subjectError, 'Subject must be at least 3 characters');
        return false;
    }
    
    clearError(subjectInput, subjectError);
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();
    
    if (value === '') {
        showError(messageInput, messageError, 'Message is required');
        return false;
    }
    
    if (value.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(messageInput, messageError);
    return true;
}

// Helper functions
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation
fullNameInput.addEventListener('blur', validateFullName);
emailInput.addEventListener('blur', validateEmail);
subjectInput.addEventListener('blur', validateSubject);
messageInput.addEventListener('blur', validateMessage);

// Clear error on input
fullNameInput.addEventListener('input', () => {
    if (fullNameInput.classList.contains('error')) {
        validateFullName();
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

subjectInput.addEventListener('input', () => {
    if (subjectInput.classList.contains('error')) {
        validateSubject();
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide success message if visible
    successMessage.classList.remove('show');
    
    // Validate all fields
    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Log form data (in a real application, you would send this to a server)
        console.log('Form submitted successfully!');
        console.log({
            fullName: fullNameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        });
    }
});