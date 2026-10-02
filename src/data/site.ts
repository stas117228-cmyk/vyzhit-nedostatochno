// Конфигурация сайта
// Замените заглушки реальными данными перед запуском

export const siteConfig = {
  author: 'Даниил Сергеев',
  bookTitle: 'Выжить недостаточно',
  description:
    'Авторский лендинг книги Даниила Сергеева «Выжить недостаточно» — о продажах, управлении людьми и предпринимательском мышлении.',

  // Стоимость книги — заполнить после согласования
  bookPrice: null as string | null,
  bookCurrency: 'RUB' as string,

  // Социальные сети — заполнить реальными URL
  social: {
    telegram: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM || null,
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || null,
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || null,
    vk: process.env.NEXT_PUBLIC_SOCIAL_VK || null,
  },

  // Режим сайта
  siteMode: (process.env.NEXT_PUBLIC_SITE_MODE || 'prototype') as
    | 'prototype'
    | 'live',
};
