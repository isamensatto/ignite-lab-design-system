import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

export interface HeadingProps {
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  asChild?: boolean
}

//Passando o parametro dessa forma faz com que quando a pessoa não passe o tamanho da fonte ele a defina como md
export function Heading({ size = 'md', children, asChild }: HeadingProps) {
  const Comp = asChild ? Slot : 'h2'

  return (
    <Comp
      className={clsx('text-gray-100 font-bold font-sans', {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg'
      })}
    >
      {children}
    </Comp>
  )
}