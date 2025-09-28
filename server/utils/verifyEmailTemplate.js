const verifyEmailTemplate = ({name,url}) => {
    return `<p>Dear ${name}</p>
    <p> Thank you for Registering on Foody! </p>
    <a href = ${url} 
    style = "color: white;margin-top: 10px;padding:20px">
    Verify Email
    </a>
    ` 
}

export default verifyEmailTemplate