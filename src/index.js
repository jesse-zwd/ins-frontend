import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from "./context/UserContext";
import { FeedProvider } from "./context/FeedContext";
import { ThemeProvider } from "./context/ThemeContext";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <UserProvider>
    <FeedProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </FeedProvider>
  </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
