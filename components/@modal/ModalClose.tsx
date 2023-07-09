'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import { useModalContext } from '@/components/@modal/ModalProvider'

export default function ModalClose() {
	const { lastPathnameBeforeModal } = useModalContext()
	return (
		<Link
			href={lastPathnameBeforeModal}
			className={cn(
				buttonVariants({ variant: 'ghost' }),
				'h-6 w-6 p-0 rounded-md'
			)}
		>
			<X aria-label="close modal" className="h-4 w-4" />
		</Link>
	)
}
