import React, { useContext } from 'react'
import { AdminOrderContext } from '../context/AdminOrderContext'
import styles from './OrderSearch.module.css'

export default function OrderSearch({ placeholder, borderColor }) {
  const { handleSearchInput } = useContext(AdminOrderContext)
  return (
    <form className={styles.searchFieldForm}>
      <input
        className={styles.searchField}
        // DYNAMIC STYLE 
        style={{ border: `1px solid ${borderColor}` }}
        
        onChange={(e) => { handleSearchInput(e) }}
        type="text"
        placeholder={placeholder}
      />
    </form>
  )
}
