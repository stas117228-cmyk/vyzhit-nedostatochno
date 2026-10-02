'use client';

/**
 * /gift — страница «Подарить книгу».
 *
 * Поток шагов:
 *  1. Текст подарочного сообщения + выбор фона + живой предпросмотр открытки
 *  2. Доставка получателю (Почта / Мессенджер)
 *  3. Данные покупателя (ФИО + согласие)
 *  4. Сводка + демо-переход к успешному состоянию
 *
 * Прототип: чётко помечен как демо, оплата не подключена.
 */

import { useState, useCallback, useId } from 'react';
import Header from '@/components/Header';
import FormField from '@/components/FormField';
import BuyGiftGroup from '@/components/BuyGiftGroup';
import { siteConfig } from '@/data/site';
import styles from './gift.module.css';

// ─── Типы ────────────────────────────────────────────────────────────────────

type CardBg = 'white' | 'black' | 'blue';
type DeliveryMethod = 'post' | 'messenger' | '';

interface GiftCardData {
  message: string;
  cardBg: CardBg;
}

interface RecipientData {
  deliveryMethod: DeliveryMethod;
  email: string;
  messengerName: string;
  messengerContact: string;
}

interface BuyerData {
  fullName: string;
  consent: boolean;
}

interface FormErrors {
  // Шаг 1
  message?: string;
  // Шаг 2
  deliveryMethod?: string;
  email?: string;
  messengerName?: string;
  messengerContact?: string;
  // Шаг 3
  fullName?: string;
  consent?: string;
}

const BG_OPTIONS: { value: CardBg; label: string; hex: string }[] = [
  { value: 'white', label: 'Белый', hex: '#FFFFFF' },
  { value: 'black', label: 'Чёрный', hex: '#111111' },
  { value: 'blue', label: 'Синий', hex: '#1647E8' },
];

const BG_TEXT_COLOR: Record<CardBg, string> = {
  white: '#111111',
  black: '#FFFFFF',
  blue: '#FFFFFF',
};

const isPrototype = siteConfig.siteMode === 'prototype';

const priceLabel = siteConfig.bookPrice
  ? `${siteConfig.bookPrice} ${siteConfig.bookCurrency}`
  : 'Цена: уточняется';

// ─── Вспомогательные компоненты ──────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className={styles.stepIndicator} aria-label={`Шаг ${current} из ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`${styles.stepDot} ${i + 1 === current ? styles.stepDotActive : ''} ${i + 1 < current ? styles.stepDotDone : ''}`}
          aria-hidden="true"
        />
      ))}
      <span className={styles.stepLabel}>
        Шаг {current} из {total}
      </span>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={styles.reviewValue}>{value}</span>
    </div>
  );
}

/** Живой предпросмотр подарочной открытки */
function GiftCardPreview({
  message,
  cardBg,
}: {
  message: string;
  cardBg: CardBg;
}) {
  const bg = BG_OPTIONS.find((o) => o.value === cardBg)!;
  const textColor = BG_TEXT_COLOR[cardBg];

  return (
    <div
      className={styles.giftPreview}
      style={{ background: bg.hex, color: textColor }}
      aria-label="Предпросмотр подарочной открытки"
    >
      <div className={styles.giftPreviewInner}>
        <p className={styles.giftPreviewTitle}>«Выжить недостаточно»</p>
        {message ? (
          <blockquote className={styles.giftPreviewMessage}>{message}</blockquote>
        ) : (
          <p className={styles.giftPreviewPlaceholder}>Ваше сообщение появится здесь…</p>
        )}
        <p className={styles.giftPreviewAuthor}>— Даниил Сергеев</p>
      </div>
    </div>
  );
}

