import type { Metadata } from 'next';
import Header from '@/components/Header';
import BookSpread from '@/components/BookSpread';
import BuyGiftGroup from '@/components/BuyGiftGroup';
import SectionLabel from '@/components/SectionLabel';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import MasterclassForm from '@/components/MasterclassForm';
import SpeakingForm from '@/components/SpeakingForm';
import { beliefs, closingBeliefQuote, disbeliefs } from '@/data/beliefs';
import { thoughts } from '@/data/thoughts';
import { siteConfig } from '@/data/site';
import { signThat } from './fonts';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Выжить недостаточно — книга Даниила Сергеева',
  description:
    'Авторский лендинг книги Даниила Сергеева «Выжить недостаточно» — о продажах, управлении людьми и предпринимательском мышлении.',
};

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* ─────────────────────────────────────────── */}
        {/* 1. ПЕРВЫЙ ЭКРАН (HERO) — фото на весь экран */}
        {/* ─────────────────────────────────────────── */}
        <section className={styles.hero} aria-label="Первый экран">
          {/* Фото — фон на весь экран */}
          <div className={styles.heroBackground}>
            <PhotoPlaceholder
              label="Фото 1 — первый экран, горизонтальное 16/9"
              aspectRatio="16/9"
              className={styles.heroBgPhoto}
            />
            <div className={styles.heroOverlay} aria-hidden="true" />
          </div>

          {/* Текст поверх фото */}
          <div className={`container ${styles.heroContent}`}>
            <h1 className={styles.heroTitle}>Даниил Сергеев</h1>

            <blockquote className={styles.heroQuote}>
              <p className={`${styles.heroQuoteText} ${signThat.className}`}>
                «Всё происходящее в бизнесе — это отражение тебя самого»
              </p>
            </blockquote>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* 2. РАЗВОРОТ КНИГИ (HTML/CSS Lora)           */}
        {/* ─────────────────────────────────────────── */}
        <BookSpread />

        {/* ─────────────────────────────────────────── */}
        {/* ПОЧЕМУ ПОЯВИЛАСЬ КНИГА                      */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="why-book"
          aria-label="Почему появилась книга"
        >
          <div className="container">
            <SectionLabel title="Почему появилась эта книга" />
            <div className={styles.whyGrid}>
              <div className={styles.whyPhoto}>
                <PhotoPlaceholder
                  label="Фото 2 — почему появилась книга"
                  aspectRatio="4/5"
                />
              </div>
              <div className={styles.whyText}>
                <p>
                  Я написал эту книгу не потому, что хотел стать автором.
                </p>
                <p>
                  За годы в бизнесе я видел одну и ту же картину: предприниматель
                  умеет продавать, умеет зарабатывать, умеет вытаскивать компанию
                  из сложных ситуаций — но в какой-то момент сам становится
                  главным условием её существования.
                </p>
                <p>
                  Я тоже проходил через ошибки, неправильные решения, проблемы с
                  людьми и периоды, когда приходилось заново разбираться, почему
                  что-то работает, а что-то нет.
                </p>
                <p>
                  Со временем из этого сложилась система: как продавать не
                  случайно, как строить работу с людьми и как принимать решения в
                  сложные моменты, когда никто не может дать тебе готового
                  правильного ответа.
                </p>
                <p>
                  Эту систему я собирал не в теории. Я проверял её в собственном
                  бизнесе.
                </p>
                <p>Так появилась эта книга.</p>
                <p className={styles.whyHighlight}>
                  Не как история моего успеха, а как попытка собрать в одном
                  месте то, что я хотел бы знать раньше.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ФАКТЫ                                       */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="about-author"
          aria-label="Факты о Данииле"
        >
          <div className="container">
            <SectionLabel title="Даниил в цифрах" />
            <div className={styles.factsGrid}>
              <div className={styles.factsPhoto}>
                <PhotoPlaceholder
                  label="Фото 3 — факты об авторе"
                  aspectRatio="3/4"
                />
              </div>
              <div className={styles.factsList}>
                {[
                  { num: '10+', label: 'лет предпринимательства' },
                  { num: '20\u00a0000+', label: 'клиентов' },
                  { num: '300+', label: 'сделок ежемесячно' },
                ].map(({ num, label }) => (
                  <div key={label} className={styles.factItem}>
                    <span className={styles.factNum}>{num}</span>
                    <span className={styles.factLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ВО ЧТО Я ВЕРЮ                               */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="beliefs"
          aria-label="Во что я верю"
        >
          <div className="container">
            <SectionLabel title="Во что я верю" />
            <div className={styles.beliefsGrid}>
              <div className={styles.beliefsPhoto}>
                <PhotoPlaceholder
                  label="Фото 4 — убеждения"
                  aspectRatio="4/5"
                />
              </div>
              <div className={styles.beliefsList}>
                {beliefs.map((b, i) => (
                  <div key={b.id} className={styles.beliefItem}>
                    <div className={styles.beliefHeader}>
                      <span className={styles.beliefNum} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className={styles.beliefTitle}>{b.title}</h3>
                    </div>
                    <p className={styles.beliefBody}>{b.body}</p>
                  </div>
                ))}
                <blockquote className={styles.beliefsClosingQuote}>
                  «{closingBeliefQuote}»
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ВО ЧТО Я НЕ ВЕРЮ                           */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={`${styles.section} ${styles.disbeliefsSection}`}
          id="disbeliefs"
          aria-label="Во что я не верю"
        >
          <div className="container">
            <SectionLabel title={`Во что я\u00a0НЕ верю`} />
            <div className={styles.disbeliefsGrid}>
              <div className={styles.disbeliefsPhoto}>
                <PhotoPlaceholder
                  label="Фото 5 — что не работает"
                  aspectRatio="4/5"
                />
              </div>
              <div className={styles.disbeliefsList}>
                {disbeliefs.map((d) => (
                  <div key={d.id} className={styles.disbeliefItem}>
                    <hr className={styles.disbeliefRule} />
                    <div className={styles.disbeliefInner}>
                      <p className={styles.disbeliefTitle}>{d.title}</p>
                      <p className={styles.disbeliefBody}>{d.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ТРИ ОСНОВЫ БИЗНЕСА                          */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="foundations"
          aria-label="Три основы бизнеса"
        >
          <div className="container">
            <SectionLabel title="Три основы бизнеса" />

            {/* Продажи */}
            <div className={styles.foundationBlock} id="sales">
              <div className={styles.foundationHeader}>
                <span className={styles.foundationNum}>I</span>
                <h3 className={styles.foundationTitle}>Продажи</h3>
              </div>
              <div className={styles.foundationGrid}>
                <div className={styles.foundationText}>
                  <p>
                    Продажи начинаются задолго до момента, когда кто-то достаёт
                    кошелёк. Ты продаёшь, когда нанимаешь сильного человека.
                    Когда защищаешь решение перед партнёрами. Когда добиваешься
                    лучших условий. Когда объясняешь свою идею так, чтобы другой
                    человек захотел стать её частью. Даже возможность вести людей
                    за собой во многом начинается с умения влиять на их решения.
                  </p>
                  <p>
                    Поэтому я никогда не воспринимал продажи как профессию или
                    функцию отдельного отдела. Это один из базовых навыков
                    человека, который хочет не наблюдать за происходящим, а
                    влиять на него.
                  </p>
                  <blockquote className={styles.foundationQuote}>
                    «Продажа начинается с первого &quot;НЕТ&quot;»
                  </blockquote>
                  <div className={styles.foundationActions}>
                    <div className={styles.spreadPlaceholder}>
                      <PhotoPlaceholder
                        label="bookSpreadSales — разворот о продажах"
                        aspectRatio="3/2"
                      />
                    </div>
                    <Link
                      href="/read/sales-7-feelings"
                      className={styles.readExcerpt}
                    >
                      Читать отрывок →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <hr className={styles.foundationDivider} />

            {/* Управление персоналом */}
            <div className={styles.foundationBlock} id="people">
              <div className={styles.foundationHeader}>
                <span className={styles.foundationNum}>II</span>
                <h3 className={styles.foundationTitle}>
                  Управление персоналом
                </h3>
              </div>
              <div className={styles.foundationGrid}>
                <div className={styles.foundationText}>
                  <p>
                    Люди редко приходят в компанию готовыми. Они приходят со
                    своими амбициями, страхами, привычками, слабостями и
                    представлением о том, на что способны. И одна из самых
                    сложных задач руководителя — увидеть в человеке больше, чем
                    он показывает сегодня. Дать ему достаточно ответственности,
                    чтобы он вырос, но не столько, чтобы он сломался. Требовать
                    больше, чем ему комфортно, но не больше, чем он способен
                    вынести.
                  </p>
                  <p>
                    В конечном счёте сила руководителя видна не по нему самому.
                    Она видна по людям, которые выросли рядом с ним.
                  </p>
                  <blockquote className={styles.foundationQuote}>
                    «Тяжёлые времена порождают сильных людей, сильные люди
                    порождают хорошие времена, хорошие времена порождают слабых
                    людей, слабые люди порождают тяжёлые времена»
                  </blockquote>
                  <div className={styles.foundationActions}>
                    <div className={styles.spreadPlaceholder}>
                      <PhotoPlaceholder
                        label="bookSpreadPeople — разворот об управлении персоналом"
                        aspectRatio="3/2"
                      />
                    </div>
                    <Link
                      href="/read/management-xxii"
                      className={styles.readExcerpt}
                    >
                      Читать отрывок →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <hr className={styles.foundationDivider} />

            {/* Мышление */}
            <div className={styles.foundationBlock} id="mindset">
              <div className={styles.foundationHeader}>
                <span className={styles.foundationNum}>III</span>
                <h3 className={styles.foundationTitle}>Мышление</h3>
              </div>
              <div className={styles.foundationGrid}>
                <div className={styles.foundationPhotoWrap}>
                  <PhotoPlaceholder
                    label="Фото 6 — мышление"
                    aspectRatio="4/5"
                  />
                </div>
                <div className={styles.foundationText}>
                  <p>
                    Предприниматель — странный человек. Он добровольно выбирает
                    проблемы, которых у него могло бы не быть.
                  </p>
                  <p>
                    Решил одну — ищет следующую. Заработал достаточно — ставит
                    цель больше. Получил стабильность — начинает что-то менять.
                    Там, где другому человеку наконец спокойно, ему уже тесно.
                  </p>
                  <p>
                    Можно называть это амбициями. Можно жадностью до жизни.
                    Можно вообще считать отклонением от нормы. Я не знаю, кто
                    здесь прав. Но знаю другое: предпринимательство требует
                    определённого устройства башки.
                  </p>
                  <p>
                    Если тебе хорошо, когда всё понятно, спокойно и
                    предсказуемо, — не надо себя переделывать. Не насилуй себе
                    мозг. В мире полно прекрасных занятий, где твоя жизнь не
                    зависит от сотни решений, которые ещё вчера вообще не
                    существовали.
                  </p>
                  <p>
                    Но если ты узнал себя — учиться нужно не тому, как
                    остановить этот хаос. А тому, как его обуздать и сделать
                    так, чтобы он перестал управлять тобой.
                  </p>
                  <blockquote className={styles.foundationQuote}>
                    «Нужно просто решиться сесть за руль и начать управлять
                    ситуацией, иначе ты так и останешься на пассажирском
                    сиденье, довольствуясь видом из окна»
                  </blockquote>
                  <Link
                    href="/read/thinking-all-for-worse"
                    className={styles.readExcerpt}
                  >
                    Читать отрывок →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* МЫСЛИ                                       */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="thoughts-section"
          aria-label="Мысли"
        >
          <div className="container">
            <SectionLabel title="Мысли" />
            <div className={styles.thoughtsGrid}>
              <div className={styles.thoughtsPhoto}>
                <PhotoPlaceholder
                  label="Фото 7 — мысли"
                  aspectRatio="4/5"
                />
              </div>
              <div className={styles.thoughtsList}>
                {thoughts.map((t, i) => (
                  <article
                    key={t.slug}
                    className={styles.thoughtItem}
                  >
                    <hr className={styles.thoughtRule} />
                    <div className={styles.thoughtInner}>
                      <span
                        className={styles.thoughtNum}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className={styles.thoughtTitle}>
                          <Link href={`/thoughts/${t.slug}`}>{t.title}</Link>
                        </h3>
                        <p className={styles.thoughtTeaser}>{t.teaser}</p>
                        <Link
                          href={`/thoughts/${t.slug}`}
                          className={styles.thoughtRead}
                        >
                          Читать →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
                <hr className={styles.thoughtRule} />
                <Link href="/thoughts" className={styles.allThoughts}>
                  Читать все мысли →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* БИЗНЕС-МАСТЕРСКАЯ                           */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="masterclass"
          aria-label="Бизнес-мастерская"
        >
          <div className="container">
            <SectionLabel title="Бизнес-мастерская" />
            <MasterclassSection />
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ПРИГЛАСИТЬ НА ВЫСТУПЛЕНИЕ                   */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.section}
          id="speaking"
          aria-label="Пригласить на выступление"
        >
          <div className="container">
            <SectionLabel title="Пригласить на выступление" />
            <SpeakingSection />
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* СОЦИАЛЬНЫЕ СЕТИ                             */}
        {/* ─────────────────────────────────────────── */}
        <section className={styles.section} aria-label="Социальные сети">
          <div className="container">
            <SectionLabel title="Социальные сети" />
            <SocialSection />
          </div>
        </section>

        {/* ─────────────────────────────────────────── */}
        {/* ФИНАЛЬНЫЙ ПРИЗЫВ                            */}
        {/* ─────────────────────────────────────────── */}
        <section
          className={styles.finalSection}
          aria-label="Финальный призыв"
        >
          <div className="container">
            <div className={styles.finalGrid}>
              <div className={styles.finalPhoto}>
                <PhotoPlaceholder
                  label="Фото 8 — финальный экран"
                  aspectRatio="3/4"
                />
              </div>
              <div className={styles.finalText}>
                <h2 className={styles.finalHeading}>
                  Ты вообще хочешь кайфовать от жизни?
                </h2>
                <p>
                  Бизнес не обязательно должен быть вечной борьбой.
                </p>
                <p>
                  Можно много зарабатывать, строить большую компанию, хотеть
                  ещё больше — и при этом кайфовать от того, что ты делаешь.
                </p>
                <p>
                  Не быть заложником собственного бизнеса. Не просыпаться
                  каждый день с очередным п*****м, который без тебя никто не
                  решит. Не мечтать всё бросить после десяти лет, потраченных
                  на то, чтобы это построить.
                </p>
                <p>
                  Бизнес может давать тебе больше жизни, а не забирать её.
                </p>
                <p>Собственно, ради этого всё и затевалось.</p>
                <BuyGiftGroup className={styles.finalBtns} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <p className={styles.footerAuthor}>Даниил Сергеев</p>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()}&nbsp;— Книга «Выжить недостаточно»
            </p>
            <p className={styles.footerDocs}>
              {/* Документы и реквизиты добавляются после согласования */}
              Политика конфиденциальности и реквизиты — после согласования
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── Секция бизнес-мастерской ─────────────────────────────────────────────

function MasterclassSection() {
  return (
    <div className={styles.masterclassContent}>
      <div className={styles.masterclassText}>
        <p>Иногда я разбираю бизнесы лично.</p>
        <p>
          До встречи ты заполняешь подробный бриф, я изучаю его и задаю
          уточняющие вопросы. Поэтому эти два часа — не знакомство и не
          интервью. Мы сразу начинаем с того места, где тебе действительно
          нужна помощь.
        </p>
        <p>
          Встречаемся лично или по видеосвязи, разбираем твой бизнес и
          конкретный запрос. Ты уходишь с конкретными решениями и пониманием,
          что делать дальше.
        </p>
        <p>
          Бизнес-мастерские проходят по предварительному отбору заявок.
        </p>
      </div>
      <div className={styles.masterclassFormWrap}>
        <MasterclassForm />
      </div>
    </div>
  );
}

// ─── Секция выступлений ───────────────────────────────────────────────────

function SpeakingSection() {
  return (
    <div className={styles.speakingGrid}>
      <div className={styles.speakingImage}>
        <PhotoPlaceholder
          label="speakingImage — материал для раздела о выступлениях"
          aspectRatio="4/3"
        />
      </div>
      <div className={styles.speakingContent}>
        <p>
          Если вы хотите, чтобы я выступил с лекцией на вашем мероприятии,
          напишите мне напрямую или заполните форму ниже.
        </p>
        <SpeakingForm />
      </div>
    </div>
  );
}

// ─── Секция социальных сетей ─────────────────────────────────────────────

function SocialSection() {
  const socials = [
    {
      key: 'telegram',
      label: 'Telegram',
      href: 'https://t.me/mrdaniilsergeev',
    },
    {
      key: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/sergeev.daniil.s',
    },
    { key: 'youtube', label: 'YouTube', href: siteConfig.social.youtube },
    { key: 'vk', label: 'ВКонтакте', href: siteConfig.social.vk },
  ];

  return (
    <div className={styles.socialGrid}>
      {socials.map(({ key, label, href }) => (
        <div key={key} className={styles.socialItem}>
          {href ? (
            <a
              href={href}
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ) : (
            <span
              className={`${styles.socialLink} ${styles.socialPending}`}
              title="Ссылка будет добавлена"
              aria-label={`${label} — ссылка не настроена`}
            >
              {label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
