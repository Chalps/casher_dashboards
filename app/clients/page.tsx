"use client"

import {Nunito} from "@next/font/google";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {format} from 'date-fns';
import React, {useEffect} from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from "axios";
import {styled, tableCellClasses, TableHead} from "@mui/material";
import {headers} from "next/headers";

const nunito = Nunito({
    weight: ['700'],
    subsets: ['latin'],
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}


export default function ClientsPage() {

    // const res = await fetch('http://localhost:8080/casher/client/list');
    // const client = await res.json();

    const [page, setPage] = React.useState(0);
    const [clients, setClients] = React.useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/casher/client/list', {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000'
                    }
                }
            )

            setClients(result.data);
        };

        fetchData();
    }, [clients]);

    return <>
        <h1 className="text-4xl py-12 m-12" style={nunito.style}> Clientes </h1>
        <div className="m-8">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table"  stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">CPF</StyledTableCell>
                            <StyledTableCell align="right">Data de Nascimento</StyledTableCell>
                            <StyledTableCell align="right">Data de Criação</StyledTableCell>
                            <StyledTableCell align="right">Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : clients
                        ).map((client: any) => (
                            <TableRow key={client.name}>
                                <TableCell component="th" scope="row">
                                    {client.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {client.email}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {client.cpf}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {client.birthDate}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {client.createdAt}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    <Link href={`/clients/${client.id}`} style={{display: "flex", justifyContent: "center"}}> <FontAwesomeIcon icon={ faEdit } height={20} width={20} /></Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={clients.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
        {/*<div className="m-12 table">*/}
        {/*    <table style={{width: "inherit"}}>*/}
        {/*        <tr>*/}
        {/*            <th>Nome</th>*/}
        {/*            <th>Email</th>*/}
        {/*            <th>Data de Nascimento</th>*/}
        {/*            <th>Ações</th>*/}
        {/*        </tr>*/}
        {/*        {clients.map((user:any) => {*/}
        {/*            return (*/}
        {/*                <tr key={user.id}>*/}
        {/*                    <td>{user.fullName}</td>*/}
        {/*                    <td>{user.email}</td>*/}
        {/*                    <td>{format(new Date(user.birthDate), 'dd/mm/yyyy')}</td>*/}
        {/*                    <td><Link href={`/clients/${user.id}`} style={{display: "flex", justifyContent: "center"}}> <FontAwesomeIcon icon={ faEdit } height={20} width={20} /></Link></td>*/}
        {/*                </tr>*/}
        {/*            )*/}
        {/*        })}*/}
        {/*    </table>*/}
        {/*</div>*/}

    </>
}
