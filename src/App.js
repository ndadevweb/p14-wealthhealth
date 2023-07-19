import { Outlet } from 'react-router-dom'
import classes from './App.module.css'

import { Header } from './components/'

function App() {
  return (
    <>
      <Header />
      <main className={ classes.container }>
        <Outlet />
      </main>
    </>
  );
}

export default App;
