const express = require("express");
const axios = require("axios");

const app = express();

const exchangeRateApi = "https://api.exchangerate-api.com/v4/latest/INR";

app.get("/convert", async (req, res) => {
  const { amount, to } = req.query;

  // Check if parameters exist
  if (!amount || !to) {
    return res.status(400).json({
      error: "Please provide amount and currency code. Example: ?amount=2000&to=USD"
    });
  }

  try {
    const response = await axios.get(exchangeRateApi);

    const exchangeRate = response.data.rates[to.toUpperCase()];

    if (!exchangeRate) {
      return res.status(400).json({
        error: "Invalid currency code"
      });
    }

    const convertedAmount = (parseFloat(amount) * exchangeRate).toFixed(2);

    res.json({
      from: "INR",
      to: to.toUpperCase(),
      amount: amount,
      convertedAmount: convertedAmount
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Error fetching exchange rates"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/convert?amount=200000&to=USD`);
});