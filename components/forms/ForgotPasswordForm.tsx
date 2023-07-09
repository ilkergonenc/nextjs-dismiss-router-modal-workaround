'use client'

// import Link from 'next/link'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { toast } from '@/components/ui/useToast'

const formSchema = z.object({
	email: z.string().email(),
})

export default function ForgotPasswordForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		// console.log(values)
		return toast({
			title: 'Form Values',
			description: JSON.stringify(values),
			// code: true,
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
				noValidate
				autoComplete="off"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email address</FormLabel>
							<FormControl>
								<Input type="email" placeholder="shadcn@mail.com" {...field} />
							</FormControl>
							{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center">
						<Link href="/sign-in">Sign In</Link>
						<span className="mx-2">/</span>
						<Link href="/sign-up">Sign Up</Link>
					</div>
					<Button variant="secondary" type="submit" className="px-12">
						Reset Password
					</Button>
				</div>
			</form>
		</Form>
	)
}
