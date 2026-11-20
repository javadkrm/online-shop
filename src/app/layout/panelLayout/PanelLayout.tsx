import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../../features/auth/authSlice'
import { removeAuthUser } from '../../../features/auth/services/authStorage'
import ThemeToggle from '../../../components/ui/theme/ThemeToggle'
import './PanelLayout.scss'

const navigationGroups = [
    {
        label: 'Management',
        items: [
            { label: 'Dashboard', to: '/panel', icon: '⌂', end: true },
            { label: 'Products', to: '/panel/products', icon: '▦' },
            { label: 'Categories', to: '/panel/categories', icon: '◫' },
            { label: 'Orders', to: '/panel/orders', icon: '▤' },
            { label: 'Comments', to: '/panel/comments', icon: '◌' },
            { label: 'Users', to: '/panel/users', icon: '♙' },
        ],
    },
    {
        label: 'System',
        items: [
            { label: 'Reports', to: '/panel/reports', icon: '▥' },
            { label: 'Settings', to: '/panel/settings', icon: '⚙' },
        ],
    },
]

function PanelLayout() {
    const dispatch = useAppDispatch()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const handleLogout = () => {
        removeAuthUser()
        dispatch(logout())
    }

    return (
        <div className="panel-layout">
            <button
                type="button"
                className="panel-menu-toggle"
                aria-label={isSidebarOpen ? 'Close panel menu' : 'Open panel menu'}
                aria-expanded={isSidebarOpen}
                onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
            >
                <span />
                <span />
                <span />
            </button>

            <aside className={`panel-sidebar${isSidebarOpen ? ' is-open' : ''}`}>
                <div className="panel-brand">
                    <span className="panel-brand-mark" aria-hidden="true">S</span>
                    <div>
                        <strong>Shop Admin</strong>
                        <span>Management Panel</span>
                    </div>
                </div>

                <nav className="panel-navigation" aria-label="Panel navigation">
                    {navigationGroups.map((group) => (
                        <div className="panel-navigation-group" key={group.label}>
                            <p className="panel-navigation-heading">{group.label}</p>
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={'end' in item ? item.end : false}
                                    className={({ isActive }) =>
                                        `panel-nav-link${isActive ? ' is-active' : ''}`
                                    }
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <span className="panel-nav-icon" aria-hidden="true">
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                <ThemeToggle />

                <button
                    type="button"
                    className="panel-logout"
                    onClick={handleLogout}
                >
                    <span className="panel-nav-icon" aria-hidden="true">↪</span>
                    <span>Log out</span>
                </button>
            </aside>

            <main className="panel-content">
                <Outlet />
            </main>
        </div>
    )
}

export function PanelSection({ section }: { section: string }) {
    const currentSection = section
    const title = currentSection.charAt(0).toUpperCase() + currentSection.slice(1)

    return (
        <section className="panel-section">
            <p className="panel-section-eyebrow">Shop Management</p>
            <h1>{title}</h1>
            {currentSection === 'dashboard' ? (
                <p>Welcome to your store management panel.</p>
            ) : (
                <p>The {title.toLowerCase()} management page is coming soon.</p>
            )}
        </section>
    )
}

export default PanelLayout