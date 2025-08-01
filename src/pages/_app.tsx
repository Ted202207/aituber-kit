import '@charcoal-ui/icons'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

import { isLanguageSupported } from '@/features/constants/settings'
import homeStore from '@/features/stores/home'
import settingsStore from '@/features/stores/settings'
import '@/styles/globals.css'
import migrateStore from '@/utils/migrateStore'
import i18n from '../lib/i18n'

import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    const hs = homeStore.getState()
    const ss = settingsStore.getState()

    if (hs.userOnboarded) {
      i18n.changeLanguage(ss.selectLanguage)
      return
    }

    migrateStore()

    const browserLanguage = navigator.language
    const languageCode = browserLanguage.match(/^zh/i)
      ? 'zh'
      : browserLanguage.split('-')[0].toLowerCase()

    const language = isLanguageSupported(languageCode) ? languageCode : 'ja'
    i18n.changeLanguage(language)
    settingsStore.setState({ selectLanguage: language })

    homeStore.setState({ userOnboarded: true })
  }, [])

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  )
}
