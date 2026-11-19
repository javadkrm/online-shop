import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../../features/auth/authSlice";
import { removeAuthUser } from "../../../features/auth/services/authStorage";
import "./Profile.scss";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <section className="profile-page" aria-label="User Profile">
        <div className="profile-card profile-card--empty">
          <div className="profile-card__avatar-placeholder" />
          <h1 className="profile-card__title">Profile Unavailable</h1>
          <p className="profile-card__subtitle">
            Sign in to view your account details and role permissions.
          </p>
        </div>
      </section>
    );
  }

  const initials = getInitials(user.name) || "U";

  const logoutHandler = () => {
    removeAuthUser();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section className="profile-page" aria-label="User Profile">
      <article className="profile-card">
        {/* Top Banner & Avatar */}
        <div className="profile-card__banner" />

        <div className="profile-card__body">
          <div className="profile-card__header">
            <div className="profile-card__identity">
              <div className="profile-card__avatar-wrap">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User avatar"}
                    className="profile-card__avatar"
                  />
                ) : (
                  <div className="profile-card__avatar profile-card__avatar--fallback">
                    {initials}
                  </div>
                )}
                <span
                  className="profile-card__status-dot"
                  title="Active account"
                />
              </div>

              <div className="profile-card__title-group">
                <div className="profile-card__name-row">
                  <h1 className="profile-card__name">
                    {user.name || "Unnamed User"}
                  </h1>
                  {user.role && (
                    <span className="profile-card__badge">{user.role}</span>
                  )}
                </div>
                <p className="profile-card__email-sub">
                  {user.email || "No email provided"}
                </p>
              </div>
            </div>

            <div className="profile-card__actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => console.log("Edit profile clicked")}
              >
                Edit Profile
              </button>
            </div>
          </div>

          <hr className="profile-card__divider" />

          {/* Details Grid */}
          <div className="profile-details">
            <h2 className="profile-details__heading">Account Information</h2>

            <dl className="profile-details__grid">
              <div className="detail-item">
                <dt className="detail-item__label">Full Name</dt>
                <dd className="detail-item__value">{user.name || "—"}</dd>
              </div>

              <div className="detail-item">
                <dt className="detail-item__label">Email Address</dt>
                <dd className="detail-item__value">{user.email || "—"}</dd>
              </div>

              <div className="detail-item">
                <dt className="detail-item__label">Role</dt>
                <dd className="detail-item__value">
                  <span className="detail-item__pill">
                    {user.role || "Member"}
                  </span>
                </dd>
              </div>

              <div className="detail-item">
                <dt className="detail-item__label">Account Status</dt>
                <dd className="detail-item__value detail-item__value--success">
                  Verified &amp; Active
                </dd>
              </div>
            </dl>
          </div>

          <hr className="profile-card__divider" />

          {/* Session Footer with Prominent Logout Button */}
          <div className="profile-footer">
            <div className="profile-footer__info">
              <h3 className="profile-footer__title">Session</h3>
              <p className="profile-footer__desc">
                Sign out of your account on this device.
              </p>
            </div>

            <button
              type="button"
              className="btn btn--danger btn--logout"
              onClick={logoutHandler}
            >
              <svg
                className="btn__icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Profile;