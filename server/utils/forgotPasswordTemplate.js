const forgotPasswordTemplate =({name, otp})=>{
    return `
    <div>
    <h1>Dear ${name}</h1>
    <h2>Your OTP is ${otp}</h2>
    <p>Use this OTP to reset your password<br>
    This OTP is valid for 1 hour only</p>
    </div>
    `
}

export default forgotPasswordTemplate