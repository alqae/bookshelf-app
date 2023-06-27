import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSendInvitationMutation } from '@services/api'
import { AppDispatch, clearToken } from '@store'
import './styles.scss'

interface IHomeProps {
  children?: React.ReactNode;
}

interface InvitationForm {
  email: string;
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
      const response = await sendInvitation(values);
      console.log(response)
    } catch (error) {
      console.error(error);
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
      <button type="submit">Send Invitation</button>
      <br />
      <button onClick={() => dispatch(clearToken())}>Log Out</button>
    </form>
  );
}

export default Home
