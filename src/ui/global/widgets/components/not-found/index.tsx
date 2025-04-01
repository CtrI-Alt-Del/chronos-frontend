'use-client'

import Image from 'next/image';
import Link from 'next/link';

export const NotFoundPage = () => {
    return(
        <div className='flex justify-center items-center min-h-screen p-4 bg-gray-50'>
            <div className='border border-gray-200 rounded-lg shadow-lg p-8 md:p-12 bg-white max-w-4xl w-full hover:shadow-xl transition-shadow duration-300'>
                <div className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='md:flex-1 flex flex-col justify-center'>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='text-red-500 text-2xl hover:rotate-12 transition-transform duration-300'>❌</span>
                            <h1 className='text-3xl md:text-4xl font-bold'>Página não encontrada!</h1>
                        </div>
                        <p className='text-gray-600 text-md md:text-lg mb-6'>
                            Ops! Parece que você se perdeu. Verifique o URL ou retorne à página inicial.
                        </p>
                        <div className='flex justify-center md:justify-start'>
                            <Link 
                                href="/" 
                                className="
                                    px-6 py-2 bg-blue-600 text-white rounded-lg 
                                    hover:bg-blue-700 active:bg-blue-800 
                                    transform hover:scale-[1.02] active:scale-95 
                                    transition-all duration-200 
                                    shadow-md hover:shadow-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500
                                    text-center
                                ">
                                Página Inicial
                            </Link>
                        </div>
                    </div>
                    <div className='md:flex-1 flex justify-center items-center'>
                        <div className='relative group'>
                            <Image
                                src='/images/404-not-found-page.png'
                                alt='Página não encontrada'
                                width={350}
                                height={300}
                                className='
                                    w-auto h-auto max-w-full 
                                    transition-all duration-500 
                                    group-hover:scale-[1.03] 
                                    group-hover:brightness-[1.05]
                                    drop-shadow-md'/>
                            <div className='
                                absolute inset-0
                                mix-blend-multiply opacity-0 
                                rounded-lg transition-opacity duration-500
                            ' />
                        </div>
                    </div>
                </div>
                <div className='mt-8 pt-4 border-t border-gray-100 flex justify-center text-sm text-gray-500'>
                    <Link 
                        href="https://github.com/CtrI-Alt-Del" 
                        className='hover:text-blue-600 transition-colors duration-200'>
                        By Ctrl-Alt-Del
                    </Link>
                </div>
            </div>
        </div>
    )
}