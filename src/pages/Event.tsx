import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonGrid,
  IonRow,
  useIonPopover,
  IonTextarea,
  IonLabel,
  IonIcon,
} from '@ionic/react';

import { ellipsisVerticalOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';
export interface EventInterface {
  date: Date;
  description: string;
}

const PopoverList: React.FC<{
  deleteEvent: () => void;
  editEvent: () => void;
}> = ({ editEvent, deleteEvent }) => {
  return (
    <IonList>
      <IonItem button onClick={() => editEvent()}>
        Επεξεργασία Συμβάντος
      </IonItem>
      <IonItem button onClick={() => deleteEvent()}>
        Διαγραφή Συμβάντος
      </IonItem>
    </IonList>
  );
};

interface EventPageProps extends RouteComponentProps {
  match: any;
}
const Event: React.FC<EventPageProps> = ({ match, history, location }) => {
  const id = match.params.id || null;
  const [viewOnly, setViewOnly] = useState(false);
  const [present, dismiss] = useIonPopover(PopoverList, { deleteEvent: () => deleteEvent(), editEvent: () => editEvent() });

  const deleteEvent = () => {
    const temp = localStorage.getItem('myThoughts');
    if (temp) {
      let events = JSON.parse(temp);
      if (id > 0) {
        events.splice(1, id);
      } else {
        events.pop();
      }
      localStorage.setItem('myThoughts', JSON.stringify(events));
      dismiss();
      history.replace('/');
    }
  };

  const editEvent = () => {
    setViewOnly(false);
    dismiss();
  };

  const [description, setDescription] = useState('');

  const saveThoughts = () => {
    let temp = localStorage.getItem('myThoughts');
    let myThoughts: EventInterface[] = [];
    if (temp) {
      myThoughts = JSON.parse(temp);
    }
    if (id && myThoughts[id]) {
      myThoughts[id].description = description;
    } else {
      myThoughts.push({ date: new Date(), description: description });
    }
    localStorage.setItem('myThoughts', JSON.stringify(myThoughts));
    history.replace('/');
  };

  useEffect(() => {
    const temp = localStorage.getItem('myThoughts');
    if (temp) {
      const thought = JSON.parse(temp);
      if (id) {
        setViewOnly(true);
        setDescription(thought[id].description);
      }
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{id ? 'Προβολή Συμβάντος' : 'Προσθήκη Συμβάντος'}</IonTitle>
          {viewOnly && (
            <IonButtons slot="end">
              <IonButton
                expand="block"
                onClick={(e) =>
                  present({
                    event: e.nativeEvent,
                  })
                }
              >
                <IonIcon md={ellipsisVerticalOutline} ios={ellipsisHorizontalOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonLabel>Συμβαν</IonLabel>
          </IonRow>
          <IonRow>
            <IonTextarea
              rows={12}
              cols={20}
              placeholder={viewOnly ? '' : 'Περιγραφή συμβάντος...'}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              readonly={viewOnly}
            ></IonTextarea>
          </IonRow>
        </IonGrid>
      </IonContent>

      {!viewOnly && (
        <IonFooter>
          <IonToolbar>
            <IonButton expand="full" onClick={() => saveThoughts()}>
              ΑΠΟΘΗΚΕΥΣΗ
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Event;
