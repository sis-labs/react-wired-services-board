import React from "react";
import "./style.css";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Services from './containers/Services';
import ApplicationHeader from './components/ApplicationHeader';

export default function App() {
  return (
    <div>
      <ApplicationHeader title="&lambda; |> Event hub wiring services"/>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Services />
        </Container>
      </React.Fragment>
    </div>
  );
}
