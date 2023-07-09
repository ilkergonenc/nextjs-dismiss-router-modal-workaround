import ModalClose from '@/components/@modal/ModalClose'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="fixed inset-0 bg-background/50 z-50">
				<div className="container flex items-center h-full max-w-lg mx-auto">
					<div className="relative bg-background w-full h-fit py-16 px-8 rounded-lg border border-border">
						<div className="absolute top-4 right-4">
							<ModalClose />
						</div>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
