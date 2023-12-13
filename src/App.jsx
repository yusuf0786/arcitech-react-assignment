import React from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './assets/scss/style.scss'
import { SearchMovies } from './components/SearchMovies'
import { Practice } from './components/Practice';

function App() {

  return (
    <>
    {/* <Practice></Practice> */}
      <SearchMovies ></SearchMovies>
    </>
  )
}

export default App
