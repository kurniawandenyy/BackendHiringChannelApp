require('dotenv/config')
const jwt =require('jsonwebtoken')

module.exports = {
    engineerCheck : (req, res, next)=>{
        const { authorization, email } = req.headers
        if(!authorization || !email){
            return res.status(404).json({
                message: 'Unauthorized'
            })
        }
        const token = authorization.split(" ")[1]
        //decode JWT and validation
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err && err.name === 'JsonWebTokenError'){
                return res.status(403).json({ 
                    message: 'Invalid Token!'
                })
            } 
            if(err && err.name === 'TokenExpiredError'){
                return res.status(403).json({
                    message: 'Expired Token!'
                })
            }
                
            //check if token is registered with correct email
            if(email !== decoded.result[0].email){
                return res.status(403).json({
                    message : 'Token is not Valid for selected email'
                })
            }
            if(decoded.result[0].role !== 'engineer'){
                return res.status(403).json({
                    message: 'Restricted!'
                })
            }
            // res.json({
            //     message : 'Valid Token',
            //     username,
            //     authorization
            // })
            next()
        })
    },
    companyCheck : (req, res, next)=>{
        const { authorization, email } = req.headers
        if(!authorization || !email){
            return res.status(404).json({
                message: 'Unauthorized'
            })
        }
        const token = authorization.split(" ")[1]
        //decode JWT and validation
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err && err.name === 'JsonWebTokenError'){
                return res.status(403).json({ 
                    message: 'Invalid Token!'
                })
            } 
            if(err && err.name === 'TokenExpiredError'){
                return res.status(403).json({
                    message: 'Expired Token!'
                })
            }
                
            //check if token is registered with correct username
            if(email !== decoded.result[0].email){
                return res.status(403).json({
                    message : 'Token is not Valid for selected email'
                })
            }
            if(decoded.result[0].role !== 'company'){
                return res.status(403).json({
                    message: 'Restricted!'
                })
            }
            // res.json({
            //     message : 'Valid Token',
            //     username,
            //     authorization
            // })
            next()
        })
    }
}