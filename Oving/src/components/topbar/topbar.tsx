import './topbar.css'
import { useTheme } from '../themeContext/themeContext'

export const Topbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="topbar">
            <h3>Topbar</h3>
            <button onClick={toggleTheme}>Current Theme: {theme}</button>
        </div>
    )
}