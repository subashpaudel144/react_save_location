import type { SelectItem } from '@mantine/core'
import {
  Button,
  createStyles,
  FileInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import type { ContextModalProps } from '@mantine/modals'
import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import Image from 'next/image'
import { useCallback } from 'react'

import type { CreateSharedLocationPayload } from '../../hooks/use-create-shared-location'
import { useCreateSharedLocation } from '../../hooks/use-create-shared-location'
import type { CreateSharedLocationFormInputs } from '../../schemas/create-shared-location-schema'
import { createSharedLocationSchema } from '../../schemas/create-shared-location-schema'

export type ShareLocationFormModalProps = {
  longitude: number
  latitude: number
}

const locationTypes: SelectItem[] = [
  { label: 'Home', value: 'home' },
  { label: 'Work', value: 'work' },
  { label: 'Business', value: 'business' },
  { label: 'Tourism', value: 'tourism' },
  { label: 'School', value: 'school' },
  { label: 'Other', value: 'other' },
]
export function ShareLocationFormModal({
  innerProps: { latitude, longitude },
}: ContextModalProps<ShareLocationFormModalProps>) {
  const { mutate, isLoading } = useCreateSharedLocation()
  const { classes } = useStyles()

  const form = useForm<CreateSharedLocationFormInputs>({
    initialValues: {
      locationName: '',
      locationType: 'home',
      locationLogo: undefined,
    },
    validate: zodResolver(createSharedLocationSchema),
  })

  const previewImage = form.values.locationLogo
    ? URL.createObjectURL(form.values.locationLogo)
    : null

  const handleFormSubmit = useCallback(
    (values: CreateSharedLocationFormInputs) => {
      const { locationLogo, locationName, locationType } = values
      if (!locationLogo) return
      const createSharedLocationPayload: CreateSharedLocationPayload = {
        name: locationName,
        type: locationType,
        logo: locationLogo,
        longitude,
        latitude,
      }
      const formData = new FormData()
      Object.keys(createSharedLocationPayload).forEach(key => {
        if (key === 'logo') {
          formData.append('files', createSharedLocationPayload[key])
          return
        }
        formData.append(
          key,
          String(
            createSharedLocationPayload[
              key as keyof CreateSharedLocationPayload
            ]
          )
        )
      })
      mutate(formData, {
        onSuccess: message => {
          closeAllModals()
          showNotification({
            title: 'Success',
            message,
          })
        },
      })
    },
    []
  )
  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label='Location Name'
          placeholder='Enter your location name'
          {...form.getInputProps('locationName')}
        />
        <Select
          withAsterisk
          label='Location Type'
          data={locationTypes}
          placeholder='Select your location type'
          {...form.getInputProps('locationType')}
        />
        <FileInput
          withAsterisk
          label='Logo'
          placeholder='Upload location logo'
          accept='image/*'
          {...form.getInputProps('locationLogo')}
        />
        {previewImage && (
          <Image
            src={previewImage}
            width={150}
            height={150}
            alt='Preview'
            className={classes.previewImage}
          />
        )}
        <Button type='submit' loading={isLoading}>
          Share Location
        </Button>
      </Stack>
    </form>
  )
}
const useStyles = createStyles(theme => ({
  previewImage: {
    borderRadius: theme.radius.md,
    objectFit: 'cover',
  },
}))
