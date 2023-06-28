import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Sala } from '../../../../modals/salas';
import styles from './styles.module.scss';
export default function SalaItem({
  sala,
}: {
  sala: Sala;
}) {


  return (
    <div className= {styles['rooms-container']}>
      <div className={styles['rooms-class']}>
        <div className={styles['rooms-title']}>Sala {sala.number}</div>
        <div className={styles['rooms-capacity']}>
         Capacidade {sala.capacity}
        </div>
        <div className={styles['align-section']}>

        <div className={styles['rooms-building']}>
         {sala.building}
        </div>
        {/* <div className={styles['rooms-building']}>
        Tipo {sala.type}
        </div> */}
       
        </div>
     
      </div>
      <div className={styles['rooms-actions']}>
        <IconButton
          color='default'
        >
          <EditRounded />
        </IconButton>
        <IconButton color='error' 
        >
        <DeleteRounded />
        </IconButton>
      </div>
    </div>
  );
}
