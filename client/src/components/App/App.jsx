import React from 'react';
import Header from '../Main/Header';
import Main from '../Main/Main';
import Footer from '../Main/Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  app: {
    height: "100vh"
  }
})

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
export default App;
