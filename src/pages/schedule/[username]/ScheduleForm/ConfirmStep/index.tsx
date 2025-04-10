import { useForm } from 'react-hook-form'
import { ConfirmForm, FormActions, FormHeader } from './styles'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from '@phosphor-icons/react'

export function ConfirmStep() {
  const { register, handleSubmit } = useForm()

  function handleConfirmScheduling() {}

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label htmlFor="">
        <Text size="sm">Nome completo</Text>
        <TextInput
          placeholder="Seu nome"
          crossOrigin
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </label>

      <label htmlFor="">
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          placeholder="johndoe@example.com"
          crossOrigin
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </label>

      <label htmlFor="">
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
