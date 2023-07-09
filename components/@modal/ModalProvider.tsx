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

export default function ModalProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const [lastPathnameBeforeModal, setLastPathnameBeforeModal] =
		useState<string>('/')
	const [isModalActive, setIsModalActive] = useState<boolean>(false)

	useEffect(() => {
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

	const value: ProviderValue = {
		lastPathnameBeforeModal,
		isModalActive,
	}

	return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export function useModalContext() {
	return useContext(ModalContext)
}
