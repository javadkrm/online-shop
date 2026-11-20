import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Slider.scss"

interface SlideItem {
    id: number
    badge: string
    title: string
    subtitle: string
    discountText: string
    ctaLabel: string
    ctaHref: string
    imageUrl: string
    imageAlt: string
}

const SLIDES: SlideItem[] = [
    {
        id: 1,
        badge: "Seasonal Sale",
        title: "Save up to 40% on selected products",
        subtitle: "Discover this week's best deals, with fast delivery and trusted quality.",
        discountText: "Up to 40% off",
        ctaLabel: "Shop the deals",
        ctaHref: "/products",
        imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Shopping bags and discounted packages"
    },
    {
        id: 2,
        badge: "Featured Tech",
        title: "Everyday tech and smart gadgets",
        subtitle: "Limited-time offers on headphones, smartwatches, and everyday accessories.",
        discountText: "Up to 30% off",
        ctaLabel: "Shop electronics",
        ctaHref: "/products",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "Wireless headphones featured in a promotion"
    },
    {
        id: 3,
        badge: "End-of-Season Sale",
        title: "Everyday style and trending accessories",
        subtitle: "Discover quality essentials and affordable picks for every day.",
        discountText: "Up to 50% off",
        ctaLabel: "Explore the collection",
        ctaHref: "/products",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
        imageAlt: "People shopping for clothing and accessories"
    }
]

interface SliderProps {
    autoPlayInterval?: number
}

function Slider({ autoPlayInterval = 5000 }: SliderProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const totalSlides = SLIDES.length

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }

    useEffect(() => {
        if (isPaused || totalSlides <= 1) return

        const timer = window.setInterval(() => {
            setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
        }, autoPlayInterval)

        return () => window.clearInterval(timer)
    }, [isPaused, totalSlides, autoPlayInterval])

    return (
        <section
            className="promo-slider"
            aria-label="Seasonal offers"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="promo-slider__viewport">
                <div
                    className="promo-slider__track"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {SLIDES.map((slide) => (
                        <article key={slide.id} className="promo-slide">
                            <img
                                src={slide.imageUrl}
                                alt={slide.imageAlt}
                                className="promo-slide__image"
                                loading={slide.id === 1 ? "eager" : "lazy"}
                            />
                            <div className="promo-slide__overlay" />

                            <div className="promo-slide__content">
                                <div className="promo-slide__tags">
                                    <span className="promo-slide__badge">{slide.badge}</span>
                                    <span className="promo-slide__discount">{slide.discountText}</span>
                                </div>

                                <h2 className="promo-slide__title">{slide.title}</h2>
                                <p className="promo-slide__subtitle">{slide.subtitle}</p>

                                <Link to={slide.ctaHref} className="promo-slide__cta">
                                    {slide.ctaLabel}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <button
                    type="button"
                    className="promo-slider__arrow promo-slider__arrow--prev"
                    onClick={handlePrev}
                    aria-label="Previous slide"
                >
                    ‹
                </button>

                <button
                    type="button"
                    className="promo-slider__arrow promo-slider__arrow--next"
                    onClick={handleNext}
                    aria-label="Next slide"
                >
                    ›
                </button>
            </div>

            <div className="promo-slider__dots" role="tablist" aria-label="Choose a slide">
                {SLIDES.map((slide, index) => (
                    <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-selected={index === activeIndex}
                        aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                        className={`promo-slider__dot ${
                            index === activeIndex ? "is-active" : ""
                        }`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </section>
    )
}

export default Slider