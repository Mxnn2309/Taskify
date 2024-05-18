import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { TasksContextProvider } from './context/TaskContext';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="154768159616-r91hf6st4553lpj213fnjc1ekpe3vfrg.apps.googleusercontent.com">
      <AuthContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);