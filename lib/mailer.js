const nodemailer = require("nodemailer")
async function sender(to){
    try {
    
        const transporter = nodemailer.createTransport({
            
                host: process.env.HOST ,
                port: process.env.PORT ,
                auth : {
                    user : process.env.EMAIL,
                    pass :process.env.PASSWORD
                }
            }

        )
        const option = {
            to :to,
            subject :"testin nodemailer" ,
            html : `<p>Hello ${to}</p>
            <p style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;>hello <strong>${to}</strong></p>
          `
         
        }
transporter.sendMail(option,(error,info)=>{
    if (error){
        console.log(error)
    }else{
        console.log('email sent ', info.response);
    }
})
        
    } catch (error) {
        console.log(error)
        
    }
} 

module.exports = sender