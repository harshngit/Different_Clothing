import React, { useState } from 'react'
import { FaArrowRight, FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { db } from '@/app/firebase.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const ContactForm = () => {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [status, setStatus] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!fullName || !email || !message) {
			setStatus({ type: 'error', text: 'Please fill name, email and message.' })
			return
		}
		try {
			setSubmitting(true)
			await addDoc(collection(db, 'contactMessages'), {
				fullName,
				email,
				subject,
				message,
				createdAt: serverTimestamp(),
			})
			setStatus({ type: 'success', text: 'Thanks! Your message has been sent.' })
			setFullName('')
			setEmail('')
			setSubject('')
			setMessage('')
		} catch (err) {
			setStatus({ type: 'error', text: 'Failed to send. Please try again.' })
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<section className="w-full py-12 lg:py-16">
			<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left: Copy + details */}
				<div className="lg:col-span-6">
					
					<h2 className="text-4xl lg:text-6xl font-playfair leading-tight">
						We are always ready to help you and answer your questions
					</h2>
					<p className="mt-4 text-sm text-gray-600 max-w-prose">
						Pacific hake false trevally queen parrotfish black prickleback moshead warbonnet sweeper.
					</p>

					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-gray-700">
						<div>
							<h4 className="font-medium text-gray-900">Call Center</h4>
							<p className="mt-2">800 100 975 20 34</p>
							<p>+ (123) 1800-234-5678</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900">Our Location</h4>
							<p className="mt-2">USA, New York – 1060</p>
							<p>Str. First Avenue 1</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900">Email</h4>
							<p className="mt-2">support@example.com</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-900">Social network</h4>
							<div className="mt-2 flex gap-3 text-gray-700">
								<span className="w-8 h-8 grid place-items-center border border-gray-200 rounded-full"><FaFacebookF /></span>
								<span className="w-8 h-8 grid place-items-center border border-gray-200 rounded-full"><FaXTwitter /></span>
								<span className="w-8 h-8 grid place-items-center border border-gray-200 rounded-full"><FaInstagram /></span>
								<span className="w-8 h-8 grid place-items-center border border-gray-200 rounded-full"><FaLinkedinIn /></span>
							</div>
						</div>
					</div>
				</div>

				{/* Right: Form card */}
				<div className="lg:col-span-6">
					<div className="rounded-3xl bg-gray-100 p-6 lg:p-10">
						<h3 className="text-2xl font-semibold text-gray-900">Get in Touch</h3>
						<p className="mt-2 text-sm text-gray-600">Define your goals and identify areas where we can add value to your business</p>

						<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
							<input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Full name" className="w-full bg-transparent border-b border-gray-300 focus:border-black outline-none py-3 text-sm" />
							<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full bg-transparent border-b border-gray-300 focus:border-black outline-none py-3 text-sm" />
							<input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Subject" className="w-full bg-transparent border-b border-gray-300 focus:border-black outline-none py-3 text-sm" />
							<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" placeholder="Message" className="w-full bg-transparent border-b border-gray-300 focus:border-black outline-none py-3 text-sm" />

							<div className="flex items-center gap-3">
								<button disabled={submitting} type="submit" className={`inline-flex items-center gap-2 mt-2 px-5 py-3 rounded-full text-sm ${submitting ? 'bg-gray-400 text-white' : 'bg-black text-white'}`}>
									<FaArrowRight />
									{submitting ? 'Sending...' : 'Send a message'}
								</button>
								{status && (
									<span className={`text-xs mt-2 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{status.text}</span>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactForm


