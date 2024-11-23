import {NextUIProvider} from '@nextui-org/react'
// import {NextUIProvider} from '../../node_modules/@nextui-org/react/dist/index'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider className='h-full min-h-screen relative'>
      {children}
    </NextUIProvider>
  )
}