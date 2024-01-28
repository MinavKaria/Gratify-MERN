import jwt from 'jsonwebtoken';

const auth= async (req,res,next) => {
    try
    {
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;

        let decodedData;

        if(token && isCustomAuth)
        {
            decodedData=jwt.verify(token,'ithinkthisisasecret');
            req.userId=decodedData?.id;
        }
        else
        {
            decodedData=jwt.decode(token);
            req.userId=decodedData?.sub;
        }

        next();
    }
    catch(err)
    {
        console.log("From the middleware")
        console.log(err);
    }
};

export default auth;