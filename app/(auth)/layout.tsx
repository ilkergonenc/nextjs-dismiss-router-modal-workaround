export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			<div className="lg:w-1/3 max-w-[980px] mx-auto">{children}</div>
		</section>
	)
}
