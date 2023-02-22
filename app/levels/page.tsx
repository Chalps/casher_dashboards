import {Nunito} from "@next/font/google";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { format } from 'date-fns';

const nunito = Nunito({
    weight: ['700'],
    subsets: ['latin'],
})

export default async function LevelsPage() {

    const res = await fetch('http://localhost:8080/casher/level/list');
    const levels = await res.json();

    console.log(levels)

    return <>
        <h1 className="text-4xl py-12 m-12" style={nunito.style}> Levels </h1>
        <div className="m-12 table">
            <div className="btn-row">
                <Link className="include-btn" href={`/levels/add/0`}>Incluir</Link>
            </div>
            <table style={{width: "inherit"}}>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data de Nascimento</th>
                    <th>Ações</th>
                </tr>
                {levels.length > 0 ? levels.map((level:any) => {
                    return (
                        <tr key={level.id}>
                            <td>{level.fullName}</td>
                            <td>{level.email}</td>
                            <td>{format(new Date(level.birthDate), 'dd/mm/yyyy')}</td>
                            <td><Link href={`/level/${level.id}`} style={{display: "flex", justifyContent: "center"}}>
                                <FontAwesomeIcon icon={faEdit} height={20} width={20}/></Link></td>
                        </tr>
                    )
                }) : <p>Nenhum dado encontrado</p>}
            </table>
        </div>

    </>
}
