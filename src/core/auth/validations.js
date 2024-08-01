import Toast from "react-native-toast-message";

export const registerValidationForm = (email, password, gender, birthday) => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Toast.show({
            type: "error",
            text1: 'Please enter a valid email address.'
        })
        return false;
    }

    // Password validation
    if (!password) {
        Toast.show({
            type: "error",
            text1: 'Password is required'
        })
        return false;
    }
    // Password validation
    if (password.length < 6) {
        Toast.show({
            type: "error",
            text1: 'Password',
            text2: 'Password must be at least 6 characters long'
        })
        return false;
    }

    // Gender validation
    if (!gender) {
        Toast.show({
            type: "error",
            text1: 'Select a gender.'
        })
        return false;
    }
    const validGenders = ['male', 'female'];
    if (!validGenders.includes(gender.toLowerCase())) {
        Toast.show({
            type: "error",
            text1: 'Please enter a valid gender (male, female).'
        })
        return false;
    }

    // Birthday validation
    if (!birthday) {
        Toast.show({
            type: "error",
            text1: 'Birth date is required'
        })
        return false;
    }

    const parsedDate = new Date(birthday);
    if (isNaN(parsedDate.getTime())) {
        Toast.show({
            text1: 'Invalid Date',
            text2: 'Please enter a valid date in the format "Wed Oct 02 2024".',
            type: "error"
        });
        return false;
    }

    return true;
};

export const loginValidationForm = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        Toast.show({
            type: "error",
            text1: 'Please enter a valid email address.'
        })
        return false;
    }

    // Password validation
    if (!password) {
        Toast.show({
            type: "error",
            text1: 'Password is required'
        })
        return false;
    }
    return true;
};