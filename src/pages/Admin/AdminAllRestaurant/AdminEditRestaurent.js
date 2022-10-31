import { ArrowBack } from '@material-ui/icons';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './AdminEditRestaurent.css';

export default function AdminEditRestaurent() {
    const {restaurant_id} = useParams();
    const history = useHistory()
  return (
    <div className='editRestContainer'>
        <div className='topNav'>
            <button className='goBackBtn' onClick={history.goBack}><ArrowBack/> Go Back</button>
        </div>
    </div>
  )
}
