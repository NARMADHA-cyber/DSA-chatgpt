document.addEventListener('DOMContentLoaded', () => {
    
    const signInModal = document.getElementById('sign-in-modal');
    const signUpModal = document.getElementById('sign-up-modal');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const signInLink = document.getElementById('sign-in-link');
    const signUpLink = document.getElementById('sign-up-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const closeSignIn = document.getElementById('close-sign-in');
    const closeSignUp = document.getElementById('close-sign-up');
    const closeForgotPassword = document.getElementById('close-forgot-password');

    signInLink.onclick = function() {
        signInModal.style.display = 'block';
    }

   
    signUpLink.onclick = function() {
        signUpModal.style.display = 'block';
    }

    forgotPasswordLink.onclick = function() {
        signInModal.style.display = 'none';
        forgotPasswordModal.style.display = 'block';
    }

    
    closeSignIn.onclick = function() {
        signInModal.style.display = 'none';
    }

    closeSignUp.onclick = function() {
        signUpModal.style.display = 'none';
    }

  
    closeForgotPassword.onclick = function() {
        forgotPasswordModal.style.display = 'none';
    }

    
    window.onclick = function(event) {
        if (event.target == signInModal) {
            signInModal.style.display = 'none';
        } else if (event.target == signUpModal) {
            signUpModal.style.display = 'none';
        } else if (event.target == forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    }

    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit',         (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
            } else {
                alert('Sign up successful!');
            }
        });
    }

    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Sign in successful!');
        });
    }

    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value;
            alert(`Password reset email has been sent to ${email}. Please check your inbox.`);
            forgotPasswordModal.style.display = 'none';
        });
    }
});

