"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import LoadingScreen from '@/components/Loader/LoadingScreen';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import { Button } from '@material-tailwind/react';
import printJS from 'print-js';

export default function PrintBill({ params }) {
	const id = params?.OrderID;
	const [orderDetails, setOrderDetails] = useState({})
	const [order, setOrder] = useState(null)
	const [loading, setLoading] = useState(true)
	const printRef = useRef(null)

	const handleClickPrint = () => {
		if (!printRef.current) return;
		try {
			printJS({
				printable: 'invoice-container',
				type: 'html',
				targetStyles: ['*'],
				style: `
				  @page { size: A4 portrait; margin: 0; }
				  @media print {
				    html, body { width: 210mm; height: 297mm; margin: 0; padding: 0; }
				    #invoice-container {
				      width: 210mm !important;
				      min-height: 297mm !important;
				      margin: 0 !important;
				      padding: 10mm !important;
				      box-shadow: none !important;
				      border: none !important;
				      -webkit-print-color-adjust: exact;
				      print-color-adjust: exact;
				    }
				  }
				`
			});
		} catch {
			window.print();
		}
	};
  
	useEffect(() => {
	  const fetchOrder = async () => {
		if (!id) return
		try {
		  const snap = await getDoc(doc(db, 'Order', id))
		  if (snap.exists()) {
			setOrder({ id: snap.id, ...snap.data() })
		  }
		} catch (e) {
		  console.error('Failed to load order:', e)
		} finally {
		  setLoading(false)
		}
	  }
	  fetchOrder()
	}, [id])
  
	const invoiceNumber = useMemo(() => {
	  return order?.invoices?.[0]?.ident || order?.OrderID || id
	}, [order, id])
  
	const invoiceDate = useMemo(() => {
	  try {
		const d = new Date()
		return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
	  } catch {
		return ''
	  }
	}, [])
  
	const items = useMemo(() => {
	  return (order?.dimensions || []).map((it, idx) => {
		const qty = Number(it?.p_qty || 0)
		const price = Number(it?.p_price || 0)
		const amount = qty * price || price
		return {
		  id: idx,
		  name: it?.p_name || 'Item',
		  qty,
		  price,
		  amount
		}
	  })
	}, [order])
  
	const totalAmount = useMemo(() => {
	  return items.reduce((sum, it) => sum + (isNaN(it.amount) ? 0 : it.amount), 0)
	}, [items])
	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<div className='min-h-[100vh] bg-gray-100 flex items-center justify-center p-4 print:p-0'>
		<div className='w-full max-w-[980px]'>
		  <div className='flex items-center justify-end mb-4 print:hidden'>
			<Button onClick={handleClickPrint} >
			  Print / Download
			</Button>
		  </div>
  
		  <div id='invoice-container' ref={printRef} className='mx-auto bg-white w-full print:w-[100%] print:min-h-[100%] border border-gray-200 rounded-xl shadow-lg p-8 print:p-10'>
			<header className='flex flex-col md:flex-row md:items-start md:justify-between border-b pb-6 gap-4'>
			  <div className='flex items-center gap-3'>
				<img src={"/asset/Navbar/logo.png"} alt='Company Logo' className='w-[52px] h-[52px] object-contain' />
				<div>
				  <h1 className='text-2xl md:text-3xl font-[GilroyBold] tracking-wide'>Different Clothing</h1>
				  <p className='text-gray-600 text-sm'>Mumbai, India</p>
				</div>
			  </div>
			  <div className='text-left md:text-right'>
				<h2 className='text-xl font-[GilroyBold]'>Invoice</h2>
				<p className='text-sm text-gray-600'>Invoice No: <span className='font-[GilroyBold] text-gray-800'>{invoiceNumber}</span></p>
				<p className='text-sm text-gray-600'>Date: <span className='font-[GilroyBold] text-gray-800'>{invoiceDate}</span></p>
			  </div>
			</header>
  
			<section className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
			  <div className='bg-gray-50 rounded-lg p-4 border'>
				<h3 className='font-[GilroyBold] text-gray-800 mb-2'>Billed To</h3>
				<p className='text-sm font-[GilroyBold] capitalize'>{order?.customerName}</p>
				<p className='text-sm text-gray-700'>{order?.dropoff_location?.address}</p>
				<p className='text-sm text-gray-700'>{order?.dropoff_location?.city}, {order?.dropoff_location?.region} {order?.dropoff_location?.zip}</p>
			  </div>
			  <div className='bg-gray-50 rounded-lg p-4 border'>
				<h3 className='font-[GilroyBold] text-gray-800 mb-2'>From</h3>
				<p className='text-sm font-[GilroyBold]'>Different Clothing</p>
				<p className='text-sm text-gray-700'>Mumbai, India</p>
			  </div>
			</section>
  
			<section className='mt-6'>
			  <table className='w-full border-collapse rounded-lg overflow-hidden'>
				<thead>
				  <tr className='bg-gray-100 text-left'>
					<th className='p-3 text-xs md:text-sm font-[GilroyBold] border'>Description</th>
					<th className='p-3 text-xs md:text-sm font-[GilroyBold] border text-right'>Qty</th>
					<th className='p-3 text-xs md:text-sm font-[GilroyBold] border text-right'>Unit Price</th>
					<th className='p-3 text-xs md:text-sm font-[GilroyBold] border text-right'>Amount</th>
				  </tr>
				</thead>
				<tbody>
				  {items.length === 0 && (
					<tr>
					  <td className='p-3 border text-center text-gray-500 text-sm' colSpan={4}>No items found</td>
					</tr>
				  )}
				  {items.map((it, i) => (
					<tr key={it.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
					  <td className='p-3 border text-sm'>{it.name}</td>
					  <td className='p-3 border text-sm text-right'>{isNaN(it.qty) ? '-' : it.qty}</td>
					  <td className='p-3 border text-sm text-right'>${Number(it.price || 0).toLocaleString()}</td>
					  <td className='p-3 border text-sm text-right'>${Number(it.amount || 0).toLocaleString()}</td>
					</tr>
				  ))}
				</tbody>
			  </table>
			</section>
  
			<section className='mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
			  <div className='md:max-w-[60%] bg-white'>
				<h4 className='font-[GilroyBold] mb-1'>Notes</h4>
				<p className='text-sm text-gray-600'>Thank you for your business. For questions concerning this invoice, please contact support.</p>
			  </div>
			  <div className='min-w-[260px] bg-gray-50 border rounded-lg p-4'>
				<div className='flex items-center justify-between py-2 border-b'>
				  <span className='text-sm text-gray-600'>Subtotal</span>
				  <span className='text-sm font-[GilroyBold]'>${totalAmount.toLocaleString()}</span>
				</div>
				<div className='flex items-center justify-between py-2'>
				  <span className='text-sm text-gray-600'>Total</span>
				  <span className='text-lg font-[GilroyBold]'>${totalAmount.toLocaleString()}</span>
				</div>
			  </div>
			</section>
  
			<footer className='mt-10 pt-4 border-t text-center text-xs text-gray-500'>
			  This is a system generated invoice by Different Clothing.
			</footer>
		  </div>
		</div>
	  </div>
	);
}
