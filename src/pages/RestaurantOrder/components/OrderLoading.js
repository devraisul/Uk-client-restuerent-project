import React from 'react'

export default function OrderLoading() {
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
                <span style={{ fontWeight: 'bold' }}>Loading...</span>
            </div>
        </div>
    )
}
