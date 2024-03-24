const globalErrorHandler = (err, req, res, next)=>{
        
    const message = err?.message;
    const status = err?.status ? err.status : 500;
    return res.status(status).json({
        status: false,
        message
    });
}

const notFoundErrorHandler = (req, res, next)=>{
    const error = new Error(`The requested url ${req.originalUrl} is not found`);
    next(error);
}

module.exports = {globalErrorHandler, notFoundErrorHandler};