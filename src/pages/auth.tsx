import Footer from '@/components/Footer'
import { GithubIcon, GoogleIcon } from '@/components/Icons'
import Input from '@/components/Input'
import { type NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import React, { useCallback, useState } from 'react'

const Auth: NextPage = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [variant, setVariant] = useState('login')

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'))
	}, [])

	const login = useCallback(async () => {
		try {
			const res = await signIn('credentials', { email, password, callbackUrl: '/profiles' })
			if (res?.ok === false) {
				console.error(res.error)
				// enqueueSnackbar(res.error, { variant: 'warning' })
			}
		} catch (error) {
			console.error(error)
		}
	}, [email, password])

	const register = useCallback(async () => {
		try {
			await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					name,
					password
				})
			})

			login()
		} catch (error) {
			console.error(error)
		}
	}, [email, name, password, login])

	return (
		<>
			<Head>
				<title>Login Netfliz Clone App</title>
				<meta
					property='description'
					content='This website is an educational project and is not intended to be an official Netflix replica. 
					The content used on this site is for demonstration and testing of programming and web design skills only. 
					Access to actual Netflix content is not provided. 
					The project is for educational purposes and we are not responsible for any misuse of the site. 
					The end user is responsible for their use of the site.'
				/>
				<meta
					name='keywords'
					content='Next.js, React.js, create-t3-app, Prisma.io, Tailwind CSS, NextAuth.js, Typescript, Mongo'
				/>
			</Head>
			<div className='relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
				<div className='bg-black w-full sm:h-full lg:bg-opacity-50'>
					<nav className='px-12 py-5'>
						<img src='/images/logo.png' alt='logo' className='h-12' />
					</nav>
					<div className='flex flex-col justify-center'>
						<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
							<h2 className='text-white text-4xl mb-8 font-semibold'>{variant === 'login' ? 'Sign in' : 'Register'}</h2>
							<div className='flex flex-col gap-4'>
								{variant === 'register' && (
									<Input
										label='Username'
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
										id='name'
										value={name}
									/>
								)}
								<Input
									label='Email'
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
									id='email'
									type='emil'
									value={email}
								/>
								<Input
									label='Password'
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
									id='password'
									type='password'
									value={password}
								/>
							</div>
							<button
								type='button'
								className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
								onClick={variant === 'login' ? login : register}
							>
								{variant === 'login' ? 'Login' : 'Sign up'}
							</button>
							<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
								<div
									className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
									onClick={() => signIn('google', { callbackUrl: '/profiles' })}
								>
									<GoogleIcon width='32px' height='32px' />
								</div>
								<div
									className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
									onClick={() => signIn('github', { callbackUrl: '/profiles' })}
								>
									<GithubIcon width='32px' height='32px' />
								</div>
							</div>
							<p className='text-neutral-500 mt-12'>
								{variant === 'login' ? 'First time using Netfliz Clone?' : 'Already have an account?'}
								<span className='text-white ml-1 hover:underline cursor-pointer' onClick={toggleVariant}>
									{variant === 'login' ? 'Create account' : 'Login'}
								</span>
							</p>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		</>
	)
}

export default Auth
