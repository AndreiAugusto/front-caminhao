import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header/header";
import { MyPieChart } from '../../components/Graficos/PieGraph'
import { MyBarChart } from '../../components/Graficos/GraficoCusto'

import {ResponsiveContainer} from "recharts";
import { getCountCaminhoes, getCountOficinas, getSomaManutencao } from "../../services/dashboard-service";

export function Dashboard() {
    const { logout } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [nManutencoes, setNManutencoes] = useState(null);
    const [nCaminhoes, setNCaminhoes] = useState(null);
    const [nOficinas, setNOficinas] = useState(null);

    useEffect(()=>{
        buscarDados()
    }, []);

    async function buscarDados(){
        try {
            const countManutencao = await getSomaManutencao();
            setNManutencoes(countManutencao.data);
            const countCaminhoes = await getCountCaminhoes();
            setNCaminhoes(countCaminhoes.data);
            const countOficinas = await getCountOficinas();
            setNOficinas(countOficinas.data);
        } catch (error) {
            logout();
        }
    }

    return (
        <main className="main-container">
            <Header/>
            <div>
                <div className="p-3 w-100">
                    <div className="main-cards">
                        <div className="card">
                            <div className="card-inner">
                                <h3>Caminhões</h3>
                            </div>
                            <h1>{nCaminhoes || 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Manutenções</h3>
                            </div>
                            <h1>{nManutencoes || 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Oficinas</h3>
                            </div>
                            <h1>{nOficinas || 0}</h1>
                        </div>
                    </div>
                    <div className="charts">
                        <ResponsiveContainer width="100%" height="100%">
                            <MyBarChart />
                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height={300}>
                            <MyPieChart  />
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </main>
    );
}
