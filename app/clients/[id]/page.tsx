import {Nunito} from "@next/font/google";
import styles from 'app/clients/[id]/client.module.css'
import Image from "next/image";

const nunito = Nunito({
    weight: ['700'],
    subsets: ['latin'],
})

// @ts-ignore
export default async function ClientEdit({params}) {
    console.log(params)
    const res = await fetch(`http://localhost:8080/casher/client/${params.id}`);
    const user = await res.json();

    console.log(user)

    return (
        <div>
            <h1 className="text-4xl py-12 m-12" style={nunito.style}>User Details</h1>
            <div className={styles.container}>
                <div className={styles.form}>
                    <div className={styles.circleImg}>
                        {/*<Image src={user.photoUrl} alt={user.nickName} width={1000} height={1000} style={{width: "100%", height: "100%"}}/>*/}
                    </div>
                    <form className={styles.formInputs}>
                        <div className={styles.formInputs}>
                            <label className={styles.label}>
                                Nome:
                                <input
                                    className={styles.input}
                                    value={user.nickName}
                                    disabled={true}
                                />
                            </label>
                            <label className={styles.label}>
                                Nome Completo:
                                <input
                                    className={styles.input}
                                    value={user.name}
                                    disabled={true}
                                />
                            </label>
                            <label className={styles.label}>
                                Email:
                                <input
                                    className={styles.input}
                                    value={user.email}
                                    disabled={true}
                                />
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
