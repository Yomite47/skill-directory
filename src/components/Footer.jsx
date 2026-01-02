export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        <div className="footer-columns">


          <div className="footer-col">
            <div className="footer-heading">Contact</div>
            <a
              className="footer-link"
              href="mailto:olafolarin47@gmail.com"
              aria-label="Email olafolarin47@gmail.com"
            >
              olafolarin47@gmail.com
            </a>

          </div>

          <div className="footer-col">
            <div className="footer-heading">Follow Us</div>
            <div className="socials" aria-label="Contact and social links">
              <a
                className="social-link"
                href="https://twitter.com/folarihn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter @folarihn"
              >
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 5.92c-.66.29-1.37.48-2.11.57.76-.45 1.34-1.16 1.62-2.01-.71.42-1.49.73-2.33.9A3.6 3.6 0 0012.3 8.5c0 .28.03.56.09.83C8.3 9.95 5.1 8 2.9 5.04c-.31.53-.49 1.14-.49 1.8 0 1.24.63 2.33 1.6 2.97-.58-.02-1.12-.18-1.6-.44v.04c0 1.73 1.23 3.17 2.86 3.49-.3.08-.61.12-.93.12-.23 0-.45-.02-.66-.06.45 1.41 1.75 2.44 3.29 2.47A7.2 7.2 0 012 19.54a10.15 10.15 0 005.5 1.61c6.59 0 10.2-5.45 10.2-10.18 0-.16 0-.32-.01-.48.7-.5 1.3-1.12 1.78-1.84-.65.28-1.36.48-2.09.57z"/>
                  </svg>
                </span>
                <span className="social-text">@folarihn</span>
              </a>

              <a
                className="social-link"
                href="https://www.youtube.com/@folarihn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube folarihn"
              >
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.5 6.2a3 3 0 00-2.12-2.13C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.38.57A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.12 2.13C4.4 20.5 12 20.5 12 20.5s7.6 0 9.38-.57a3 3 0 002.12-2.13A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                </span>
                <span className="social-text">YouTube</span>
              </a>

              <a
                className="social-link"
                href="https://www.linkedin.com/in/folarihn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn folarihn"
              >
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.09.88 1.98 1.98 1.98 1.09 0 1.98-.89 1.98-1.98 0-1.1-.89-1.98-1.98-1.98zM3.5 8.75H6.5V20.5H3.5V8.75zM9.5 8.75H12.3V10.1h.04c.39-.74 1.34-1.52 2.77-1.52 2.96 0 3.51 1.95 3.51 4.48v7.44H15.6v-6.6c0-1.58-.03-3.62-2.21-3.62-2.21 0-2.55 1.73-2.55 3.52v6.69H9.5V8.75z"/>
                  </svg>
                </span>
                <span className="social-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Skill Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
