import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Event from './pages/Event';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter basename="/ionic-agenda">
      <IonRouterOutlet>
        <Route exact path="/" render={(props) => <Home {...props} />}></Route>
        <Route exact path="/new-event" render={(props) => <Event {...props} />}></Route>
        <Route exact path="/event/:id" render={(props) => <Event {...props} />}></Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
