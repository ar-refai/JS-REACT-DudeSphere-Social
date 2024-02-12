import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider} from '@react-oauth/google';
const REACT_GOOGLE_CLIENT_ID_TOKEN = "310503819403-25aijp8i33ur1tkam73bac4nf6mncr08.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <GoogleOAuthProvider
                    clientId={REACT_GOOGLE_CLIENT_ID_TOKEN}
                >
        <App />
        </GoogleOAuthProvider>
    </Router>);