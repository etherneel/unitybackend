"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSubject = exports.otpTemplate = exports.refrealLinkSubject = exports.refrealLink = exports.link = void 0;
exports.link = "";
const refrealLink = (link) => {
    return ` please click on following link for sign up 
    ${link} `;
};
exports.refrealLink = refrealLink;
const refrealLinkSubject = () => { return 'Referral for signUp Process for user creation'; };
exports.refrealLinkSubject = refrealLinkSubject;
const otpTemplate = (otp) => {
    return ` Welcome to the club.
                You are officially In ✔
                 Pleas enter the sign up OTP to get started 
                 ${otp} 
               `;
};
exports.otpTemplate = otpTemplate;
const otpSubject = () => { return 'Varification Code'; };
exports.otpSubject = otpSubject;
