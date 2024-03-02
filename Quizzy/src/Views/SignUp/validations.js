export const validateData = (form, fn) => {
    if (form.username.length < 3 || form.username.length > 30) {
        fn("Username should be between 3 and 30 characters long!");
        return false;
    }

    if (form.firstName.length < 1 || form.firstName.length > 30) {
        fn("First Name should be between 1 and 30 characters long!");
        return false;
    }

    if (!/^[A-Za-z]+$/.test(form.firstName)) {
        fn(
            "First Name should include only uppercase and lowercase letters!"
        );
        return false;
    }

    if (form.lastName.length < 1 || form.lastName.length > 30) {
        fn("Last Name should be between 1 and 30 characters long!");
        return false;
    }

    if (!/^[A-Za-z]+$/.test(form.lastName)) {
        fn(
            "Last Name should include only uppercase and lowercase letters!"
        );
        return false;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValid = isValidEmail(form.email);

    if (!isValid) {
        fn("Email is not valid!");
        return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
        fn("Phone number should have exactly 10 digits!");
        return false;
    }

    if (!form.password) {
        fn('Password is required!');
        return false;
    }

    // For more secure password:
    // if (form.password.length < 8) {
    //     fn('Password must be at least 8 characters.');
    //     return false;
    // }

    // if (!/[a-z]/.test(form.password)) {
    //     fn('Password must contain at least one lowercase letter.');
    //     return false;
    // }

    // if (!/[A-Z]/.test(form.password)) {
    //     fn('Password must contain at least one uppercase letter.');
    //     return false;
    // }

    // if (!/[0-9]/.test(form.password)) {
    //     fn('Password must contain at least one number.');
    //     return false;
    // }

    // if (!/[!@#$%^&*()-+=\[\]{};':"\\|,.<>\/?]/.test(form.password)) {
    //     fn('Password must contain at least one special character.');
    //     return false;
    // }

    if (!form.role) {
        fn("Role is required!");
        return false;
    }

    return true;
};