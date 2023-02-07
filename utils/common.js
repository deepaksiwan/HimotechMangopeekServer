// const nodemailer = require("nodemailer")
// const smtpTransport = require('nodemailer-smtp-transport');
// require("dotenv").config()

// module.exports = ({
//     genrateOtp: () => {
//         let random = Math.random()
//         let otp = Math.floor(random * 100000) + 100000
//         return otp
//     },
//     uploadImage1: async (img) => {
//         let imageRes = await cloudinairy.v2.uploader.upload(img);
//         if (imageRes) {
//             return imageRes.secure_url;
//         }
//         else {
//             console.log("Image upload error")
//         }
//     },
//     sendMailing: async (email, subject, html) => {
//         try {
//             let transporter = nodemailer.createTransport(smtpTransport({
//                 service: "mail.wizard.financial",
//                 host: "mail.wizard.financial",
//                 port: 465,
//                 secure: true,
//                 auth: {
//                     user: process.env.SMTP_WEBMAIL_USERNAME,
//                     pass: process.env.SMTP_WEBMAIL_PASSWORD,

//                 },
//                 tls: {
//                     // do not fail on invalid certs
//                     rejectUnauthorized: false,
//                   },
//             }))

            
//             let options = {
//                 from: `Wolf Pup Registry ${process.env.SMTP_WEBMAIL_USERNAME}`,
//                 to: email,
//                 subject: subject,
//                 html: html
//             }
           
//             return await transporter.sendMail(options,(error,info)=>{
//                 if(error){
//                     console.log(error);
//                 }else{
//                     console.log(info);
//                 }
//             })
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// })