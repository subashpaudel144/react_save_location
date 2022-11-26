import Head from 'next/head'

import { LocationMap } from '../components/location-map'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Share your location</title>
      </Head>
      <main>
        <LocationMap />
      </main>
    </>
  )
}
