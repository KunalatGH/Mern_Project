const generateOtp = () => {
    return Math.floor(Math.random() * 900000)+100000
    // 100000 to 999999
    //This will generate a 6 digit random number for the OTP
}
export default generateOtp;