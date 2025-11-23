'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
    theme: Theme
    toggleTheme: () => void
}>({
    theme: 'dark',
    toggleTheme: () => { },
})

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        // Apply theme to document root
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
