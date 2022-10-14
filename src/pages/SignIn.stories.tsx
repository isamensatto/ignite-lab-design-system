import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SignIn } from './SignIn'
import { rest } from 'msw'

export default {
  title: 'Pages/SigIn',
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(
            ctx.json({
              message: 'Login realizado!'
            })
          )
        })
      ]
    }
  }
} as Meta

export const Default: StoryObj = {
  //CanvasElement é o elemento do canvas ou seja é o wireframe que mostra nosso componente
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    userEvent.type(
      canvas.getByPlaceholderText('Digite seu e-mail'),
      'isabella@example.com'
    )
    userEvent.type(canvas.getByPlaceholderText('*******'), '12345678')

    userEvent.click(canvas.getByRole('button'))

    //Ele cria um setInterval e fica rodando esse codigo varias vezes durante um tempo até ele passar
    await waitFor(() => {
      return expect(canvas.getByText('Login realizado!')).toBeInTheDocument()
    })
  }
}
