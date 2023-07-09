import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
	return (
		<div className="container mx-auto">
			<Skeleton className="w-1/3 h-16 rounded mx-auto my-10" />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-max	 gap-6 m-10">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
					<Skeleton
						key={item}
						className="w-full h-auto aspect-square rounded"
					/>
				))}
			</div>
		</div>
	)
}
