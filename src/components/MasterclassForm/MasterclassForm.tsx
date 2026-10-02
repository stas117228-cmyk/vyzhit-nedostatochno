'use client';

import { useState, useRef } from 'react';
import FormField from '@/components/FormField';
import styles from './MasterclassForm.module.css';

type FormState = 'idle' | 'open' | 'sending' | 'sent' | 'error';

export default function MasterclassForm() {
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    messenger: '',
    request: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const btnRef = useRef<HTMLButtonElement>(null);

  const validate = () => {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Пожалуйста, укажите ФИО';
    if (!formData.phone.trim()) e.phone = 'Пожалуйста, укажите номер телефона';
    if (!formData.request.trim()) e.request = 'Пожалуйста, опишите запрос';
    return e;
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setState('sending');
    // Прототип: не отправляет данные
    await new Promise((r) => setTimeout(r, 800));
    setState('sent');
  };

  if (state === 'sent') {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Заявка отправлена</p>
        <p className={styles.successText}>
          Спасибо! Я свяжусь с вами в ближайшее время.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setState('idle');
            setFormData({ name: '', phone: '', messenger: '', request: '' });
          }}
        >
          Заполнить снова
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {state === 'idle' && (
        <button
          ref={btnRef}
          className={styles.openBtn}
          onClick={() => setState('open')}
        >
          Рассказать о себе и своём запросе
        </button>
      )}

      {(state === 'open' || state === 'sending' || state === 'error') && (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Заявка на бизнес-мастерскую"
        >
          <FormField
            id="mc-name"
            name="name"
            label="ФИО"
            required
            value={formData.name}
            onChange={(v) => handleFieldChange('name', v)}
            error={errors.name}
            autoComplete="name"
          />
          <FormField
            id="mc-phone"
            name="phone"
            label="Номер телефона"
            type="tel"
            required
            value={formData.phone}
            onChange={(v) => handleFieldChange('phone', v)}
            error={errors.phone}
            autoComplete="tel"
          />
          <FormField
            id="mc-messenger"
            name="messenger"
            label="Предпочтительный мессенджер"
            placeholder="Telegram, WhatsApp, ВКонтакте…"
            value={formData.messenger}
            onChange={(v) => handleFieldChange('messenger', v)}
          />
          <FormField
            as="textarea"
            id="mc-request"
            name="request"
            label="Запрос"
            required
            value={formData.request}
            onChange={(v) => handleFieldChange('request', v)}
            error={errors.request}
            rows={5}
          />

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setState('idle')}
              disabled={state === 'sending'}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={state === 'sending'}
              aria-busy={state === 'sending'}
            >
              {state === 'sending' ? 'Отправка…' : 'Отправить заявку'}
            </button>
          </div>

          {state === 'error' && (
            <p className={styles.errorMsg} role="alert">
              Не удалось отправить. Попробуйте позже или напишите напрямую.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
