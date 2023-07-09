'use client'

import { useModalContext } from '@/components/@modal/ModalProvider'

export default function ModalOrNot({
	children,
}: {
	children: React.ReactNode
}) {
	const { isModalActive } = useModalContext()

	return <>{isModalActive && children}</>
}
