import { MotionController } from "./motion-controller";

const reservationPhone = "+38349840222";

const menuHighlights = [
  {
    number: "01",
    title: "Mëngjesi i bjeshkës",
    text: "Djathë vendi, vezë, kos, perime të freskëta dhe bukë e ngrohtë.",
  },
  {
    number: "02",
    title: "Flia e shtëpisë",
    text: "E pjekur ngadalë, e servirur me ajkë dhe shije të thjeshta të vendit.",
  },
  {
    number: "03",
    title: "Nga skara & stina",
    text: "Mish i zgjedhur, perime të pjekura dhe erëza të freskëta të malit.",
  },
];

const experiences = [
  {
    index: "01",
    title: "Shije me pamje",
    text: "Një tryezë e ngrohtë përballë horizontit të Strellcit.",
    className: "experience-card experience-card--forest",
  },
  {
    index: "02",
    title: "Kalërim në natyrë",
    text: "Dilni përtej tarracës dhe përjetoni malin me ritmin e tij.",
    className: "experience-card experience-card--stone",
  },
  {
    index: "03",
    title: "Natë e qetë",
    text: "Dhoma të ngrohta, ajër i pastër dhe mëngjes pa nxitim.",
    className: "experience-card experience-card--clay",
  },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand--light" : ""}`} href="#fillimi" aria-label="Maja e Strellcit — fillimi">
      <span className="brand__peak" aria-hidden="true" />
      <span className="brand__text">
        <strong>MAJA</strong>
        <small>E STRELLCIT</small>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main id="fillimi">
      <MotionController />
      <div className="page-intro" aria-hidden="true">
        <div className="page-intro__mark">
          <span className="page-intro__peak" />
          <span>MAJA E STRELLCIT</span>
        </div>
        <div className="page-intro__line" />
        <p>Strellc · Kosovë</p>
      </div>
      <header className="site-header" aria-label="Navigimi kryesor">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Faqja">
          <a href="#restoranti">Restoranti</a>
          <a href="#akomodimi">Akomodimi</a>
          <a href="#pervoja">Përvoja</a>
          <a href="#kontakti">Kontakti</a>
        </nav>
        <a className="header-cta" href={`tel:${reservationPhone}`}>
          Rezervo <span aria-hidden="true">↗</span>
        </a>
        <details className="mobile-nav">
          <summary aria-label="Hap menunë">
            <span>Menu</span>
            <i aria-hidden="true" />
          </summary>
          <nav aria-label="Menuja për telefon">
            <a href="#restoranti">Restoranti</a>
            <a href="#akomodimi">Akomodimi</a>
            <a href="#pervoja">Përvoja</a>
            <a href="#kontakti">Kontakti</a>
            <a href={`tel:${reservationPhone}`}>Rezervo tani</a>
          </nav>
        </details>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero__image"
          src="/images/maja-hero.webp"
          alt="Tarracë malore me tryezë mëngjesi dhe pamje mbi bjeshkë"
          width="1536"
          height="968"
          fetchPriority="high"
        />
        <div className="hero__wash" aria-hidden="true" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Strellc · Kosovë</p>
          <h1 id="hero-title">
            Mbi re.
            <br />
            <em>Afër rrënjëve.</em>
          </h1>
          <p className="hero__copy">
            Restorant dhe akomodim në zemër të malit — ushqim i mirë,
            ajër i pastër dhe qetësi që qëndron me ju.
          </p>
          <div className="hero__actions">
            <a className="button button--cream" href={`tel:${reservationPhone}`}>
              Rezervo përvojën <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link text-link--light" href="#restoranti">
              Zbulo Majën <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero__meta" aria-label="Shërbimet kryesore">
          <span>Restorant</span>
          <span>Dhoma</span>
          <span>Natyrë</span>
        </div>
        <p className="hero__note">Një ndalesë mbi përditshmërinë.</p>
      </section>

      <section className="manifesto section-shell" id="restoranti" data-reveal>
        <div className="manifesto__label">
          <span className="section-number">01</span>
          <p className="eyebrow">Filozofia jonë</p>
        </div>
        <div className="manifesto__body">
          <h2>Shije që fillon nga vendi.</h2>
          <p>
            Në Maja e Strellcit, tryeza është vazhdim i malit. Përbërës të
            freskët, gatime të njohura dhe një qasje e thjeshtë ndaj ushqimit të
            mirë — pa e humbur kurrë ngrohtësinë e mikpritjes sonë.
          </p>
          <div className="manifesto__facts" aria-label="Vlerat tona">
            <div>
              <strong>Lokale</strong>
              <span>Përbërës të zgjedhur me kujdes</span>
            </div>
            <div>
              <strong>Stinore</strong>
              <span>Shije që ndjekin ritmin e natyrës</span>
            </div>
            <div>
              <strong>E sinqertë</strong>
              <span>Gatim i pastër, pa teprime</span>
            </div>
          </div>
        </div>
      </section>

      <section className="food-story section-shell" data-reveal>
        <div className="food-story__image-wrap">
          <img
            src="/images/maja-food.webp"
            alt="Flia, djathë, perime të pjekura dhe ushqime të freskëta në një tryezë druri"
            width="1122"
            height="1402"
            loading="lazy"
          />
          <span className="image-tag">E mirë për trupin. E njohur për shpirtin.</span>
        </div>
        <div className="food-story__content">
          <p className="eyebrow">Nga mali në tryezë</p>
          <h2>Ushqim që ka kuptim.</h2>
          <p className="lead-copy">
            Receta të vendit, produkte të freskëta dhe pjata që shijohen pa nxitim.
          </p>
          <div className="menu-list">
            {menuHighlights.map((item) => (
              <article className="menu-item" key={item.number}>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="button button--ink" href={`tel:${reservationPhone}`}>
            Rezervo një tryezë <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="stay" id="akomodimi" data-reveal>
        <div className="stay__image">
          <img
            src="/images/maja-room.webp"
            alt="Dhomë e ngrohtë me gur, dru dhe dritare me pamje nga bjeshkët"
            width="1536"
            height="1024"
            loading="lazy"
          />
        </div>
        <div className="stay__panel">
          <div className="stay__topline">
            <span className="section-number section-number--light">02</span>
            <p className="eyebrow eyebrow--light">Qëndro edhe pak</p>
          </div>
          <div>
            <h2>Flini nën qetësinë e malit.</h2>
            <p>
              Dhoma të rehatshme, materiale natyrale dhe pamje që e bëjnë
              mëngjesin pjesën më të bukur të qëndrimit.
            </p>
          </div>
          <div className="stay__details">
            <span>Mëngjes i freskët</span>
            <span>Pamje malore</span>
            <span>Ambient i qetë</span>
          </div>
          <a className="button button--outline" href={`tel:${reservationPhone}`}>
            Pyet për dhomat <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="experiences section-shell" id="pervoja" data-reveal>
        <div className="section-heading">
          <div>
            <span className="section-number">03</span>
            <p className="eyebrow">Më shumë se një vakt</p>
          </div>
          <h2>Një ditë në Majë.</h2>
          <p>
            Ejani për drekë. Qëndroni për perëndimin. Zgjohuni me horizontin.
          </p>
        </div>
        <div className="experience-grid">
          {experiences.map((experience) => (
            <article className={experience.className} key={experience.index}>
              <span>{experience.index}</span>
              <div>
                <h3>{experience.title}</h3>
                <p>{experience.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panorama" aria-label="Pamje nga Maja e Strellcit" data-reveal>
        <img
          src="/images/maja-hero.webp"
          alt="Horizont i gjerë malor i parë nga tarraca"
          width="1536"
          height="968"
          loading="lazy"
        />
        <blockquote>
          “Këtu, koha nuk ndalet.
          <br />
          <em>Thjesht ecën më bukur.</em>”
        </blockquote>
      </section>

      <section className="visit section-shell" id="kontakti" data-reveal>
        <div className="visit__intro">
          <p className="eyebrow">Na gjeni në Strellc</p>
          <h2>Rruga lart ia vlen.</h2>
          <p>
            Për tavolina, dhoma ose një ditë të plotë në natyrë, na telefononi
            dhe kujdesemi për pjesën tjetër.
          </p>
        </div>
        <div className="visit__actions">
          <a className="contact-row" href={`tel:${reservationPhone}`}>
            <span>
              <small>Rezervime</small>
              <strong>+383 (0)49 840 222</strong>
            </span>
            <b aria-hidden="true">↗</b>
          </a>
          <a
            className="contact-row"
            href="https://maps.app.goo.gl/UHRxLucJr8S1TVqx8?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <small>Lokacioni</small>
              <strong>Strellc, Kosovë</strong>
            </span>
            <b aria-hidden="true">↗</b>
          </a>
          <a
            className="contact-row"
            href="https://www.instagram.com/restaurant.majaestrellcit/"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <small>Instagram</small>
              <strong>@restaurant.majaestrellcit</strong>
            </span>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <footer>
        <BrandMark light />
        <p>Restorant &amp; akomodim në Strellc, Kosovë.</p>
        <div>
          <a href="#fillimi">Kthehu lart ↑</a>
          <span>© 2026 Maja e Strellcit</span>
        </div>
      </footer>
    </main>
  );
}
