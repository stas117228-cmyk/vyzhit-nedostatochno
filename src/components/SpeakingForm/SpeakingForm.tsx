'use client';

import { useState } from 'react';
import FormField from '@/components/FormField';
import styles from './SpeakingForm.module.css';

type FormState = 'idle' | 'open' | 'sending' | 'sent' | 'error';

export default function SpeakingForm() {
  const [state, setState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    messenger: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const e: Partial<typeof formData> = {};
    if (!formData.name.trim()) e.name = 'Укажите ФИО';
    if (!formData.organization.trim())
      e.organization = 'Укажите организацию или мероприятие';
    if (!formData.phone.trim()) e.phone = 'Укажите телефон';
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
    await new Promise((r) => setTimeout(r, 800));
    setState('sent');
  };

  if (state === 'sent') {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Заявка принята в демо-режиме</p>
        <p className={styles.successText}>
          После подключения обработчика заявки будут поступать автору.
          Введённые данные не сохранены.
        </p>
        <button
          className={styles.resetBtn}
          onClick={() => {
            setState('idle');
            setFormData({
              name: '',
              organization: '',
              phone: '',
              messenger: '',
              message: '',
            });
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
        <button className={styles.openBtn} onClick={() => setState('open')}>
          Заполнить форму
        </button>
      )}

      {(state === 'open' || state === 'sending' || state === 'error') && (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Форма приглашения на выступление"
        >
          <div className={styles.protoBanner} role="status">
            Демо-режим — заявка не отправляется
          </div>

          <FormField
            id="sp-name"
            name="name"
            label="ФИО"
            required
            value={formData.name}
            onChange={(v) => handleFieldChange('name', v)}
            error={errors.name}
            autoComplete="name"
          />
          <FormField
            id="sp-org"
            name="organization"
            label="Название организации / мероприятия"
            required
            value={formData.organization}
            onChange={(v) => handleFieldChange('organization', v)}
            error={errors.organization}
          />
          <FormField
            id="sp-phone"
            name="phone"
            label="Телефон"
            type="tel"
            required
            value={formData.phone}
            onChange={(v) => handleFieldChange('phone', v)}
            error={errors.phone}
            autoComplete="tel"
          />
          <FormField
            id="sp-messenger"
            name="messenger"
            label="Предпочтительный мессенджер"
            placeholder="Telegram, WhatsApp, ВКонтакте…"
            value={formData.messenger}
            onChange={(v) => handleFieldChange('messenger', v)}
          />
          <FormField
            as="textarea"
            id="sp-message"
            name="message"
            label="Сообщение"
            value={formData.message}
            onChange={(v) => handleFieldChange('message', v)}
            rows={4}
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
              {state === 'sending' ? 'Отправка…' : 'Отправить'}
            </button>
          </div>

          {state === 'error' && (
            <p className={styles.errorMsg} role="alert">
              Не удалось отправить. Попробуйте позже.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
