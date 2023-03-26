import { resources } from './../i18n/i18n'
import 'i18next'
import { defaultNS, resources } from 'src/i18n/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS
    resources: (typeof resources)['vi']
  }
}
