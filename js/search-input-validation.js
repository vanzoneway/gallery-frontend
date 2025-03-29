export function validateSearchInput(input) {
    const errorElement = document.querySelector('.search-error');
    const allowedSpecialChars = /[!$&*\-=^`|~#%'+/?_{}]/;
    const minLength = 3;
    const maxLength = 20;

    errorElement.textContent = '';

    if (input === "") {
        return true;
    }

    if (input.length < minLength || input.length > maxLength) {
        errorElement.textContent = `Input must be between ${minLength} and ${maxLength} characters`;
        return false;
    }

    const invalidChars = input.split('').filter(char => {
        return !(/[a-zA-Z0-9]/.test(char) || allowedSpecialChars.test(char));
    });

    if (invalidChars.length > 0) {
        errorElement.textContent = `Invalid characters found: ${invalidChars.join(', ')}. Only letters, numbers and !$&*-=^\`|~#%'+/?_{} are allowed`;
        return false;
    }

    return true;
}