import nodemailer from 'nodemailer'

export async function sendLoginEmail({ url, email, token}: {url: string, email: string, token: string}){
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp:ethereal.email",
    port: 587,
    secure: false,
    auth:{
      user: testAccount.user,
      pass: testAccount.pass
    }
  })

  const info = await transporter.sendMail({
    from: "no-reply<noreply@example.com>",
    to: email,
    subject: 'Login to your account',
    html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`
  })

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}
