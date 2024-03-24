"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Checking the crypto module
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto_1.default.randomBytes(32);
const iv = crypto_1.default.randomBytes(16);
//Encrypting text
const encrypt = (text) => {
    let cipher = crypto_1.default.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return JSON.stringify({ iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') });
    // let cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    // let encryptedData = cipher.update(text, "utf-8", "hex");
    // encryptedData += cipher.final("hex");
    // console.log("The encrypted message is:", encryptedData);
    // return encryptedData;
};
// Decrypting text
const decrypt = (temp) => {
    debugger;
    var text = JSON.parse(temp);
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto_1.default.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
    // const decrypted = crypto_1.default.createDecipheriv(algorithm, key, iv);
    // let decryptedData = decrypted.update(text, "hex", "utf-8");
    // decryptedData += decrypted.final("utf8");
    // console.log("The decrypted message is:", decryptedData);
    // return decryptedData;
};
exports.default = {
    encrypt, decrypt
};
