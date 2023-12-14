import React from 'react'

function Footer() {
  return (
    
<footer className="bg-white rounded-lg shadow dark:bg-gray-900 mx-auto max-w-screen-xl lg:rounded-full left-0 right-0">
<div className="w-full max-w-screen-xl mx-auto p-1 sm:py-1">
    <div className="lg:flex lg:items-center lg:justify-between lg">
        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
            <center style={{display:'table', margin:'auto'}}>
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3 App-logo" alt="Jaby Logo" />
            </center>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://jessy-bandya.web.app/" target='__blank' className="hover:underline">Team ALX Jaby™</a>. All Rights Reserved.</span>

        </ul>
    </div>
</div>
</footer>
  )
}

export default Footer