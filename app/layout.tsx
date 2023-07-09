import '@/styles/globals.css'

import { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/Toaster'
import ModalOrNot from '@/components/@modal/ModalOrNot'
import ModalProvider from '@/components/@modal/ModalProvider'
import SiteHeader from '@/components/SiteHeader'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode
	modal: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ModalProvider>
						<div className="relative flex min-h-screen flex-col">
							<ModalOrNot>{modal}</ModalOrNot>
							<SiteHeader />
							<main className="flex-1">{children}</main>
						</div>
						<Toaster />
					</ModalProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
