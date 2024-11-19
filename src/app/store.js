import { configureStore } from '@reduxjs/toolkit';
import BraceletReducer from '../features/components/Bracelet/BraceletSlice';
import BeltReducer from '../features/components/Bracelet/BeltSlice';


export const store = configureStore({
  reducer: {
      bracelet: BraceletReducer,
      belt: BeltReducer,
  },
});
