import React from 'react'
import { BiMessageAltError } from 'react-icons/bi'

export default function OrderEmpty() {
  return (
    <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#aaa'
        }}>
            <BiMessageAltError style={{ fontSize: '3rem', }} />
            <span style={{ fontWeight: 'bold' }}>Empty</span>
        </div>
    </div>
  )
}
