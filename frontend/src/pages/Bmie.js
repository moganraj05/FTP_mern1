import { useEffect } from 'react';
import { useBmiContext } from '../hooks/useBmiContext';
import BmiForm from '../components/BmiForm';
import BmiDetails from '../components/BmiDetails';
import { useAuthContext } from "../hooks/useAuthContext"


const BmiPage = () => {
  const { bmis, dispatch } = useBmiContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchBmis = async () => {
      const response = await fetch('https://ftp-mern.onrender.com/api/bmi/',{headers: {'Authorization': `Bearer ${user.token}`},});
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_BMIS', payload: json });
      }
    };

    if(user){
      fetchBmis();
    }
  }, [dispatch,user]);

  return (
    <div className="home">
      <div className="workouts">
        {bmis && bmis.map(bmi => (
          <BmiDetails bmi={bmi} key={bmi._id} />
        ))}
      </div>
      <BmiForm />
    </div>
  );
};

export default BmiPage;