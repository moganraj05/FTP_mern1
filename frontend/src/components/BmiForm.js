import { useState } from 'react';
import { useBmiContext } from '../hooks/useBmiContext';
import { useAuthContext } from '../hooks/useAuthContext'


const BmiForm = () => {
  const { dispatch } = useBmiContext();
  const { user } = useAuthContext()

  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    const bmi = { name, height, weight };

    const response = await fetch('/api/bmi', {
      method: 'POST',
      body: JSON.stringify(bmi),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setName('');
      setHeight('');
      setWeight('');
      dispatch({ type: 'CREATE_BMI', payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Calculate BMI</h3>
      <label>Name:</label>
      <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      <label>Height (cm):</label>
      <input type="number" onChange={(e) => setHeight(e.target.value)} value={height} />
      <label>Weight (kg):</label>
      <input type="number" onChange={(e) => setWeight(e.target.value)} value={weight} />
      <button>Calculate BMI</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BmiForm;
