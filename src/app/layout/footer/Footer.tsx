import './Footer.scss'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* ستون اول: درباره فروشگاه */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-icon">🛍️</span>
            <h3>Shop Management</h3>
          </div>
          <p className="footer-desc">
            فروشگاه ما با ارائه بهترین محصولات و تضمین اصالت کالا، تجربه‌ای امن و لذت‌بخش از خرید آنلاین را برای شما فراهم می‌کند.
          </p>
          <div className="social-links">
            <a href="#instagram" aria-label="Instagram" className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#telegram" aria-label="Telegram" className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.198 2.433a2.242 2.242 0 0 0-2.002.377L2.4 14.316a2.25 2.25 0 0 0 .142 3.824l4.512 1.805 1.764 5.292a1.125 1.125 0 0 0 1.956.324l2.673-3.15 4.886 3.665a2.25 2.25 0 0 0 3.51-1.353l3.25-16.25a2.25 2.25 0 0 0-1.885-2.64z"/></svg>
            </a>
            <a href="#twitter" aria-label="Twitter" className="social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
          </div>
        </div>

        {/* ستون دوم: لینک‌های سریع */}
        <div className="footer-col">
          <h4 className="footer-title">لینک‌های سریع</h4>
          <ul className="footer-links">
            <li><a href="#home">صفحه اصلی</a></li>
            <li><a href="#products">محصولات</a></li>
            <li><a href="#categories">دسته‌بندی‌ها</a></li>
            <li><a href="#about">درباره ما</a></li>
            <li><a href="#contact">تماس با ما</a></li>
          </ul>
        </div>

        {/* ستون سوم: خدمات مشتریان */}
        <div className="footer-col">
          <h4 className="footer-title">خدمات مشتریان</h4>
          <ul className="footer-links">
            <li><a href="#faq">سؤالات متداول</a></li>
            <li><a href="#shipping">رویه ارسال سفارش</a></li>
            <li><a href="#returns">شرایط بازگشت کالا</a></li>
            <li><a href="#privacy">حریم خصوصی</a></li>
          </ul>
        </div>

        {/* ستون چهارم: خبرنامه */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-title">خبرنامه</h4>
          <p className="footer-desc">برای اطلاع از آخرین تخفیف‌ها و محصولات جدید، ایمیل خود را وارد کنید.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="ایمیل شما..." 
              required 
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">عضویت</button>
          </form>
        </div>
      </div>

      {/* بخش پایینی: کپی‌رایت */}
      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p>&copy; {new Date().getFullYear()} Shop Management. تمامی حقوق محفوظ است.</p>
          <div className="footer-badges">
            <span>🔒 خرید امن</span>
            <span>⭐ پشتیبانی 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;