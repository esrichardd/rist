import { Image } from 'primereact/image';
export const AuthComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='flex flex-column align-items-center mb-4'>
                <p className='text-center text-lg px-4'>Welcome to the most complete personal finance manager.</p>
                <Image src="/logo.svg" alt="Logo" className="w-100" />
            </div>
            <div className='w-full flex align-items-center flex-column'>
                {children}
            </div>
        </>
    )
}