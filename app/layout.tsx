import './globals.css'
import {Kodchasan} from "@next/font/google"
import Link from 'next/link'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Script from 'next/script';
import {faHouse,faUser,faLevelUp,faBook,faBookBookmark} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/sidebar/sidebar";
import React from "react";


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
                <Sidebar />
                <div className="content">
                    {children}
                </div>
                <Script src="https://kit.fontawesome.com/d66e62d3f7.js" crossOrigin="anonymous"></Script>
            </body>
        </html>
    )
}
