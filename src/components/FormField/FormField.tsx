'use client';

import { useId } from 'react';
import styles from './FormField.module.css';

export interface RadioOption {
  value: string;
  label: string;
}

export type FormFieldProps =
  | {
      type?: 'text' | 'email' | 'tel' | 'password';
      as?: never;
      label: string;
      value: string;
      onChange: (value: string) => void;
      id?: string;
      name?: string;
      placeholder?: string;
      required?: boolean;
      autoComplete?: string;
      error?: string;
      className?: string;
    }
  | {
      type?: 'textarea';
      as?: 'textarea';
      label: string;
      value: string;
      onChange: (value: string) => void;
      id?: string;
      name?: string;
      placeholder?: string;
      required?: boolean;
      rows?: number;
      error?: string;
      className?: string;
    }
  | {
      type: 'radio';
      as?: never;
      label: string;
      options: RadioOption[];
      value: string;
      onChange: (value: string) => void;
      id?: string;
      name?: string;
      required?: boolean;
      error?: string;
      className?: string;
    }
  | {
      type: 'checkbox';
      as?: never;
      label: string;
      checked: boolean;
      onChange: (checked: boolean) => void;
      id?: string;
      name?: string;
      required?: boolean;
      error?: string;
      className?: string;
    };

export default function FormField(props: FormFieldProps) {
  const autoId = useId();
  const fieldId = props.id || autoId;
  const { label, required, error, className = '' } = props;

  // Чекбокс
  if (props.type === 'checkbox') {
    const { checked, onChange, name } = props;
    return (
      <div className={`${styles.field} ${styles.checkboxField} ${className}`}>
        <label className={styles.checkboxLabel} htmlFor={fieldId}>
          <input
            id={fieldId}
            type="checkbox"
            className={styles.checkboxInput}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            name={name}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
          />
          <span className={styles.checkboxText}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                {' '}
                *
              </span>
            )}
          </span>
        </label>
        {error && (
          <span id={`${fieldId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }

  // Радио
  if (props.type === 'radio') {
    const { options, value, onChange, name } = props;
    const groupId = fieldId;
    return (
      <fieldset
        className={`${styles.field} ${styles.radioField} ${className}`}
        aria-describedby={error ? `${groupId}-error` : undefined}
      >
        <legend className={styles.radioLegend}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </legend>
        <div className={styles.radioOptions}>
          {options.map((opt) => {
            const optId = `${groupId}-${opt.value}`;
            return (
              <label key={opt.value} className={styles.radioLabel} htmlFor={optId}>
                <input
                  id={optId}
                  type="radio"
                  className={styles.radioInput}
                  name={name || groupId}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => onChange(e.target.value)}
                  required={required}
                />
                <span className={styles.radioText}>{opt.label}</span>
              </label>
            );
          })}
        </div>
        {error && (
          <span id={`${groupId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </fieldset>
    );
  }

  // Textarea
  if (props.type === 'textarea' || props.as === 'textarea') {
    const { value, onChange, placeholder, rows, name } = props;
    return (
      <div className={`${styles.field} ${className}`}>
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
        <textarea
          id={fieldId}
          name={name}
          className={`${styles.input} ${styles.textarea} ${error ? styles.hasError : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows ?? 4}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
        {error && (
          <span id={`${fieldId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }

  // Text / Email / Tel
  const textProps = props as Extract<
    FormFieldProps,
    { type?: 'text' | 'email' | 'tel' | 'password' }
  >;
  const {
    type = 'text',
    value,
    onChange,
    placeholder,
    autoComplete,
    name,
  } = textProps;
  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        className={`${styles.input} ${error ? styles.hasError : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      />
      {error && (
        <span id={`${fieldId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
