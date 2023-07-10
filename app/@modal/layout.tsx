import ModalClose from '@/components/@modal/ModalClose'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="fixed inset-0 z-50 bg-background/50">
				<div className="container mx-auto flex h-full max-w-lg items-center">
					<div className="relative h-fit w-full rounded-lg border border-border bg-background px-8 py-16">
						<div className="absolute right-4 top-4">
							<ModalClose />
						</div>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
