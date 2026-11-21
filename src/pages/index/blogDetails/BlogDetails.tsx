import { Link, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../../features/blog/services/blogApi";
import "./BlogDetails.scss";

function BlogDetails() {
  const { id } = useParams();
  const postId = Number(id);
  const isValidPostId = Number.isInteger(postId) && postId > 0;

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useGetPostByIdQuery(postId, {
    skip: !isValidPostId,
  });

  if (!isValidPostId) {
    return (
      <main className="blog-details">
        <div className="blog-details__status">
          <span className="blog-details__status-icon" aria-hidden="true">!</span>
          <h1>Invalid article link</h1>
          <p>The article address is not valid.</p>
          <Link className="blog-details__back-button" to="/blog">Back to all articles</Link>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="blog-details">
        <div className="blog-details__loading" aria-label="Loading article" aria-busy="true">
          <span className="blog-details__loading-art" />
          <span className="blog-details__loading-line blog-details__loading-line--short" />
          <span className="blog-details__loading-line blog-details__loading-line--title" />
          <span className="blog-details__loading-line" />
          <span className="blog-details__loading-line blog-details__loading-line--medium" />
        </div>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="blog-details">
        <div className="blog-details__status" role="alert">
          <span className="blog-details__status-icon" aria-hidden="true">!</span>
          <h1>Article unavailable</h1>
          <p>We couldn’t load this article. Check your connection and try again.</p>
          <div className="blog-details__status-actions">
            <button className="blog-details__back-button" type="button" onClick={refetch}>
              Try again
            </button>
            <Link className="blog-details__back-link" to="/blog">Back to all articles</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-details">
      <Link className="blog-details__back-link" to="/blog">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15 18-6-6 6-6M9 12h12" />
        </svg>
        All articles
      </Link>

      <article className="blog-details__article">
        <div className="blog-details__cover" aria-hidden="true">
          <span className="blog-details__cover-mark">J</span>
          <span className="blog-details__cover-label">
            The shop journal <span>/</span> {String(post.id).padStart(2, "0")}
          </span>
        </div>

        <div className="blog-details__body">
          <header className="blog-details__header">
            <div className="blog-details__tags" aria-label="Article topics">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{post.title}</h1>
            <div className="blog-details__metrics" aria-label="Article statistics">
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
                {post.views.toLocaleString()} views
              </span>
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10v11H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3Zm0 0 4-7a3 3 0 0 1 2 3v4h5a3 3 0 0 1 3 3l-1.5 6a2.5 2.5 0 0 1-2.5 2H7" />
                </svg>
                {post.reactions.likes.toLocaleString()} likes
              </span>
            </div>
          </header>

          <div className="blog-details__content">
            <p>{post.body}</p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default BlogDetails;
