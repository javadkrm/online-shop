import { Link } from "react-router-dom";
import type { BlogPost } from "../../types/blogType";
import "./BLogCard.scss";

interface BlogCardProps {
    post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            to={`/blog/${post.id}`}
            className="blog-card-link"
            aria-label={`Read article: ${post.title}`}
        >
            <article className="blog-card">
                <div className="blog-card__visual" aria-hidden="true">
                    <span className="blog-card__visual-mark">J</span>
                    <span className="blog-card__visual-label">Journal / {String(post.id).padStart(2, "0")}</span>
                </div>

                <div className="blog-card__content">
                    <div className="blog-card__tags" aria-label="Article topics">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>

                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.body}</p>

                    <footer className="blog-card__footer">
                        <span className="blog-card__metric">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
                                <circle cx="12" cy="12" r="2.5" />
                            </svg>
                            {post.views.toLocaleString()} views
                        </span>
                        <span className="blog-card__metric">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7 10v11H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3Zm0 0 4-7a3 3 0 0 1 2 3v4h5a3 3 0 0 1 3 3l-1.5 6a2.5 2.5 0 0 1-2.5 2H7" />
                            </svg>
                            {post.reactions.likes.toLocaleString()}
                        </span>
                    </footer>
                </div>
            </article>
        </Link>
    );
}

export default BlogCard;
