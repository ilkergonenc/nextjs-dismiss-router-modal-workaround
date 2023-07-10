import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Icons } from '@/lib/icons'
import { buttonVariants } from '@/components/ui/Button'

export default function IndexPage() {
	return (
		<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			<div className="flex max-w-[980px] flex-col items-start gap-2">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
					Beautifully designed components <br className="hidden sm:inline" />
					built with Radix UI and Tailwind CSS.
				</h1>
				<p className="max-w-[700px] text-lg text-muted-foreground">
					Accessible and customizable components that you can copy and paste
					into your apps. Free. Open Source. And Next.js 13 Ready.
				</p>
			</div>
			<div className="flex gap-4">
				<Link
					href={siteConfig.links.docs}
					target="_blank"
					rel="noreferrer"
					className={buttonVariants()}
				>
					shadcn/ui
				</Link>
				<Link
					href={'https://tailwindcss.com/docs/'}
					target="_blank"
					rel="noreferrer"
					className={buttonVariants({ variant: 'secondary' })}
				>
					Tailwind CSS
				</Link>
				<Link
					target="_blank"
					rel="noreferrer"
					href={siteConfig.links.github}
					className={buttonVariants({ variant: 'outline' })}
				>
					<Icons.gitHub className="mr-2 h-5 w-5 fill-current" />
					<b>@shadcn</b>
				</Link>
			</div>
		</section>
	)
}
