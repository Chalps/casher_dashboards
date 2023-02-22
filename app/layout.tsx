import './globals.css'
import {Kodchasan} from "@next/font/google"
import Link from 'next/link'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Script from 'next/script';
import {faHouse,faUser,faLevelUp,faBook,faBookBookmark} from "@fortawesome/free-solid-svg-icons";


const kodchasan = Kodchasan({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat',
})

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head/>
            <body className={`${kodchasan.className}`}>
                    <div className="sidebar">
                        <Image src="/assets/casherLogoEscrito.svg" alt="logo" width={1000} height={1000}/>

                        <Link href="/"> <FontAwesomeIcon icon={ faHouse } height={20} width={20} style={{marginRight: 15}}/> Home</Link>
                        <Link href="/clients"> <FontAwesomeIcon icon={ faUser } height={20} width={20} style={{marginRight: 15}}/>Clients</Link>
                        <Link href="/levels"> <FontAwesomeIcon icon={ faLevelUp } height={20} width={20} style={{marginRight: 15}}/>Levels</Link>
                        <Link href="/trails"> <FontAwesomeIcon icon={ faBook } height={20} width={20} style={{marginRight: 15}}/>Trails</Link>
                        <Link href="/modules"> <FontAwesomeIcon icon={ faBookBookmark } height={20} width={20} style={{marginRight: 15}}/>Modules</Link>
                    </div>

                    <div className="content">
                        {children}
                    </div>
                <Script src="https://kit.fontawesome.com/d66e62d3f7.js" crossOrigin="anonymous"></Script>
            </body>
        </html>
    )
}
