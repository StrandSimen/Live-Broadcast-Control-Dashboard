import { Sidebar } from '../../components/sidebar/sidebar'
import { Topbar } from '../../components/topbar/topbar'
import { Footer } from '../../components/footer/footer'
import { MainContent } from '../../components/main-content/mainContent'
import { UptimeProvider } from '../../components/hooks/uptimeContext'
import './dashboard.css'

export const DashBoard = () => {
    return (
        <UptimeProvider>
            <div className="dashboard-container">
                <Topbar />
                <Sidebar />
                <MainContent />
                <Footer />
            </div>
        </UptimeProvider>
    )
}