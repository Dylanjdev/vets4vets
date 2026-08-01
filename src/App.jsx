import { useEffect, useState } from 'react'
import logo from './assets/vetlogo.webp'
import './App.css'

const pages = {
  '/': { label: 'Home', title: 'Veteran Support in Bristol, TN' },
  '/mission': { label: 'Our Mission', title: 'Our Mission' },
  '/services': { label: 'How We Help', title: 'How We Help' },
  '/contact': { label: 'Contact', title: 'Contact Us' },
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

function browserPath(to) {
  return `${basePath}${to}`
}

const services = [
  {
    icon: 'bill',
    number: '01',
    title: 'Bill Pay Assistance',
    short: 'Help with utilities, rent, and essential expenses.',
    detail:
      'When the essentials become difficult to manage, we help veterans explore support for urgent household expenses.',
  },
  {
    icon: 'home',
    number: '02',
    title: 'Housing Support',
    short: 'Resources to help veterans find and maintain housing.',
    detail:
      'We work to connect veterans with practical housing resources that support safety, stability, and independence.',
  },
  {
    icon: 'food',
    number: '03',
    title: 'Food Assistance',
    short: 'Access to food resources and meals when needed.',
    detail:
      'No veteran should have to wonder where the next meal will come from. Reach out and let us help identify options.',
  },
  {
    icon: 'heart',
    number: '04',
    title: 'Addiction Support',
    short: 'Support and resources for recovery and a better tomorrow.',
    detail:
      'Recovery takes courage. We help veterans take the next step toward trusted support, without judgment.',
  },
  {
    icon: 'plus',
    number: '05',
    title: 'And More',
    short: 'We are here to help with a variety of needs.',
    detail:
      'Every situation is different. If you do not see your need listed here, contact us and start the conversation.',
  },
]

const values = [
  {
    icon: 'support',
    title: 'Support',
    text: 'Practical help for the challenges in front of you.',
  },
  {
    icon: 'respect',
    title: 'Respect',
    text: 'Every veteran is met with dignity and understanding.',
  },
  {
    icon: 'honor',
    title: 'Honor',
    text: 'Service and sacrifice are never taken for granted.',
  },
  {
    icon: 'hope',
    title: 'Hope',
    text: 'A steadier future begins with one next step.',
  },
]

function Icon({ name, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    bill: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    food: (
      <>
        <path d="M7 3v8M4 3v5c0 1.7 1.3 3 3 3s3-1.3 3-3V3M7 11v10" />
        <path d="M17 3v18M14 9c0-3.3 1.3-6 3-6v8h3" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        <path d="m7.5 12 2.2.1 1.4-3.2 2.1 6.1 1.3-3h2" />
      </>
    ),
    plus: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    support: (
      <>
        <path d="M7 11a5 5 0 0 1 10 0" />
        <path d="M5 11h2v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2ZM19 11h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
        <path d="M17 17c0 2-1.6 3-4 3" />
      </>
    ),
    respect: (
      <>
        <path d="m12 3 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.5-4.6 2.5.9-5.2-3.8-3.7 5.2-.8L12 3Z" />
      </>
    ),
    honor: (
      <>
        <path d="M12 3 4.5 6v5.5c0 4.5 3.2 7.8 7.5 9.5 4.3-1.7 7.5-5 7.5-9.5V6L12 3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    hope: (
      <>
        <path d="M9 18h6M10 22h4" />
        <path d="M8.4 14.8A6 6 0 1 1 15.6 14.8C14.6 15.5 14 16.5 14 18h-4c0-1.5-.6-2.5-1.6-3.2Z" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    facebook: (
      <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" />
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.6 2.6L16 9" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  }

  return <svg {...common}>{paths[name]}</svg>
}

function BrandMark({ compact = false }) {
  return (
    <div className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`}>
      <img src={logo} alt="" />
      <div>
        <span className="brand-name">VETS<span>4</span>VETS<b>26</b></span>
        {!compact && <small>By veterans, for veterans</small>}
      </div>
    </div>
  )
}

function Link({ to, className = '', children, navigate, onClick, ...props }) {
  const handleClick = (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigate(to)
    onClick?.()
  }

  return (
    <a href={browserPath(to)} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

function Header({ path, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="support-bar">
        <div className="site-container support-bar__inner">
          <span>Veteran in need? You do not have to face it alone.</span>
          <a href="tel:+14235261254">
            <Icon name="phone" size={15} />
            423-526-1254
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <Link
            to="/"
            navigate={navigate}
            onClick={() => setMenuOpen(false)}
            className="brand-link"
            aria-label="VETS4VETS26 home"
          >
            <BrandMark />
          </Link>
          <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
            {Object.entries(pages).map(([href, page]) => (
              <Link
                key={href}
                to={href}
                navigate={navigate}
                onClick={() => setMenuOpen(false)}
                className={path === href ? 'active' : ''}
                aria-current={path === href ? 'page' : undefined}
              >
                {page.label}
              </Link>
            ))}
            <Link
              to="/contact"
              navigate={navigate}
              onClick={() => setMenuOpen(false)}
              className="nav-cta"
            >
              Request Assistance
              <Icon name="arrow" size={18} />
            </Link>
          </nav>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>
    </>
  )
}

function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading--light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function HomePage({ navigate }) {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="site-container home-hero__grid">
          <div className="home-hero__content">
            <span className="eyebrow eyebrow--light">
              <i />
              By veterans, for veterans
            </span>
            <h1>
              No veteran should face the <em>battle alone.</em>
            </h1>
            <p>
              Local, practical support for veterans working toward stability,
              independence, and a better tomorrow.
            </p>
            <div className="button-row">
              <Link to="/contact" navigate={navigate} className="button button--primary">
                Request Assistance
                <Icon name="arrow" size={19} />
              </Link>
              <Link to="/services" navigate={navigate} className="button button--ghost">
                See How We Help
              </Link>
            </div>
            <div className="hero-contact">
              <span>Need to speak with someone?</span>
              <a href="tel:+14235261254">Call 423-526-1254</a>
            </div>
          </div>
          <div className="home-hero__emblem">
            <div className="emblem-glow" aria-hidden="true" />
            <img
              src={logo}
              alt="VETS4VETS26 — because no veteran fights alone"
            />
            <div className="emblem-caption">
              <span>Support</span>
              <i>★</i>
              <span>Respect</span>
              <i>★</i>
              <span>Honor</span>
              <i>★</i>
              <span>Hope</span>
            </div>
          </div>
        </div>
        <div className="hero-edge site-container" aria-hidden="true">
          <span>V4V</span>
          <div />
          <small>Bristol, Tennessee</small>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="site-container intro-grid">
          <div>
            <SectionHeading
              eyebrow="Our Mission"
              title="Service does not end when the uniform comes off."
            />
          </div>
          <div className="intro-copy">
            <p className="lead">
              VETS4VETS26 is a non-profit organization dedicated to helping
              veterans in our community overcome life&apos;s challenges and
              achieve stability and independence.
            </p>
            <p>
              Whether the need is immediate or the next step is simply unclear,
              we are here to listen, connect, and stand with those who served.
            </p>
            <Link to="/mission" navigate={navigate} className="text-link">
              Discover our mission <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="services-section section-pad">
        <div className="site-container">
          <div className="section-title-row">
            <SectionHeading
              eyebrow="How We Help"
              title="Real support for real-life challenges."
              text="A steady hand. A trusted connection. A path forward."
            />
            <Link to="/services" navigate={navigate} className="button button--outline">
              View All Services <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="service-preview-grid">
            {services.slice(0, 4).map((service) => (
              <article className="service-preview" key={service.title}>
                <span className="service-preview__number">{service.number}</span>
                <div className="icon-box">
                  <Icon name={service.icon} size={30} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <Link
                  to="/contact"
                  navigate={navigate}
                  className="service-preview__link"
                  aria-label={`Ask for help with ${service.title}`}
                >
                  <Icon name="arrow" size={20} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pledge-section">
        <div className="site-container pledge-grid">
          <div className="pledge-image-wrap">
            <img src={logo} alt="" />
            <span className="pledge-stamp">
              <b>V4V</b>
              <small>We&apos;ve got your six</small>
            </span>
          </div>
          <div className="pledge-content">
            <span className="eyebrow eyebrow--light">Our Promise</span>
            <blockquote>
              “You fought for us. Now let us fight for you.”
            </blockquote>
            <p>
              If you are a veteran in need of assistance—or know someone who
              could use help—please do not hesitate to contact us.
            </p>
            <Link to="/contact" navigate={navigate} className="button button--primary">
              Start a Conversation <Icon name="arrow" size={19} />
            </Link>
          </div>
        </div>
      </section>

      <ValuesStrip />
      <FinalCta navigate={navigate} />
    </main>
  )
}

function MissionPage({ navigate }) {
  return (
    <main>
      <PageHero
        index="01"
        eyebrow="Our Mission"
        title={<>Honoring those who served. <em>Helping those who need us.</em></>}
        text="Veterans answered the call for our country. We are here to answer theirs."
      />

      <section className="mission-statement section-pad">
        <div className="site-container mission-statement__grid">
          <div className="mission-monogram" aria-hidden="true">
            <span>V</span>
            <b>4</b>
            <span>V</span>
          </div>
          <div>
            <span className="eyebrow">Why We Are Here</span>
            <p className="mission-large">
              VETS4VETS26 is dedicated to helping veterans in our community
              overcome life&apos;s challenges and achieve{' '}
              <strong>stability and independence.</strong>
            </p>
            <div className="mission-two-col">
              <p>
                Service changes a life. So can the transition that follows. A
                sudden bill, unstable housing, food insecurity, or the work of
                recovery can leave even the strongest among us needing backup.
              </p>
              <p>
                Asking for help is not weakness. It is a step forward—and we
                believe that step should be met with respect, practical support,
                and the dignity every veteran has earned.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Four words. One commitment."
            text="The values built into our emblem are the values we bring to every conversation."
            light
          />
          <div className="values-grid">
            {values.map((value, index) => (
              <article className="value-card" key={value.title}>
                <span className="value-card__index">0{index + 1}</span>
                <Icon name={value.icon} size={34} />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="served-section section-pad">
        <div className="site-container served-grid">
          <div className="served-quote">
            <span className="quote-mark">“</span>
            <h2>You served us.<br />Let us serve you.</h2>
          </div>
          <div className="served-copy">
            <p>
              Together, we can make a difference—one veteran, one family, and
              one next step at a time.
            </p>
            <Link to="/contact" navigate={navigate} className="text-link">
              Reach out today <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ValuesStrip />
      <FinalCta navigate={navigate} />
    </main>
  )
}

function ServicesPage({ navigate }) {
  return (
    <main>
      <PageHero
        index="02"
        eyebrow="How We Help"
        title={<>Practical support. <em>A stronger tomorrow.</em></>}
        text="Whatever challenge is in front of you, the first step is reaching out."
      />

      <section className="services-list-section section-pad">
        <div className="site-container">
          <div className="services-intro">
            <SectionHeading
              eyebrow="Veteran Assistance"
              title="Help that meets you where you are."
            />
            <p>
              Needs do not always fit neatly into a category. These are some of
              the ways we support veterans, but they are not the limit of the
              conversation.
            </p>
          </div>
          <div className="services-list">
            {services.map((service) => (
              <article className="service-row" key={service.title}>
                <span className="service-row__number">{service.number}</span>
                <div className="service-row__icon">
                  <Icon name={service.icon} size={32} />
                </div>
                <div className="service-row__body">
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                </div>
                <Link
                  to="/contact"
                  navigate={navigate}
                  className="service-row__action"
                  aria-label={`Ask about ${service.title}`}
                >
                  Ask about this <Icon name="arrow" size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="site-container">
          <SectionHeading
            eyebrow="Getting Started"
            title="One call can change the direction."
            text="You do not need to have everything figured out before you contact us."
            light
          />
          <div className="process-grid">
            {[
              {
                step: '01',
                title: 'Reach Out',
                text: 'Call, email, or send us a message through the contact page.',
              },
              {
                step: '02',
                title: 'Tell Us What You Need',
                text: 'Share what you are facing. We will listen without judgment.',
              },
              {
                step: '03',
                title: 'Take the Next Step',
                text: 'We will help identify practical resources and a path forward.',
              },
            ].map((item) => (
              <article className="process-step" key={item.step}>
                <span>{item.step}</span>
                <div className="process-step__line" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="process-action">
            <p><Icon name="check" size={20} /> Every situation is treated as its own conversation.</p>
            <Link to="/contact" navigate={navigate} className="button button--primary">
              Contact VETS4VETS26 <Icon name="arrow" size={19} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta navigate={navigate} />
    </main>
  )
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget

    setFormStatus('submitting')

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')

      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main>
      <PageHero
        index="03"
        eyebrow="Contact Us"
        title={<>You do not have to do this <em>alone.</em></>}
        text="If you are a veteran in need—or know one who is—start the conversation today."
      />

      <section className="contact-section section-pad">
        <div className="site-container contact-grid">
          <div className="contact-details">
            <span className="eyebrow">Our Office</span>
            <h2>We are ready to listen.</h2>
            <p className="contact-intro">
              Call, email, or use the form. Tell us what you are facing and how
              we can reach you.
            </p>

            <div className="contact-cards">
              <a className="contact-card" href="tel:+14235261254">
                <span><Icon name="phone" size={25} /></span>
                <div>
                  <small>Phone</small>
                  <strong>423-526-1254</strong>
                  <em>Tap to call</em>
                </div>
              </a>
              <a className="contact-card" href="mailto:vets4vets2026@outlook.com">
                <span><Icon name="mail" size={25} /></span>
                <div>
                  <small>Email</small>
                  <strong>vets4vets2026@outlook.com</strong>
                  <em>Send an email</em>
                </div>
              </a>
              <a
                className="contact-card"
                href="https://www.google.com/maps/search/?api=1&query=620+State+Street+STE+3008+Bristol+TN+37630"
                target="_blank"
                rel="noreferrer"
              >
                <span><Icon name="pin" size={25} /></span>
                <div>
                  <small>Office</small>
                  <strong>620 State Street, STE 3008</strong>
                  <em>Bristol, TN 37630</em>
                </div>
              </a>
              <a
                className="contact-card"
                href="https://www.facebook.com/profile.php?id=61591806393934"
                target="_blank"
                rel="noreferrer"
              >
                <span><Icon name="facebook" size={25} /></span>
                <div>
                  <small>Facebook</small>
                  <strong>VETS4VETS26</strong>
                  <em>Visit our Facebook page</em>
                </div>
              </a>
            </div>
          </div>

          <div className="form-panel">
            <div className="form-panel__head">
              <span>Request Assistance</span>
              <b>A simple first step</b>
            </div>
            <form
              action="https://formspree.io/f/mgogjpbe"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="Veteran assistance request" />
              <div className="field-row">
                <label>
                  Your Name <span>*</span>
                  <input name="name" type="text" autoComplete="name" required placeholder="Full name" />
                </label>
                <label>
                  Phone Number
                  <input name="phone" type="tel" autoComplete="tel" placeholder="(000) 000-0000" />
                </label>
              </div>
              <label>
                Email Address <span>*</span>
                <input name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
              </label>
              <label>
                How Can We Help? <span>*</span>
                <select name="need" defaultValue="" required>
                  <option value="" disabled>Select an area of need</option>
                  <option>Bill Pay Assistance</option>
                  <option>Housing Support</option>
                  <option>Food Assistance</option>
                  <option>Addiction Support</option>
                  <option>Another Need</option>
                </select>
              </label>
              <label>
                Tell Us a Little More <span>*</span>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Share only what you are comfortable sharing."
                />
              </label>
              <button
                className="button button--primary form-submit"
                type="submit"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Sending…' : 'Send Request'}
                {formStatus !== 'submitting' && <Icon name="arrow" size={19} />}
              </button>
              <p className="form-note">
                Your request will be sent securely to VETS4VETS26. For immediate contact, call{' '}
                <a href="tel:+14235261254">423-526-1254</a>.
              </p>
              {formStatus === 'success' && (
                <p className="form-message form-success" role="status">
                  <Icon name="check" size={19} />
                  Your request was sent. We will be in touch soon.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="form-message form-error" role="alert">
                  We could not send your request. Please try again or call 423-526-1254.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="contact-closer">
        <div className="site-container">
          <span>Together, we can make a difference.</span>
          <h2>You fought for us.<br />Now let us fight for you.</h2>
          <p>No veteran should face the battle alone.</p>
        </div>
      </section>
    </main>
  )
}

function PageHero({ index, eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="site-container page-hero__inner">
        <div>
          <span className="eyebrow eyebrow--light"><i /> {eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <span className="page-hero__index" aria-hidden="true">{index}</span>
      </div>
    </section>
  )
}

function ValuesStrip() {
  return (
    <div className="values-strip" aria-label="Our values">
      <div className="site-container">
        {values.map((value) => (
          <span key={value.title}>
            <Icon name={value.icon} size={19} />
            {value.title}
          </span>
        ))}
      </div>
    </div>
  )
}

function FinalCta({ navigate }) {
  return (
    <section className="final-cta section-pad">
      <div className="final-cta__star" aria-hidden="true">★</div>
      <div className="site-container final-cta__inner">
        <div>
          <span className="eyebrow">We&apos;ve Got Your Six</span>
          <h2>Together, we can make a difference.</h2>
        </div>
        <div>
          <p>
            Are you a veteran in need, or do you know someone who could use help?
          </p>
          <Link to="/contact" navigate={navigate} className="button button--dark">
            Reach Out Today <Icon name="arrow" size={19} />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div className="footer-brand">
          <BrandMark />
          <p>
            Honoring those who served.<br />
            Helping those who need us.
          </p>
        </div>
        <div className="footer-nav">
          <span>Explore</span>
          {Object.entries(pages).map(([href, page]) => (
            <Link key={href} to={href} navigate={navigate}>{page.label}</Link>
          ))}
        </div>
        <div className="footer-contact">
          <span>Contact</span>
          <a href="tel:+14235261254">423-526-1254</a>
          <a href="mailto:vets4vets2026@outlook.com">vets4vets2026@outlook.com</a>
          <a
            className="footer-facebook"
            href="https://www.facebook.com/profile.php?id=61591806393934"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="facebook" size={16} />
            Facebook: VETS4VETS26
          </a>
          <p>620 State Street, STE 3008<br />Bristol, TN 37630</p>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <p>© {new Date().getFullYear()} VETS4VETS26. All rights reserved.</p>
        <strong>You served us. Let us serve you.</strong>
        <span>A non-profit organization supporting veterans.</span>
      </div>
    </footer>
  )
}

function App() {
  const normalizePath = () => {
    let current = window.location.pathname

    if (basePath && current.startsWith(`${basePath}/`)) {
      current = current.slice(basePath.length)
    }

    current = current.replace(/\/+$/, '') || '/'
    return pages[current] ? current : '/'
  }
  const [path, setPath] = useState(normalizePath)

  const navigate = (to) => {
    if (to === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.history.pushState({}, '', browserPath(to))
    setPath(to)
  }

  useEffect(() => {
    const onPopState = () => setPath(normalizePath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.title = `${pages[path].title} | VETS4VETS26`
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [path])

  let page
  if (path === '/mission') page = <MissionPage navigate={navigate} />
  else if (path === '/services') page = <ServicesPage navigate={navigate} />
  else if (path === '/contact') page = <ContactPage />
  else page = <HomePage navigate={navigate} />

  return (
    <div className="app-shell">
      <Header path={path} navigate={navigate} />
      <div className="page" key={path}>{page}</div>
      <Footer navigate={navigate} />
    </div>
  )
}

export default App
