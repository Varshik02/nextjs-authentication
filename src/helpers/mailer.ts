import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }   else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }
        const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "681bfb560ffc8b",
                  pass: "27fdb486af73d8"
                }
        });

        const mailOptions = {
            from: 'varshik@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? 'Verify your email' : 'Reset your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions)
        return mailOptions;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}
