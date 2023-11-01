import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from '../reducers/authReducer';
import gangReducer from '../reducers/gangReducer'; // Import your gang reducer
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a persist configuration specifically for authReducer
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

// Apply persistReducer to authReducer only
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Only auth state will be persisted
  gangs: gangReducer, // Gangs state will not be persisted
});

const store = createStore(rootReducer);
const persistor = persistStore(store);

export { store, persistor };
