import {Nunito} from "@next/font/google";
import styles from './page.module.css'

const nunito = Nunito({
    weight: ['700'],
    subsets: ['latin'],
})

export default async function Home() {

    const res = await fetch('http://localhost:8080/casher/client/count');
    const users = await res.json();

    console.log(users)

    return (
        <main>
            <h1 className="text-4xl py-12 m-12" style={nunito.style}> Dashboards Casher </h1>
            <div className="m-12">
                <div className={styles.widget}>
                    <p className="text-6xl py-12 m-12" style={nunito.style}>{users}</p>
                    <h2 className="text-2xl" style={nunito.style}>Usuários</h2>
                </div>
            </div>
        </main>
    )
}
