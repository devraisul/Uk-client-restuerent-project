import React from 'react';
import { BiMessageAltError } from 'react-icons/bi';
import styles from './OrderEmpty.module.css';

export default function OrderEmpty() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.emptyTextContainer} >
        <BiMessageAltError style={{ fontSize: '2rem', }} />
        <span style={{ fontWeight: 'bold',textAlign:'center' }}>
          Please Select A Menu First. <br />
          If you are selected then there is no dish in this menu.
        </span>
      </div>
    </div>
  )
}
