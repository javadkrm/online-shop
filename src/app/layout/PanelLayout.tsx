import { Outlet } from 'react-router-dom'

function PanelLayout() {
    return (
        <div className="panel-layout">
            <aside>
                Panel Sidebar
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default PanelLayout