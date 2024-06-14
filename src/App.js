import { useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import SkillCheckPage from './pages/SkillCheckPage';
import SkillContextProvider from './store/SkillContext';
import darkTheme from './theme';


const App = () => (
  <ThemeProvider theme={darkTheme}>
    <SkillContextProvider>
      <div className="App">
        <SkillCheckPage />
      </div>
    </SkillContextProvider>
  </ThemeProvider>
);

export default App;
