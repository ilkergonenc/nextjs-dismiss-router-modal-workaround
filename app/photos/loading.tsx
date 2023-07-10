import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
	return (
		<div className="container mx-auto">
			<Skeleton className="mx-auto my-10 h-16 w-1/3 rounded" />
			<div className="m-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2	 md:grid-cols-3 lg:grid-cols-3">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
					<Skeleton
						key={item}
						className="aspect-square h-auto w-full rounded"
					/>
				))}
			</div>
		</div>
	)
}
