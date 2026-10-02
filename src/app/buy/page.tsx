'use client';

/**
 * /buy — страница покупки книги.
 *
 * Поток шагов:
 *  1. Данные покупателя (ФИО, способ доставки, контакт, согласие)
 *  2. Проверка данных + цена → «Перейти к оплате»
 *  3. Демо-состояние «Заявка принята» (прототип — оплата не подключена)
 *
 * В режиме prototype явно обозначен демо-баннер. Нет таймеров, нет имитации
 * реальной оплаты — только честный прототип.
 */

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import FormField from '@/components/FormField';
import BuyGiftGroup from '@/components/BuyGiftGroup';
import { siteConfig } from '@/data/site';
import styles from './buy.module.css';

// ─── Типы ────────────────────────────────────────────────────────────────────

type DeliveryMethod = 'post' | 'messenger' | '';

interface FormData {
  fullName: string;
  deliveryMethod: DeliveryMethod;
  // Почта
  email: string;
  // Мессенджер
  messengerName: string;
  messengerContact: string;
  // Согласие
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  deliveryMethod?: string;
  email?: string;
  messengerName?: string;
  messengerContact?: string;
  consent?: string;
}

const INITIAL_FORM: FormData = {
  fullName: '',
  deliveryMethod: '',
  email: '',
  messengerName: '',
  messengerContact: '',
  consent: false,
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

// ─── Главный компонент ────────────────────────────────────────────────────────

export default function BuyPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  // Обновление поля формы
  const setField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Сброс ошибки при изменении
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  // ─── Валидация шага 1 ──────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Пожалуйста, укажите ФИО';
    }

    if (!form.deliveryMethod) {
      newErrors.deliveryMethod = 'Выберите способ доставки';
    } else if (form.deliveryMethod === 'post') {
      if (!form.email.trim()) {
        newErrors.email = 'Укажите адрес электронной почты';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = 'Введите корректный адрес e-mail';
      }
    } else if (form.deliveryMethod === 'messenger') {
      if (!form.messengerName.trim()) {
        newErrors.messengerName = 'Укажите название мессенджера';
      }
      if (!form.messengerContact.trim()) {
        newErrors.messengerContact = 'Укажите контакт (имя пользователя или номер)';
      }
    }

    if (!form.consent) {
      newErrors.consent = 'Необходимо дать согласие на обработку персональных данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleStep1Next() {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleStep2Back() {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleStep2Submit() {
    // В режиме прототипа просто переходим к шагу 3
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Рендер шагов ─────────────────────────────────────────────────────────

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Купить книгу</h1>

          {/* Шаг 1 — Данные покупателя */}
          {step === 1 && (
            <section aria-label="Шаг 1 — Данные покупателя" className={styles.step}>
              <StepIndicator current={1} total={2} />
              <h2 className={styles.stepHeading}>Ваши данные</h2>

              <form
                className={styles.form}
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStep1Next();
                }}
              >
                <FormField
                  type="text"
                  label="ФИО"
                  value={form.fullName}
                  onChange={(v) => setField('fullName', v)}
                  placeholder="Иванов Иван Иванович"
                  required
                  autoComplete="name"
                  error={errors.fullName}
                />

                <FormField
                  type="radio"
                  label="Способ доставки"
                  name="deliveryMethod"
                  options={[
                    { value: 'post', label: 'Почта (получить по e-mail)' },
                    { value: 'messenger', label: 'Мессенджер' },
                  ]}
                  value={form.deliveryMethod}
                  onChange={(v) => setField('deliveryMethod', v as DeliveryMethod)}
                  required
                  error={errors.deliveryMethod}
                />

                {/* Условные поля в зависимости от способа доставки */}
                {form.deliveryMethod === 'post' && (
                  <div className={styles.conditionalFields}>
                    <FormField
                      type="email"
                      label="Электронная почта"
                      value={form.email}
                      onChange={(v) => setField('email', v)}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      error={errors.email}
                    />
                  </div>
                )}

                {form.deliveryMethod === 'messenger' && (
                  <div className={styles.conditionalFields}>
                    <FormField
                      type="text"
                      label="Мессенджер"
                      value={form.messengerName}
                      onChange={(v) => setField('messengerName', v)}
                      placeholder="Telegram, WhatsApp, Viber…"
                      required
                      error={errors.messengerName}
                    />
                    <FormField
                      type="text"
                      label="Контакт (имя пользователя или номер)"
                      value={form.messengerContact}
                      onChange={(v) => setField('messengerContact', v)}
                      placeholder="@username или +7 900 000-00-00"
                      required
                      error={errors.messengerContact}
                    />
                  </div>
                )}

                <FormField
                  type="checkbox"
                  label="Я даю согласие на обработку персональных данных"
                  checked={form.consent}
                  onChange={(v) => setField('consent', v)}
                  required
                  error={errors.consent}
                />

                <div className={styles.formActions}>
                  <button type="submit" className={styles.btnPrimary}>
                    Далее
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Шаг 2 — Проверка данных */}
          {step === 2 && (
            <section aria-label="Шаг 2 — Проверка данных" className={styles.step}>
              <StepIndicator current={2} total={2} />
              <h2 className={styles.stepHeading}>Проверьте данные</h2>

              {/* Демо-баннер в режиме прототипа */}
              {isPrototype && (
                <div className={styles.protoBanner} role="status">
                  <strong>Демонстрационный режим.</strong> Оплата не подключена — это прототип
                  сайта. Реальная транзакция не будет проведена.
                </div>
              )}

              <div className={styles.reviewBlock}>
                <ReviewRow label="ФИО" value={form.fullName} />
                <ReviewRow
                  label="Способ доставки"
                  value={form.deliveryMethod === 'post' ? 'Почта' : 'Мессенджер'}
                />
                {form.deliveryMethod === 'post' && (
                  <ReviewRow label="E-mail" value={form.email} />
                )}
                {form.deliveryMethod === 'messenger' && (
                  <>
                    <ReviewRow label="Мессенджер" value={form.messengerName} />
                    <ReviewRow label="Контакт" value={form.messengerContact} />
                  </>
                )}
                <div className={styles.reviewPrice}>
                  <span className={styles.reviewPriceLabel}>Итого</span>
                  <span className={styles.reviewPriceValue}>{priceLabel}</span>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleStep2Back}
                >
                  ← Назад
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleStep2Submit}
                >
                  {isPrototype ? 'Перейти к оплате (демо)' : 'Перейти к оплате'}
                </button>
              </div>
            </section>
          )}

          {/* Шаг 3 — Демо-состояние «Заявка принята» */}
          {step === 3 && (
            <section aria-label="Заявка принята" className={styles.step}>
              <div className={styles.successBlock}>
                <div className={styles.successIcon} aria-hidden="true">✓</div>
                <h2 className={styles.successHeading}>Заявка принята</h2>
                <p className={styles.successText}>
                  Спасибо, <strong>{form.fullName}</strong>! Ваша заявка зафиксирована.
                </p>
                {isPrototype && (
                  <div className={styles.successProtoBanner} role="status">
                    <strong>Это демонстрационный режим.</strong> Оплата не подключена —
                    реальной транзакции не было. После подключения платёжной системы здесь
                    появится ссылка для оплаты.
                  </div>
                )}
                <p className={styles.successNext}>
                  После подключения оплаты вы получите ссылку на оплату{' '}
                  {form.deliveryMethod === 'post'
                    ? `на почту ${form.email}`
                    : `в ${form.messengerName}`}
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
