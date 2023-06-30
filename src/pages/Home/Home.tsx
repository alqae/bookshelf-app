import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSendInvitationMutation } from '@services/api'
import { AppDispatch, addToast, clearToken } from '@store'

interface IHomeProps {
  children?: React.ReactNode
}

interface InvitationForm {
  email: string
}

const formSchema = Yup.object().shape({
  email: Yup.string().email().required(),
})

const Home:React.FC<IHomeProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [sendInvitation] = useSendInvitationMutation()
  const methods = useForm<InvitationForm>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(formSchema)
  })

  const onSendInvitation = async (values: InvitationForm) => {
    try {
      const response = await sendInvitation(values)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={methods.handleSubmit(onSendInvitation)}>
      <input
        type="text"
        placeholder="Email"
        {...methods.register('email')}
      />
      <br />
      <button type="submit">Send Invitation to </button>
      <br />
      <button onClick={() => dispatch(clearToken())}>Log Out</button>
      <br />
      <button
        type="button"
        onClick={() => dispatch(addToast({
          text: 'Example tosat with variant success',
          variant: 'success',
          position: 'topLeft',
        }))}
      >
        topLeft
      </button>
      <button
        type="button"
        onClick={() => dispatch(addToast({
          text: 'Example tosat with variant success',
          variant: 'success',
          position: 'topCenter',
        }))}
      >
        topCenter
      </button>
      <button
        type="button"
        onClick={() => dispatch(addToast({
          text: 'Example tosat with variant success',
          variant: 'success',
          position: 'topRight',
        }))}
      >
        topRight
      </button>
      <br />
      <button
        type="button"
        onClick={() => dispatch(addToast({
          text: 'Example tosat with variant success',
          variant: 'success',
          position: 'bottomLeft',
        }))}
      >
        bottomLeft
      </button>
      <button
        type="button"
        onClick={() => dispatch(addToast({
          text: 'Example tosat with variant success',
          variant: 'success',
          position: 'bottomCenter',
        }))}
      >
        bottomCenter
      </button>
      <button
        type="button"
        onClick={() => dispatch(addToast({
          text: 'Example tosat with variant success',
          variant: 'success',
          position: 'bottomRight',
        }))}
      >
        bottomRight
      </button>
    </form>
  )
}

export default Home
