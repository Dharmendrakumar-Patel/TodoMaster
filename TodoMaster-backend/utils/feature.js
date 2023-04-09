import jwt from 'jsonwebtoken';

export const setCookie = (user,res,statusCode=200,message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    return res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.Node_ENV === 'development' ? 'lax' : 'none',
        secure: process.env.Node_ENV === 'development' ? false : true,
    }).json({
        success: true,
        message: message,
    });
}