/** Селектор фона открытки */
function BgSelector({
  value,
  onChange,
}: {
  value: CardBg;
  onChange: (v: CardBg) => void;
}) {
  const groupId = useId();

  return (
    <fieldset className={styles.bgSelector}>
      <legend className={styles.bgSelectorLegend}>Фон открытки</legend>
      <div className={styles.bgOptions}>
        {BG_OPTIONS.map((opt) => {
          const id = `${groupId}-${opt.value}`;
          return (
            <label key={opt.value} htmlFor={id} className={styles.bgOption}>
              <input
                id={id}
                type="radio"
                name={`${groupId}-bg`}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className={styles.bgRadio}
              />
              <span
                className={`${styles.bgSwatch} ${value === opt.value ? styles.bgSwatchActive : ''}`}
                style={{
                  background: opt.hex,
                  border:
                    opt.value === 'white'
                      ? '1px solid #D9D9D9'
                      : `1px solid ${opt.hex}`,
                }}
                aria-hidden="true"
              />
              <span className={styles.bgLabel}>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────

export default function GiftPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [errors, setErrors] = useState<FormErrors>({});

  // Данные открытки
  const [card, setCard] = useState<GiftCardData>({ message: '', cardBg: 'white' });
  // Доставка
  const [recipient, setRecipient] = useState<RecipientData>({
    deliveryMethod: '',
    email: '',
    messengerName: '',
    messengerContact: '',
  });
  // Покупатель
  const [buyer, setBuyer] = useState<BuyerData>({ fullName: '', consent: false });

  const setCardField = useCallback(
    <K extends keyof GiftCardData>(key: K, value: GiftCardData[K]) => {
      setCard((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const setRecipientField = useCallback(
    <K extends keyof RecipientData>(key: K, value: RecipientData[K]) => {
      setRecipient((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const setBuyerField = useCallback(
    <K extends keyof BuyerData>(key: K, value: BuyerData[K]) => {
      setBuyer((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Валидации ────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const newErrors: FormErrors = {};
    if (!card.message.trim()) {
      newErrors.message = 'Напишите подарочное сообщение';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: FormErrors = {};
    if (!recipient.deliveryMethod) {
      newErrors.deliveryMethod = 'Выберите способ доставки';
    } else if (recipient.deliveryMethod === 'post') {
      if (!recipient.email.trim()) {
        newErrors.email = 'Укажите адрес электронной почты';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient.email)) {
        newErrors.email = 'Введите корректный адрес e-mail';
      }
    } else if (recipient.deliveryMethod === 'messenger') {
      if (!recipient.messengerName.trim()) {
        newErrors.messengerName = 'Укажите название мессенджера';
      }
      if (!recipient.messengerContact.trim()) {
        newErrors.messengerContact = 'Укажите контакт получателя';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep3(): boolean {
    const newErrors: FormErrors = {};
    if (!buyer.fullName.trim()) {
      newErrors.fullName = 'Пожалуйста, укажите ФИО';
    }
    if (!buyer.consent) {
      newErrors.consent = 'Необходимо дать согласие на обработку персональных данных';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ─── Навигация ────────────────────────────────────────────────────────────

  function goNext(validFn?: () => boolean) {
    if (validFn && !validFn()) return;
    setStep((s) => (s + 1) as typeof step);
    scrollTop();
  }

  function goBack() {
    setStep((s) => (s - 1) as typeof step);
    scrollTop();
  }

  // ─── Рендер ───────────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Подарить книгу</h1>

          {/* ── Шаг 1: Подарочная открытка ── */}
          {step === 1 && (
            <section aria-label="Шаг 1 — Открытка" className={styles.step}>
              <StepIndicator current={1} total={4} />
              <h2 className={styles.stepHeading}>Подарочная открытка</h2>

              <div className={styles.cardLayout}>
                {/* Предпросмотр */}
                <GiftCardPreview message={card.message} cardBg={card.cardBg} />

                {/* Поля редактирования */}
                <div className={styles.cardFields}>
                  <FormField
                    type="textarea"
                    label="Текст сообщения"
                    value={card.message}
                    onChange={(v) => setCardField('message', v)}
                    placeholder="Напишите что-нибудь от себя…"
                    rows={4}
                    required
                    error={errors.message}
                  />
                  <BgSelector
                    value={card.cardBg}
                    onChange={(v) => setCardField('cardBg', v)}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => goNext(validateStep1)}
                >
                  Далее
                </button>
              </div>
            </section>
          )}

          {/* ── Шаг 2: Доставка получателю ── */}
          {step === 2 && (
            <section aria-label="Шаг 2 — Доставка получателю" className={styles.step}>
              <StepIndicator current={2} total={4} />
              <h2 className={styles.stepHeading}>Доставка получателю</h2>

              <form
                className={styles.form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  goNext(validateStep2);
                }}
              >
                <FormField
                  type="radio"
                  label="Способ доставки получателю"
                  name="recipientDelivery"
                  options={[
                    { value: 'post', label: 'Почта (отправить на e-mail получателя)' },
                    { value: 'messenger', label: 'Мессенджер' },
                  ]}
                  value={recipient.deliveryMethod}
                  onChange={(v) => setRecipientField('deliveryMethod', v as DeliveryMethod)}
                  required
                  error={errors.deliveryMethod}
                />

                {recipient.deliveryMethod === 'post' && (
                  <div className={styles.conditionalFields}>
                    <FormField
                      type="email"
                      label="E-mail получателя"
                      value={recipient.email}
                      onChange={(v) => setRecipientField('email', v)}
                      placeholder="recipient@email.com"
                      required
                      autoComplete="email"
                      error={errors.email}
                    />
                  </div>
                )}

                {recipient.deliveryMethod === 'messenger' && (
                  <div className={styles.conditionalFields}>
                    <FormField
                      type="text"
                      label="Мессенджер"
                      value={recipient.messengerName}
                      onChange={(v) => setRecipientField('messengerName', v)}
                      placeholder="Telegram, WhatsApp, Viber…"
                      required
                      error={errors.messengerName}
                    />
                    <FormField
                      type="text"
                      label="Контакт получателя"
                      value={recipient.messengerContact}
                      onChange={(v) => setRecipientField('messengerContact', v)}
                      placeholder="@username или +7 900 000-00-00"
                      required
                      error={errors.messengerContact}
                    />
                  </div>
                )}

                <div className={styles.formActions}>
                  <button type="button" className={styles.btnSecondary} onClick={goBack}>
                    ← Назад
                  </button>
                  <button type="submit" className={styles.btnPrimary}>
                    Далее
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ── Шаг 3: Данные покупателя ── */}
          {step === 3 && (
            <section aria-label="Шаг 3 — Данные покупателя" className={styles.step}>
              <StepIndicator current={3} total={4} />
              <h2 className={styles.stepHeading}>Ваши данные</h2>

              <form
                className={styles.form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  goNext(validateStep3);
                }}
              >
                <FormField
                  type="text"
                  label="ФИО"
                  value={buyer.fullName}
                  onChange={(v) => setBuyerField('fullName', v)}
                  placeholder="Иванов Иван Иванович"
                  required
                  autoComplete="name"
                  error={errors.fullName}
                />

                <FormField
                  type="checkbox"
                  label="Я даю согласие на обработку персональных данных"
                  checked={buyer.consent}
                  onChange={(v) => setBuyerField('consent', v)}
                  required
                  error={errors.consent}
                />

                <div className={styles.formActions}>
                  <button type="button" className={styles.btnSecondary} onClick={goBack}>
                    ← Назад
                  </button>
                  <button type="submit" className={styles.btnPrimary}>
                    Далее
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* ── Шаг 4: Сводка и оплата ── */}
          {step === 4 && (
            <section aria-label="Шаг 4 — Проверка данных" className={styles.step}>
              <StepIndicator current={4} total={4} />
              <h2 className={styles.stepHeading}>Проверьте данные</h2>

              {isPrototype && (
                <div className={styles.protoBanner} role="status">
                  <strong>Демонстрационный режим.</strong> Оплата не подключена — это
                  прототип сайта. Реальная транзакция не будет проведена.
                </div>
              )}

              {/* Предпросмотр открытки */}
              <p className={styles.reviewSectionTitle}>Подарочная открытка</p>
              <GiftCardPreview message={card.message} cardBg={card.cardBg} />

              <div className={styles.reviewBlock}>
                <ReviewRow
                  label="Фон открытки"
                  value={BG_OPTIONS.find((o) => o.value === card.cardBg)!.label}
                />
                <ReviewRow
                  label="Способ доставки"
                  value={recipient.deliveryMethod === 'post' ? 'Почта' : 'Мессенджер'}
                />
                {recipient.deliveryMethod === 'post' && (
                  <ReviewRow label="E-mail получателя" value={recipient.email} />
                )}
                {recipient.deliveryMethod === 'messenger' && (
                  <>
                    <ReviewRow label="Мессенджер" value={recipient.messengerName} />
                    <ReviewRow label="Контакт получателя" value={recipient.messengerContact} />
                  </>
                )}
                <ReviewRow label="Покупатель" value={buyer.fullName} />
                <div className={styles.reviewPrice}>
                  <span className={styles.reviewPriceLabel}>Итого</span>
                  <span className={styles.reviewPriceValue}>{priceLabel}</span>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={goBack}>
                  ← Назад
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => goNext()}
                >
                  {isPrototype ? 'Перейти к оплате (демо)' : 'Перейти к оплате'}
                </button>
              </div>
            </section>
          )}

          {/* ── Шаг 5: Демо-успех ── */}
          {step === 5 && (
            <section aria-label="Заявка принята" className={styles.step}>
              <div className={styles.successBlock}>
                <div className={styles.successIcon} aria-hidden="true">✓</div>
                <h2 className={styles.successHeading}>Заявка принята</h2>
                <p className={styles.successText}>
                  Спасибо, <strong>{buyer.fullName}</strong>! Ваша заявка на подарочное
                  издание зафиксирована.
                </p>
                {isPrototype && (
                  <div className={styles.successProtoBanner} role="status">
                    <strong>Это демонстрационный режим.</strong> Оплата не подключена —
                    реальной транзакции не было. После подключения платёжной системы здесь
                    появится ссылка для оплаты.
                  </div>
                )}
                <p className={styles.successNext}>
                  После оплаты подарочная открытка будет отправлена получателю{' '}
                  {recipient.deliveryMethod === 'post'
                    ? `на почту ${recipient.email}`
                    : `в ${recipient.messengerName}`}
                  .
                </p>
                <div className={styles.formActions}>
                  <BuyGiftGroup />
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
