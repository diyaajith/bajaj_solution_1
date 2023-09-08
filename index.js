const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  try {
    const inputData = req.body.data;
    const response = processInputData(inputData);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/bfhl', (req, res) => {
  const operationCode = 1;
  res.status(200).json({ operation_code: operationCode });
});

function processInputData(inputData) {
  const is_success = true;
  const user_id = "Diya_AjithK_27092002";
  const email = "dk1804@srmist.edu.in";
  const roll_number = "RA2011030010075";
  const numbers = inputData.filter(item => !isNaN(item));
  const alphabets = inputData.filter(item => isNaN(item));
  const highest_alphabet = findHighestAlphabet(alphabets) == null? [] : [findHighestAlphabet(alphabets)];

  return {
    is_success,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  };
}

function findHighestAlphabet(alphabets) {
    if (alphabets.length === 0) {
    return;
    }
    return alphabets.reduce((highest, current) => {
        const currentUpper = current.toUpperCase();
        const highestUpper = highest.toUpperCase();
    
        return currentUpper > highestUpper ? current : highest;
      }, 'A');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
