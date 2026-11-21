import BlogList from "../../../features/blog/components/blogList/BlogList"
import "./Blog.scss"

function Blog () {
    return (
        <div className="blog-page">
            <header className="blog-page__hero">
                <p className="blog-page__eyebrow">The shop journal</p>
                <h1>Stories &amp; insights</h1>
                <p>Discover fresh ideas, useful guides, and inspiration for everyday life.</p>
            </header>
            <BlogList/>
        </div>
    )
}

export default Blog