import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/index.scss'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/Store";
import 'bootstrap/dist/css/bootstrap.css';
import {ContextProvider} from "./provider/ContextProvider";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <ContextProvider>
                  <App />
              </ContextProvider>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
