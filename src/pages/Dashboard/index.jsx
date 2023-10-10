import React from "react";
import { Header } from "../../components/Header/header";
import { MyPieChart } from '../../components/Graficos/PieGraph'
import { MyBarChart } from '../../components/Graficos/GraficoCusto'

import {ResponsiveContainer} from "recharts";

export function Dashboard() {

    return (
        <main className="main-container">
            <Header/>
            <div className="">
                <div className="p-3 w-100">
                    <div className="main-cards">
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total operações</h3>
                            </div>
                            <h1 className="font18">0</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Custo total</h3>
                            </div>
                            <h1 className="font18">0</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total veículos</h3>
                            </div>
                            <h1 className="font18">0</h1>
                        </div>
                        <div className="card">
                            <div className="card-inner">
                                <h3>Total agentes</h3>
                            </div>
                            <h1>0</h1>
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