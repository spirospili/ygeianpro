import React from 'react';
import ReactDOM from 'react-dom';
import '../../../public/css/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";

import {AuthContextProvider} from "../store/AuthContext2";

ReactDOM.render(
	<>
	  <BrowserRouter>
	  <AuthContextProvider>
	    <App />
		</AuthContextProvider>
	  </BrowserRouter>
	</>,
  document.getElementById('root')
);

const Slick = props => (
		<div className="application">
            <Helmet>
              <script src="../../../public/src/js/custom.js" type="text/javascript" />
            </Helmet>
        </div>
);