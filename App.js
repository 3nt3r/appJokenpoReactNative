import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Inicial from './src/components/inicial.js';
import Jogadas from './src/components/jogadasAnteriores.js';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="principal" component={Inicial} hideNavBar={true} />
      <Scene key="jogadas" component={Jogadas} title="Jogadas Anteriores" hideNavBar={false} />
    </Stack>
  </Router>
);

export default App;
