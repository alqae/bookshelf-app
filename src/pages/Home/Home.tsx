import React from 'react'
// import * as Yup from 'yup'
// import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
// import { yupResolver } from '@hookform/resolvers/yup'

// import { useSendInvitationMutation } from '@services/api'
// import { AppDispatch, addToast, clearToken } from '@store'
import Hero from './Hero/Hero'
import BestSellers from './BestSellers'
import WhatToRead from './WhatToRead'
import PopularAuthors from './PopularAuthors'

interface IHomeProps {
  children?: React.ReactNode
}

// interface InvitationForm {
//   email: string
// }

// const formSchema = Yup.object().shape({
//   email: Yup.string().email().required(),
// })

const Home: React.FC<IHomeProps> = () => {
  // const dispatch = useDispatch<AppDispatch>()
  // const [sendInvitation] = useSendInvitationMutation()
  // const methods = useForm<InvitationForm>({
  //   defaultValues: {
  //     email: '',
  //   },
  //   resolver: yupResolver(formSchema)
  // })

  // const onSendInvitation = async (values: InvitationForm) => {
  //   try {
  //     const response = await sendInvitation(values)
  //     console.log(response)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <Hero />
      <BestSellers />
      <WhatToRead />
      <PopularAuthors />

      <section className="container">
        <div className="row gx-2">
          <div className="col-5">
            <div className="panel panel-percentage py-9 text-center">
              <h4>Discounts</h4>
            </div>
          </div>

          <div className="col-7">
            <div className="panel panel-gift py-9 text-center">
              <h4>The best books for a gift</h4>
            </div>
          </div>
        </div>
      </section>
    </>
    // <form onSubmit={methods.handleSubmit(onSendInvitation)}>
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     {...methods.register('email')}
    //   />
    //   <br />
    //   <button type="submit">Send Invitation to </button>
    //   <br />
    // </form>
  )
}

export default Home
