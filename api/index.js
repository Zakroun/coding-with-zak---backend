// api/index.js
module.exports = (req, res) => {
    res.status(200).json({
        name: "codingwithzak API",
        version: "1.0.0",
        status: "operational",
        endpoints: [
            {
                method: "POST",
                path: "/api/contact",
                description: "Send an email via the contact form"
            }
        ]
    });
};