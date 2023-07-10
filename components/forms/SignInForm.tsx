'use client'

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
	password: z
		.string()
		// .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
		// .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
		// .regex(new RegExp('.*\\d.*'), 'One number')
		// .regex(
		// 	new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
		// 	'One special character'
		// )
		.min(8, 'Must be at least 8 characters in length'),
})

export default function SignInForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
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
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex w-full items-center justify-between">
								<FormLabel>Password</FormLabel>
								<Link
									href="/forgot-password"
									className="text-sm underline underline-offset-auto"
								>
									Forgot password?
								</Link>
							</div>
							<FormControl>
								<Input
									type="password"
									placeholder="********"
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex w-full items-center justify-between">
					<p>
						Are you new?
						<Link href="/sign-up" className="ml-2 underline underline-offset-2">
							Sign up
						</Link>
					</p>
					<Button variant="secondary" type="submit" className="px-12">
						Login
					</Button>
				</div>
			</form>
		</Form>
	)
}
