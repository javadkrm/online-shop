import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import "./Dashboard.scss";

function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);

  if (!user) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-empty">
          <p className="dashboard-eyebrow">Account access</p>
          <h1>Dashboard unavailable</h1>
          <p>Sign in to view your account dashboard.</p>
          <Link className="dashboard-link dashboard-link--primary" to="/login">
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="dashboard-header__content">
            <p className="dashboard-eyebrow">Account overview</p>
            <h1>Welcome back, {user.name}</h1>
            <p>Here is a quick overview of your shop account.</p>
          </div>
          <div className="dashboard-avatar" aria-hidden="true">
            {initials || "U"}
          </div>
        </header>

        <section className="dashboard-stats" aria-label="Account summary">
          <article className="dashboard-stat dashboard-stat--status">
            <span>Account</span>
            <strong>
              <span className="status-dot" aria-hidden="true" />
              Active
            </strong>
            <small>{user.email}</small>
          </article>

          <article className="dashboard-stat">
            <span>Items in cart</span>
            <strong>{cartItemCount}</strong>
            <small>{cartItems.length} different products</small>
          </article>

          <article className="dashboard-stat">
            <span>Cart total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
            <small>Based on your current cart</small>
          </article>
        </section>

        <div className="dashboard-panels">
          <section className="dashboard-panel">
            <div>
              <p className="dashboard-eyebrow">Orders</p>
              <h2>Order history</h2>
              <p>
                Order history is not available yet. Orders will appear here once
                checkout is connected.
              </p>
            </div>
            <Link className="dashboard-link" to="/products">
              Browse products →
            </Link>
          </section>

          <section className="dashboard-panel">
            <div>
              <p className="dashboard-eyebrow">Shortcuts</p>
              <h2>Quick links</h2>
              <div className="dashboard-shortcuts">
                <Link to="/profile">View profile</Link>
                <Link to="/cart">Open cart</Link>
                <Link to="/products">Shop products</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;