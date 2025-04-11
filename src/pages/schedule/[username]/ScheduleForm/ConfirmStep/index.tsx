import { useForm } from 'react-hook-form'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const confimFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail valido' }),
  observation: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confimFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confimFormSchema),
  })

  const router = useRouter()

  const username = router.query.username

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observation } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observation,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome completo</Text>
        <TextInput
          placeholder="Seu nome"
          crossOrigin
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          {...register('name')}
        />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          placeholder="johndoe@example.com"
          crossOrigin
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label htmlFor="">
        <Text size="sm">Observações</Text>
        <TextArea {...register('observation')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
