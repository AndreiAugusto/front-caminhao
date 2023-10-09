import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Header } from "../../components/Header/header";
import { MyPieChart } from '../../components/Graficos/PieGraph'
import { MyBarChart } from '../../components/Graficos/GraficoCusto'

import {ResponsiveContainer} from "recharts";

export function Dashboard() {
    const [nOperacoes, setNOperacoes] = useState(0);
    const [somaCusto, setSomaCusto] = useState(0);
    const [somaVeiculos, setSomaVeiculos] = useState(0);
    const [somaAgentes, setSomaAgentes] = useState(0);
    const [operacoes, setOperacoes] = useState();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(windowWidth <= 700);

    useEffect(() => {

        // Fechar sidebar quando tela ficar menor que 700px
        const handleResize = () => {
            const newWindowWidth = window.innerWidth;
            setWindowWidth(newWindowWidth);

            if (newWindowWidth >= 700) {
              setOpenSidebarToggle(false);
            } else {
              setOpenSidebarToggle(true);
            }
          };

          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, []);

    const OpenSidebar = () => {
        
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <main className="main-container">
            <Header OpenSidebar={OpenSidebar} />
            <div className="d-flex w-100 min-vh-100">
                <div>
                    <Sidebar
                        openSidebarToggle={!openSidebarToggle}
                        OpenSidebar={OpenSidebar}
                    />
                </div>
                <div className="p-3 w-100">
                    <div className="main-cards">
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total operações</h3>
                            </div>
                            <h1 className="font18">{nOperacoes ? nOperacoes : 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Custo total</h3>
                            </div>
                            <h1 className="font18">{somaCusto ? somaCusto : 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total veículos</h3>
                            </div>
                            <h1 className="font18">{somaVeiculos ? somaVeiculos : 0}</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total agentes</h3>
                            </div>
                            <h1>{somaAgentes ? somaAgentes : 0}</h1>
                        </div>
                    </div>


                        {operacoes && operacoes.length > 0 ?  (
                            <div className="charts">
                                <ResponsiveContainer width="100%" height="100%">
                                    <MyBarChart />
                                </ResponsiveContainer>

                                <ResponsiveContainer width="100%" height={300}>
                                    <MyPieChart  />
                                </ResponsiveContainer>
                            </div>
                        ): <div></div>}
                </div>
            </div>
        </main>
    );
}
