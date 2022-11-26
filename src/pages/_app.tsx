import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'

import { ShareLocationFormModal } from '../components/share-location-form-modal'
import { SharedLocationDetailModal } from '../components/shared-location-detail-modal'
import { SharedLocationProvider } from '../context/shared-location'

export default function App({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme()
  const client = useMemo(() => new QueryClient(), [])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <QueryClientProvider client={client}>
        <NotificationsProvider position='top-center'>
          <ModalsProvider
            modals={{
              shareLocation: ShareLocationFormModal,
              sharedLocationDetail: SharedLocationDetailModal,
            }}
          >
            <ReactQueryDevtools />
            <SharedLocationProvider>
              <Component {...pageProps} />
            </SharedLocationProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}
