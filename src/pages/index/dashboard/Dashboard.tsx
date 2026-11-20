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
          <h1>Dashboard unavailable</h1>
          <p>Sign in to view your account dashboard.</p>
          <Link className="dashboard-link" to="/login">
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

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="dashboard-eyebrow">Account overview</p>
        <h1>Welcome back, {user.name}</h1>
        <p>Here is a quick overview of your shop account.</p>
      </header>

      <section className="dashboard-stats" aria-label="Account summary">
        <article className="dashboard-stat">
          <span>Account</span>
          <strong>Active</strong>
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
            Browse products
          </Link>
        </section>

        <section className="dashboard-panel">
          <p className="dashboard-eyebrow">Shortcuts</p>
          <h2>Quick links</h2>
          <div className="dashboard-shortcuts">
            <Link to="/profile">View profile</Link>
            <Link to="/cart">Open cart</Link>
            <Link to="/products">Shop products</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
