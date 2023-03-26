import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import PRODUCT_VI from 'src/locales/vi/product.json'
import CART_EN from 'src/locales/en/cart.json'
import CART_VI from 'src/locales/vi/cart.json'
import AUTH_EN from 'src/locales/en/auth.json'
import AUTH_VI from 'src/locales/vi/auth.json'
import PROFILE_EN from 'src/locales/en/profile.json'
import PROFILE_VI from 'src/locales/vi/profile.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    auth: AUTH_EN,
    profile: PROFILE_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    auth: AUTH_VI,
    profile: PROFILE_VI
  }
}

export const defaultNS = 'home'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home', 'product', 'cart', 'auth', 'profile'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
