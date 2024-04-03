"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Checking the crypto module
var key_Temp = 'B21C2DABD48BC64ADDB18CDBEA716';
var encryptor = require('simple-encryptor')(key_Temp);
//Encrypting text
const encrypt = (text) => {
    debugger;
    var encrypted;
    if (text.length < 139) {
        encrypted = encryptor.encrypt(text);
    }
    else {
        encrypted = text;
    }
    return encrypted;
};
// Decrypting text
const decrypt = (text) => {
    debugger;
    var decrypted;
    if (text.length > 139) {
        decrypted = encryptor.decrypt(text);
    }
    else {
        decrypted = text;
    }
    return decrypted;
};
exports.default = {
    encrypt, decrypt
};
