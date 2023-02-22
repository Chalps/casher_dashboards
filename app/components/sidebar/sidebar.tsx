"use client"

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {faHouse, faUser, faLevelUp, faBook, faBookBookmark, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {usePathname} from 'next/navigation';
import {red} from "@mui/material/colors";

export default function Sidebar() {
    const [isExpanded, setExpendState] = useState(false);

    const menuItems = [
        {
            text: "Dashboard",
            path: '',
            icon: faHouse,
        },
        {
            text: "Clientes",
            path: 'clients',
            icon: faUser,
        },
        {
            text: "Níveis",
            path: 'levels',
            icon: faLevelUp,
        },
        {
            text: "Trilhas",
            path: 'trails',
            icon: faBook,
        },
        {
            text: "Módulos",
            path: 'modules',
            icon: faBookBookmark,
        },
        {
            text: "Usuários",
            path: 'user',
            icon: faUser,
        },
    ];

    const pathname = usePathname();
    console.log(pathname)

    return (
        <div
            className={
                isExpanded
                    ? "side-nav-container"
                    : "side-nav-container side-nav-container-NX"
            }
        >
            <div className="nav-upper">
                <div className="nav-heading">
                    {isExpanded && (
                        <div className="nav-brand">
                            <Image src="/assets/casherLogoEscrito.svg" alt="logo" width={1000} height={1000}/>
                        </div>
                    )}
                    <button
                        className={
                            isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                        }
                        onClick={() => {
                            setExpendState(!isExpanded)
                            document.documentElement.style.setProperty('--width-content', !isExpanded ? '300px' : '85px')
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="nav-menu">
                    {menuItems.map(({text, path, icon}) => (
                        <Link className={isExpanded ? pathname === '/'+path ? "menu-item menu-item-selected" : "menu-item" : "menu-item menu-item-NX" && pathname === '/'+path ? "menu-item menu-item-selected" : "menu-item"} href={'/' + path}
                              key={path} >
                            <FontAwesomeIcon className="menu-item-icon" icon={icon} height={20} width={20}
                                             style={{marginRight: 15}}/>
                            {isExpanded && <p style={{fontWeight: 700}}>{text}</p>}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="nav-footer">
                {isExpanded && (
                    <div className="nav-details">
                        <Image className="nav-footer-avatar" src="/assets/casherLogo.svg" alt="logo" width={1000} height={1000}/>
                        <div className="nav-footer-info">
                            <p className="nav-footer-user-name">Casher</p>
                        </div>
                    </div>
                )}
                <FontAwesomeIcon className="logout-icon" icon={faRightFromBracket} height={20} width={20} color="red"
                                 style={{marginRight: 15}}/>
            </div>
        </div>
    )
}
