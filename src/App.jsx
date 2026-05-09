import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  AlertTriangle, Bot, BrainCircuit, CheckCircle2, ChevronRight, DollarSign,
  Factory, LineChart, PackageSearch, ShieldCheck, Sparkles, Truck
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart as RLineChart, Line
} from "recharts";
import { kpis, alerts, forecast, network, incidentTimeline } from "./data/mockData";
import "./styles.css";

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function KpiCard({ item }) {
  return (
    <motion.div className="card kpi" whileHover={{ y: -4 }}>
      <div className="cardHeader">
        <p>{item.label}</p>
        <Badge tone={item.status === "healthy" ? "good" : "warn"}>{item.delta}</Badge>
      </div>
      <h2>{item.value}</h2>
      <span>{item.detail}</span>
    </motion.div>
  );
}

function CopilotPanel() {
  const [question, setQuestion] = useState("Why are delays increasing in the Northeast?");
  return (
    <section className="card copilot">
      <div className="sectionTitle">
        <Bot size={20} />
        <div>
          <h3>Ops Copilot</h3>
          <p>Ask natural-language questions across OMS, WMS, ERP, carrier, and demand data.</p>
        </div>
      </div>
      <div className="promptBox">{question}</div>
      <div className="answer">
        <div className="aiTag"><Sparkles size={16}/> AI-generated root cause</div>
        <p>
          Northeast delays are primarily driven by NJ 3PL carrier handoff failures. The issue began after
          parcel volume exceeded planned capacity by 17% and carrier pickup scans dropped from 98.1% to 89.4%.
        </p>
        <ul>
          <li><strong>Recommended action:</strong> Re-route premium orders to Columbus DC for 72 hours.</li>
          <li><strong>Estimated impact:</strong> protect $184K revenue and recover 1.8 OTIF points.</li>
          <li><strong>Risk:</strong> Columbus labor utilization increases from 82% to 91%.</li>
        </ul>
      </div>
      <div className="chips">
        {["Simulate reroute", "Draft exec update", "Create Jira ticket"].map(x => <button key={x}>{x}</button>)}
      </div>
    </section>
  );
}

function RiskMap() {
  return (
    <section className="card">
      <div className="sectionTitle">
        <Truck size={20} />
        <div>
          <h3>Fulfillment Network Health</h3>
          <p>AI monitors facility, lane, carrier, and inventory risk.</p>
        </div>
      </div>
      <div className="networkGrid">
        {network.map((n) => (
          <div className={`node ${n.risk.toLowerCase()}`} key={n.node}>
            <div>
              <h4>{n.node}</h4>
              <p>OTIF {n.otif}% · ${n.cost}/order</p>
            </div>
            <Badge tone={n.risk === "High" ? "bad" : n.risk === "Medium" ? "warn" : "good"}>{n.risk}</Badge>
          </div>
        ))}
      </div>
    </section>
  );
}

function Alerts() {
  return (
    <section className="card">
      <div className="sectionTitle">
        <AlertTriangle size={20} />
        <div>
          <h3>AI-Prioritized Incidents</h3>
          <p>Ranked by customer impact, financial exposure, and reversibility.</p>
        </div>
      </div>
      <div className="alertList">
        {alerts.map((a) => (
          <div className="alert" key={a.title}>
            <div className="alertTop">
              <Badge tone={a.severity === "High" ? "bad" : a.severity === "Medium" ? "warn" : "neutral"}>{a.severity}</Badge>
              <span>{Math.round(a.confidence * 100)}% confidence</span>
            </div>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <div className="recommendation">
              <BrainCircuit size={16} />
              <span>{a.recommendation}</span>
            </div>
            <strong>{a.impact}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function ForecastChart() {
  return (
    <section className="card wide">
      <div className="sectionTitle">
        <LineChart size={20} />
        <div>
          <h3>Demand Forecast Intelligence</h3>
          <p>Compares baseline forecast, actual demand, and AI-adjusted forecast.</p>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height={250}>
          <RLineChart data={forecast}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="forecast" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="actual" strokeWidth={3} dot />
            <Line type="monotone" dataKey="ai" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </RLineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function ScenarioPanel() {
  return (
    <section className="card scenario">
      <div className="sectionTitle">
        <DollarSign size={20} />
        <div>
          <h3>Scenario Simulator</h3>
          <p>Model financial tradeoffs before approving operational changes.</p>
        </div>
      </div>
      <div className="scenarioGrid">
        <div>
          <label>Safety stock reduction</label>
          <div className="slider"><span style={{width:"65%"}} /></div>
          <b>15%</b>
        </div>
        <div>
          <label>Carrier premium reroute</label>
          <div className="slider"><span style={{width:"42%"}} /></div>
          <b>72 hours</b>
        </div>
      </div>
      <div className="impactBox">
        <div><p>Working capital released</p><h3>$1.2M</h3></div>
        <div><p>Stockout risk increase</p><h3>+1.7 pts</h3></div>
        <div><p>Expected margin impact</p><h3>+$284K</h3></div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="card">
      <div className="sectionTitle">
        <ShieldCheck size={20} />
        <div>
          <h3>Incident Timeline</h3>
          <p>Audit trail for human-in-the-loop operational decisions.</p>
        </div>
      </div>
      <div className="timeline">
        {incidentTimeline.map((i) => (
          <div className="timelineItem" key={i.time}>
            <span>{i.time}</span>
            <div>
              <h4>{i.event}</h4>
              <p>{i.owner}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <main>
      <nav>
        <div className="brand">
          <Factory />
          <div>
            <h1>AI Operations Command Center</h1>
            <p>Predict, explain, and optimize fulfillment performance.</p>
          </div>
        </div>
        <button className="primary">Export exec brief <ChevronRight size={16}/></button>
      </nav>

      <section className="hero">
        <div>
          <Badge tone="good">Portfolio mockup · AI Product Management</Badge>
          <h2>Enterprise AI copilot for operational excellence</h2>
          <p>
            A high-fidelity concept showing how AI can detect fulfillment risk, explain root causes,
            simulate business tradeoffs, and coordinate human approval workflows.
          </p>
        </div>
        <div className="heroStats">
          <div><PackageSearch/><strong>$3.7M</strong><span>inventory exposure</span></div>
          <div><CheckCircle2/><strong>98%</strong><span>target OTIF</span></div>
        </div>
      </section>

      <section className="kpiGrid">
        {kpis.map((item) => <KpiCard key={item.label} item={item} />)}
      </section>

      <section className="mainGrid">
        <div className="leftCol">
          <CopilotPanel />
          <ForecastChart />
          <ScenarioPanel />
        </div>
        <div className="rightCol">
          <Alerts />
          <RiskMap />
          <Timeline />
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
