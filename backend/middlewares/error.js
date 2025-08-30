class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    // 👇 Log complet dans la console pour debug
    console.error("🔥 Backend Error:", err);

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Erreur Mongoose : mauvais ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Erreur clé dupliquée
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Erreur JWT invalide
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, try again";
        err = new ErrorHandler(message, 400);
    }

    // Erreur JWT expiré
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token has expired, try again";
        err = new ErrorHandler(message, 400);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
