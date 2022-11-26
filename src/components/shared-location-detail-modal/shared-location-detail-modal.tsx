import { Stack, Text } from '@mantine/core'
import type { ContextModalProps } from '@mantine/modals'
import type { SharedLocation } from '@prisma/client'
import Image from 'next/image'

export type SharedLocationDetailModalProps = {
  sharedLocation: SharedLocation
}
export function SharedLocationDetailModal({
  innerProps: { sharedLocation },
}: ContextModalProps<SharedLocationDetailModalProps>) {
  const { name, type, logo } = sharedLocation
  return (
    <Stack>
      <Image
        src={`/shared-locations/logos/${logo}`}
        width={400}
        height={200}
        style={{ objectFit: 'cover' }}
        alt={`${name} Logo`}
      />
      <Text>Name : {name}</Text>
      <Text>Location type : {type}</Text>
    </Stack>
  )
}
