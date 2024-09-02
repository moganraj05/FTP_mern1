import { useAuthContext } from '../hooks/useAuthContext';
import { useBmiContext } from '../hooks/useBmiContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BmiDetails = ({ bmi }) => {
  const { dispatch } = useBmiContext()
  const {user} = useAuthContext()

  const handleClick = async () => {
    const response = await fetch('/api/bmi/' + bmi._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (response.ok) {
      dispatch({ type: 'DELETE_BMI', payload: { _id: bmi._id } });
    }
  }
    return (
      <div className="workout-details">
        <h4>{bmi.name}</h4>
        <p><strong>Height: </strong>{bmi.height} cm</p>
        <p><strong>Weight: </strong>{bmi.weight} kg</p>
        <p><strong>BMI: </strong>{bmi.bmi.toFixed(2)}</p>
        <p><strong>category: </strong>{bmi.category}</p>
        <p>{formatDistanceToNow(new Date(bmi.createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    );
  };
  
  export default BmiDetails;
  