import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Home.css';
export interface Event {
  description: string;
  date: Date;
}
const Home: React.FC<RouteComponentProps> = (props) => {
  const [myThoughts, setThoughts] = useState([]);

  useEffect(() => {
    const temp = localStorage.getItem('myThoughts');
    if (temp) {
      setThoughts(JSON.parse(temp));
    }
  }, [props.location]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ατζέντα</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {myThoughts.length > 0 ? (
          <IonList>
            {myThoughts.map((f: Event, i) => (
              <IonItem key={i} button routerLink={`/event/${i}`}>
                <IonGrid>
                  <IonRow>{new Date(f.date).toLocaleDateString('el-GR')}</IonRow>
                  <IonRow>
                    <p
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {f.description}
                    </p>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p style={{ textAlign: 'center' }}>Κανένα συμβάν</p>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/new-event">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
