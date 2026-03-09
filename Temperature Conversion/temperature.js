const express = require("express");

const app = express();

// API Endpoint
app.get("/convert", (req, res) => {

    const fahrenheit = parseFloat(req.query.f);

    if (isNaN(fahrenheit)) {
        return res.status(400).json({
            error: "Please provide temperature in Fahrenheit"
        });
    }

    const celsius = ((fahrenheit - 32) * 5) / 9;

    res.json({
        fahrenheit: fahrenheit,
        celsius: celsius.toFixed(2)
    });

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test: http://localhost:3000/convert?f=100`);
});