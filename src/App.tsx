import React from 'react';
import Color from './pages/Color';
import './App.css';
import data from './services/data/colores.json';
import { ColorType } from './services/ColorServices';

import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';


function App() {

  return (
    <div className='Colors Management'>
      <div>{Color()}</div>
    </div>
  );
}

export default App;
