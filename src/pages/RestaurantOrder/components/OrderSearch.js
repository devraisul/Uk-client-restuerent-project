import React, { useContext } from 'react'
import { AdminOrderContext } from '../context/AdminOrderContext'

export default function OrderSearch({placeholder,borderColor}) {
  const {handleSearchInput} = useContext(AdminOrderContext)
  return (
    <form style={{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    }}>
        <input
            onChange={(e) => { handleSearchInput(e) }}
            style={{
                width: '70%',
                padding: '10px 10px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                outline: 'none',
                marginBottom: '10px',
                fontSize: '1rem',
                
            }}
            type="text"
            placeholder={placeholder}
        />
    </form>
  )
}
