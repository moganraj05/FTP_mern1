import { createContext, useReducer } from 'react';

export const BmiContext = createContext();

export const bmiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BMIS':
      return { bmis: action.payload };
    case 'CREATE_BMI':
      return { bmis: [action.payload, ...state.bmis] };
    case 'DELETE_BMI':
        return { 
          bmis: state.bmis.filter(w => w._id !== action.payload._id) 
        }
        
    default:
      return state;
  }
};

export const BmiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bmiReducer, { bmis: null });

  return (
    <BmiContext.Provider value={{ ...state, dispatch }}>
      { children }
    </BmiContext.Provider>
  );
};
