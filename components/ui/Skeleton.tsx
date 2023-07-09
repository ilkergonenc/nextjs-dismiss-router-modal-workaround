import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const skeletonVariants = cva('animate-pulse bg-muted', {
	variants: {
		shape: {
			default: 'rounded-md',
			circle: 'rounded-full',
		},
		size: {
			default: 'h-12 w-12',
			sm: 'h-8 w-8',
			lg: 'h-16 w-16',
			line: 'h-4 w-full',
		},
	},
	defaultVariants: {
		shape: 'default',
		size: 'default',
	},
})

export interface SkeletonProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, shape, size, ...props }: SkeletonProps) {
	return (
		<div
			className={cn(skeletonVariants({ shape, size, className }))}
			{...props}
		/>
	)
}

export { Skeleton }
