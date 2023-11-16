import Link from 'next/link'
 
const NotFound = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='flex flex-col items-center gap-y-4'>
        <span className='text-2xl text-amber-600 font-bold'>Page not found!</span>
        <span className='text-2xl text-amber-600 font-bold'>Oops! The page that you are looking for can't be found!</span>
        <Link href="/" className='btn' >Return Home</Link>
      </div>
    </div>
  )
}

export default NotFound