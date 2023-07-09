# Dismissing a Modal in Next.js using Parallel or Intercepted App Router

A workaround for an issue regarding [dismissing a modal](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#dismissing-a-modal) when using parallel or intercepted routes in Next.js. There are open issues under the [vercel/next.js](https://github.com/vercel/next.js/issues?q=is%3Aissue+is%3Aopen+modal) GitHub account, and people are trying to find solutions.

However, most of the solutions and examples I have seen so far only resolve single-modal issues related to using `Link` instead of `router.back()` and `catch-all` routes. Only router.back() works successfully, but it is only suitable if you want to toggle a single modal. Even in the [example](https://github.com/vercel-labs/nextgram) provided by Next.js documentation, you can only open one dynamic route photo modal at a time.

In real-life scenarios, such as an authentication modal with multiple related modals like `sign-in, sign-up, and forgot password`; or in a picture showcase where you might want `prev/next navigation` to go through photos, both static and dynamic behaviors require different attention and solutions.

### To address this issue in a real-life case, here is my solution:

- Defined `static` and `dynamic` route pathnames in a ts file.
- Create context provider
	- Created a `ModalProvider` using React's `createContext()`.
	- Used Next.js' `usePathname()` to listen for pathnames and check if they correspond to modal pathnames.
	- Returned `lastPathnameBeforeModal` and `isModalActive` through the provider.

- Bound context
	- Bound the `lastPathnameBeforeModal` prop to your `ModalClose` button component.
	- Bound the `isModalActive` prop to your `ModalOrNot` component.

- Use it in app
	- Wrapped your `RootLayout` with the `ModalProvider` component within `app/layout.tsx`.
	- Wrapped `'modal'` (relavent to @modal parallel route name) with your `ModalOrNot` component.
	- Use the `CloseModal` component in your modal, in my case `app/@modal/layout.tsx` a single layout for all modals.

---
### Define static and dynamic routes

```typescript
//./config/@modal.ts

export const modalStaticPathnames: string[] = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
]

export const modalDynamicPathnames: string[] = ['/photos']
```

### Creating a context provider

```typescript
//./components/@modal/ModalProvider.tsx

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { modalDynamicPathnames, modalStaticPathnames } from '@/config/@modals'

interface ProviderValue {
  lastPathnameBeforeModal: string
  isModalActive: boolean
}

const ModalContext = createContext<ProviderValue>({
  lastPathnameBeforeModal: '/',
  isModalActive: false,
})

export default function ModalProvider({	children }: {	children: React.ReactNode }) {
  const pathname = usePathname()
  const [lastPathnameBeforeModal, setLastPathnameBeforeModal] = useState('/')
  const [isModalActive, setIsModalActive] = useState<boolean>(false)

  useEffect(() => {
    // logic to set states
    // ...
  }, [pathname])

  const value: ProviderValue = {
    lastPathnameBeforeModal,
    isModalActive,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModalContext() {
  return useContext(ModalContext)
}
```

> The logic to set the states is located at the end, following all other code sections.

### Implementing a component to determine whether or not to mount the modal

```typescript
//./components/@modal/ModalOrNot.tsx
'use client'

import { useModalContext } from '@/components/@modal/ModalProvider'

export default function ModalOrNot({ children }: { children: React.ReactNode }) {
  const { isModalActive } = useModalContext()

  return <>{isModalActive && children}</>
}
```

### Developing a dismissible modal component with access to the last mounted pathname

```typescript
//./components/@modal/ModalClose.tsx
'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

export default function ModalClose() {
  const { lastPathnameBeforeModal } = useModalContext()
  return (
    <Link href={lastPathnameBeforeModal}>
      <X aria-label="close modal" />
    </Link>
  )
}
```

### Utilizing the provider by wrapping it around RootLayout and implementing the component to wrap 'modal' provided by paralel routes

```typescript
//./app/layout.tsx

import ModalOrNot from '@/components/@modal/ModalOrNot'
import ModalProvider from '@/components/@modal/ModalProvider'

export const metadata = {
  // ...
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          <ModalOrNot>{modal}</ModalOrNot>
          {children}
        </ModalProvider>
      </body>
    </html>
  )
}
```

### Integrating ModalClose button component in layout for @modals parallel route

```typescript
//./app/@modal/layout.tsx
import ModalClose from '@/components/@modal/ModalClose'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="modal-style-classes">
      <ModalClose />
      {children}
    </div>
  )
}
```

### Applying conditional logic to set states within the provider

```typescript
//./components/@modal/ModalProvider.tsx

//...
export default function ModalProvider({ children }){
  //...

  useEffect(() => {
    // logic to set states
    if (modalStaticPathnames.includes(pathname)) {
      setIsModalActive(true)
    } else {
      setIsModalActive(false)
      if (modalDynamicPathnames.length > 0) {
        modalDynamicPathnames.forEach((dynamicPathname) => {
          if (!pathname.includes(dynamicPathname)) {
            setLastPathnameBeforeModal(pathname)
          }
        })
      } else {
        setLastPathnameBeforeModal(pathname)
      }
    }
    modalDynamicPathnames.forEach((dynamicPathname) => {
      if (pathname === dynamicPathname) {
        setIsModalActive(false)
        setLastPathnameBeforeModal(pathname)
      } else if (pathname.includes(dynamicPathname)) {
        setIsModalActive(true)
      }
    })
  }, [pathname])

//...
return ()
}
```

My goal is to improve this solution and transform the provider into a small, reusable package. I believe that both parallel and intercepted routes are valuable features of AppRouter, and while they may evolve over time, it's important to use them in a safe and correct manner. I am open to any ideas, suggestions, or contributions from to enhance this solution further to create a more sustainable approach for dismissing modals in Next.js. Thank you for your support!

## Try on your localhost

First, run the development server:

```bash
git clone https://github.com/ilkergonenc/nextjs-dismiss-router-modal-workaround.git
```

```bash
cd nextjs-dismiss-router-modal-workaround
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
