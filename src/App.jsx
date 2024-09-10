import { useState, useEffect } from 'react'

import AppRouter from './router/Router'
import useStore from './stores/useStore'
import { isTokenExpired } from './Utils/TokenChecker'
import { JobIdProvider } from './ContextHooks/JobContext/JobDetails'
function App() {
    function checkToken() {
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (!token || !user || isTokenExpired(token)) {
            alert('Your session has expired. Please log in again.')

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('auth')
            window.location.href = '/login'
        }
    }
    useEffect(() => {
        const interval = setInterval(checkToken, 5 * 60 * 1000)
        console.log('toekn interval', interval) // 5 minutes in milliseconds
        return () => clearInterval(interval) // Clean up on component unmount
    }, [])
    return (
        <>
            <JobIdProvider>
                <AppRouter />
            </JobIdProvider>
        </>
    )
}

export default App
