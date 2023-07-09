import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
	return (
		<div className="flex flex-col gap-8">
			<Skeleton className="h-8 w-2/3 rounded" />
			<div className="flex w-full items-center justify-between">
				<Skeleton className="h-4 w-1/2 rounded" />
				<Skeleton className="h-8 w-24 rounded" />
			</div>
		</div>
	)
}
