import {Nunito} from "@next/font/google";
import styles from 'app/clients/[id]/client.module.css'
import Form from "../../../components/level/form";
import LevelForm from "../../../components/level/form";

const nunito = Nunito({
    weight: ['700'],
    subsets: ['latin'],
})

// @ts-ignore
export default async function LevelEdit({params}) {

    let level

    if (params.type == 'edit') {
        const res = await fetch(`http://localhost:8080/casher/level/${params.level}`);
        level = await res.json();
    }

    return (
        <div>
            <h1 className="text-4xl py-12 m-12" style={nunito.style}>Level Details</h1>
            <div className={styles.container}>
                <div className={styles.form}>
                    <LevelForm />
                </div>
            </div>
        </div>
    )
}
