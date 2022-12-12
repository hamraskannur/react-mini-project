const userCollection=require("../models/schema/user-Schema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports={
    postSigup: async(req,res)=>{
      let  userSignUpp={
        Status:false,
        message:null,
        }
        const { enteredEmail,enteredname} = req.body
        let { enteredPassword} = req.body
        let user = await userCollection.find({ email: enteredEmail })
        if(user.length===0){
            enteredPassword= await bcrypt.hash(enteredPassword, 10)
            userCollection.create({
                Name:enteredname ,
                email:enteredEmail,
                password:enteredPassword,
                
            }).then((data) => {
                userSignUpp.Status=true
                res.send({ userSignUpp })
            })
        }else{
            userSignUpp.message="email already exists try login with this email"
            res.send({ userSignUpp })      
          }
     
    }, 
    postLogin: async(req,res)=>{
        let  userSignUpp={
            Status:false,
            message:null,
            token: null,
            name:null
            }
            const {enteredEmail ,enteredPassword}=req.body
            let findUser = await userCollection.find({ email: enteredEmail })
            if (findUser.length !== 0) {
                    bcrypt.compare(enteredPassword, findUser[0].password, function (error, isMatch) {
                        if (error) {
                            userSignUpp.Status = false
                            userSignUpp.message = error
                        res.send({ userSignUpp })      
                        } else if (isMatch) {
                            userSignUpp.Status=true
                            userSignUpp.name=findUser[0].Name
                          const name=findUser[0].Name
                            let token = jwt.sign({ id: findUser[0]._id }, "secretCode", { expiresIn: "30d" })
                            userSignUpp.token= token
                            let obj = {
                                token,name
                            }
                            res.cookie("jwt", obj,  {
                                httpOnly: false,
                                maxAge: 6000 * 1000,
                            }).status(200).send({ userSignUpp })    
                        } else {
                            userSignUpp.message = " Password is wrong"
                            userSignUpp.Status = false
                            res.send({ userSignUpp })      
                        }
                    })
            } else {
                userSignUpp.message = "your Email wrong"
                 userSignUpp.Status = false
                 res.send({ userSignUpp })      
                }
    },
    userProfile: async(req,res)=>{
        const jwtToken = jwt.verify(req.cookies.jwt.token, "secretCode")
      
        if(jwtToken.id){
               const UserId=jwtToken.id   
               let user = await userCollection.findOne({ _id: UserId })
               if(user){
                   res.status(200).send({ user })      
               }else{
                res.status(500).send({ erroe: "no user" })
               }
           }else{
            res.status(500).send({ erroe: "no user" })
           }
    },
    editProfilePhoto:(req,res)=>{

        const jwtToken = jwt.verify(req.cookies.jwt.token, "secretCode")

        if(jwtToken.id){
            const UserId=jwtToken.id   
            userCollection.updateOne(
                { _id: UserId },
                {
                    $set: {
                        image: req.body.image
                    }
                }).then(()=>{
                    res.status(200).send({ changed: true })
                })

        }else{
            res.status(500).send({ erroe: "no user" })

        }

    }
}