import * as EmailValidator from 'email-validator';

const hasSpecialChar=(str:string)=>{
    return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(str);
}
const hasNumber = (str:string) => {
    return /\d/.test(str);
}
const hasLowerCase = (str:string) => {
    return str.toUpperCase() !== str;
}

const hasUpperCase = (str:string) => {
    return str.toLowerCase() !== str;
}


const validatePassword =(text:string)=>{
    if (text.length < 8) return "Password should be 8 or more characters";
    if (!hasLowerCase(text) || !hasUpperCase(text)) return "Password should contains minimum 1 character for both uppercase and lowercase letter";
    if (!hasNumber(text)) return "Password should contains minimum 1 digit of numeric value";
    if (!hasSpecialChar(text)) return "Password should contains minimum 1 special character";
    return "";
}

const validateEmail=(email:string)=>{
    return EmailValidator.validate(email);
}

export {
    validatePassword,
    validateEmail,
}