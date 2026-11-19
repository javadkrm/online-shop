import { useAppSelector } from "../../../app/hooks";
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
                  <span className="detail-item__pill">{user.role || "Member"}</span>
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
        </div>
      </article>
    </section>
  );
}

export default Profile;