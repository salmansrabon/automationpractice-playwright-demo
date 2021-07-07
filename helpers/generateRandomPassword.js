module.exports=()=> {
    var password = '';
    var passwordLength=8;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    for (let i = 0; i < passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
