"use client"

import {useState} from "react";
import styles from "../../clients/[id]/client.module.css";
import {headers} from "next/headers";

export default function LevelForm(level: any) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    async function saveLevel(e:React.FormEvent) {
        e.preventDefault()
        const data = await fetch(`http://localhost:8080/casher/level/create`, {
            method: "POST",
            body: JSON.stringify({name:name, description:description}),
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'}
        })
        const res = await data.json()
        if (!res.ok) console.log(res)
    }

    return (
        <div>
            <form className={styles.formInputs} onSubmit={saveLevel}>
                <div className={styles.formInputs}>
                    <label className={styles.label}>
                        Nome:
                        <input
                            className={styles.input}
                            placeholder="Nome do Nível"
                            value={name}
                            onChange={({target}) => setName(target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        Descrição:
                        <textarea
                            className={styles.input}
                            placeholder="Descrição do Nível"
                            value={description}
                            onChange={({target}) => setDescription(target.value)}
                        />
                    </label>
                </div>
                <div className={styles.buttonsRow}>
                    <button className={styles.cancelBtn} >Cancelar</button>
                    <button className={styles.submitBtn} type={"submit"}>Salvar</button>
                </div>
            </form>
        </div>
    )
}
