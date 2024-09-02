const Bmi = require('../models/Bmi');

const getBmis = async (req, res) => {
  const user_id = req.user._id
  const bmis = await Bmi.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(bmis);
};

const createBmi = async (req, res) => {
  const { name, height, weight } = req.body;
  let category = ''; 

  const bmiValue = weight / ((height / 100) ** 2);

      if (bmiValue < 18.5) {
        category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        category = 'Normal';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

  try {
    const user_id = req.user._id
    const bmi = await Bmi.create({ name, height, weight, category, bmi: bmiValue,user_id });
    res.status(200).json(bmi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBmi = async (req, res) => {
  const { id } = req.params;

  try {
    const bmi = await Bmi.findByIdAndDelete(id);
    if (!bmi) {
      return res.status(404).json({ error: 'BMI record not found' });
    }
    res.status(200).json({ message: 'BMI record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBmis,
  createBmi,
  deleteBmi  // Make sure deleteBmi is exported
};
