import React, { createContext } from 'react'


export const AdminReviewContext = createContext([])


export default function AdminReviewProvider({children}) {
    const providerValue = { }

  return (
    <AdminReviewContext.Provider value={providerValue}>
      {children}
    </AdminReviewContext.Provider> 
  )
}
