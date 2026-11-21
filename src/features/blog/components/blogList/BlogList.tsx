import { useState } from "react";
import { useGetPostsQuery } from "../../services/blogApi";
import BlogCard from "../BlogCard/BlogCard";
import "./BLogList.scss";

function BlogList() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetPostsQuery({ page: currentPage, limit });

    const totalPages = Math.ceil((data?.total ?? 0) / limit) || 1;

    if (isLoading) {
        return (
            <section className="blog-list" aria-labelledby="blog-list-title">
                <header className="blog-list__header">
                    <div>
                        <p className="blog-list__eyebrow">From the journal</p>
                        <h2 id="blog-list-title">Latest articles</h2>
                        <p className="blog-list__description">
                            Ideas, inspiration, and stories from our team.
                        </p>
                    </div>
                </header>

                <ul className="blog-list__grid" aria-label="Loading articles">
                    {Array.from({ length: 6 }, (_, index) => (
                        <li className="blog-list__skeleton" key={index} aria-hidden="true">
                            <span className="blog-list__skeleton-art" />
                            <span className="blog-list__skeleton-line blog-list__skeleton-line--short" />
                            <span className="blog-list__skeleton-line blog-list__skeleton-line--title" />
                            <span className="blog-list__skeleton-line" />
                            <span className="blog-list__skeleton-line blog-list__skeleton-line--short" />
                        </li>
                    ))}
                </ul>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="blog-list" aria-labelledby="blog-list-title">
                <div className="blog-list__status blog-list__status--error" role="alert">
                    <span className="blog-list__status-icon" aria-hidden="true">!</span>
                    <h2 id="blog-list-title">Articles couldn’t be loaded</h2>
                    <p>Something went wrong while loading the articles. Please try again.</p>
                    <button className="blog-list__retry" type="button" onClick={refetch}>
                        Try again
                    </button>
                </div>
            </section>
        );
    }

    const posts = data?.posts ?? [];

    return (
        <section className="blog-list" aria-labelledby="blog-list-title">
            <header className="blog-list__header">
                <div>
                    <p className="blog-list__eyebrow">From the journal</p>
                    <h2 id="blog-list-title">Latest articles</h2>
                    <p className="blog-list__description">
                        Ideas, inspiration, and stories from our team.
                    </p>
                </div>
                <span className="blog-list__count">
                    {data?.total ?? posts.length} articles
                </span>
            </header>

            {isFetching && (
                <p className="blog-list__updating" role="status">Updating articles…</p>
            )}

            {posts.length > 0 ? (
                <ul className="blog-list__grid">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <BlogCard post={post} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="blog-list__status">
                    <h2>No articles yet</h2>
                    <p>Check back soon for fresh stories and ideas.</p>
                </div>
            )}

            {posts.length > 0 && (
                <nav className="blog-list__pagination" aria-label="Article pagination">
                    <button
                        type="button"
                        className="blog-list__pagination-btn"
                        onClick={() => setCurrentPage((page) => page - 1)}
                        disabled={currentPage === 1 || isFetching}
                    >
                        Previous
                    </button>

                    <div className="blog-list__pagination-info" aria-live="polite">
                        <span className="blog-list__current-page">{currentPage}</span>
                        {" "}of{" "}
                        <span>{totalPages}</span>
                    </div>

                    <button
                        type="button"
                        className="blog-list__pagination-btn"
                        onClick={() => setCurrentPage((page) => page + 1)}
                        disabled={currentPage === totalPages || isFetching}
                    >
                        Next
                    </button>
                </nav>
            )}
        </section>
    );
}

export default BlogList;
