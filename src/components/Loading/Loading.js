import React from 'react'

export default function Loading() {
  return (
    <div style={{
      height:'100vh',
      width:'100%',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      position:'relative',
    }}>
      <span style={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        color:'#f5882f',
        fontSize:'1.2rem',
        fontWeight:'bold'
      }}>Loading..</span>
      <span id='loadingIcon'> </span>
    </div>
  )
}
