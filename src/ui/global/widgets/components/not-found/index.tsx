'use-client'

import Image from 'next/image';
import Link from 'next/link';

export const NotFoundPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50 text-center'>
            <div className='max-w-md w-full'>
                
                <h1 className='text-3xl md:text-4xl font-bold mb-4'>Página não encontrada!</h1>

                <div className='relative w-full h-64 mb-8'>
                    <Image
                        src='/images/404-image.png'
                        alt='Página não encontrada'
                        fill
                        className='
                            object-contain 
                            transition-all duration-500 
                            hover:scale-[1.03] 
                            hover:brightness-[1.05]
                            drop-shadow-md'
                    />
                </div>
                
                <p className='text-gray-600 text-md md:text-lg mb-8'>
                    Ops! Parece que você se perdeu. Verifique o URL ou retorne à página inicial.
                </p>
                
                <Link
                    href="/"
                    className="
                        inline-block px-6 py-3 bg-blue-600 text-white rounded-lg 
                        hover:bg-blue-700 active:bg-blue-800 
                        transform hover:scale-[1.02] active:scale-95 
                        transition-all duration-200 
                        shadow-md hover:shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                    ">
                    Página Inicial
                </Link>
            </div>
        </div>
    )
}