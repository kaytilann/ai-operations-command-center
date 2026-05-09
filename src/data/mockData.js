export const kpis = [
  { label: "OTIF", value: "96.8%", delta: "+2.4 pts", status: "healthy", detail: "Target: 98%" },
  { label: "Orders at Risk", value: "1,284", delta: "-18%", status: "warning", detail: "Mostly Northeast carrier SLA" },
  { label: "Inventory Exposure", value: "$3.7M", delta: "-$420K", status: "warning", detail: "Aging + excess inventory" },
  { label: "Cost / Order", value: "$8.42", delta: "-6.1%", status: "healthy", detail: "Lower zone 7/8 mix" },
];

export const alerts = [
  {
    severity: "High",
    title: "Northeast fulfillment delay risk",
    description: "Carrier SLA fell 11 pts across NJ and PA lanes. 728 orders may miss promise date.",
    recommendation: "Re-route premium orders to Columbus DC for 72 hours.",
    impact: "$184K revenue protected",
    confidence: 0.86
  },
  {
    severity: "Medium",
    title: "Lavender refill bundle stockout risk",
    description: "Demand is trending 23% above forecast after TikTok campaign lift.",
    recommendation: "Pull 12K units forward from week 28 PO and reduce paid media spend 15%.",
    impact: "$91K contribution margin protected",
    confidence: 0.78
  },
  {
    severity: "Low",
    title: "West Coast warehouse picking variance",
    description: "Pick time has increased 9% for SKU family FR-200 due to slotting changes.",
    recommendation: "Move top 12 SKUs to forward pick zone.",
    impact: "$12K monthly labor savings",
    confidence: 0.72
  }
];

export const forecast = [
  { week: "W1", forecast: 42000, actual: 41400, ai: 41800 },
  { week: "W2", forecast: 43800, actual: 44900, ai: 44600 },
  { week: "W3", forecast: 45200, actual: 46600, ai: 46200 },
  { week: "W4", forecast: 47000, actual: 48900, ai: 48400 },
  { week: "W5", forecast: 49300, actual: 51700, ai: 51100 },
  { week: "W6", forecast: 50600, actual: 52900, ai: 53100 },
];

export const network = [
  { node: "Las Vegas 3PL", otif: 98.4, cost: 7.92, risk: "Low" },
  { node: "Columbus DC", otif: 97.9, cost: 8.18, risk: "Low" },
  { node: "New Jersey 3PL", otif: 91.2, cost: 9.76, risk: "High" },
  { node: "Dallas DC", otif: 96.1, cost: 8.55, risk: "Medium" },
];

export const incidentTimeline = [
  { time: "08:12", event: "Carrier SLA degradation detected", owner: "AI Monitor" },
  { time: "08:19", event: "Root cause narrowed to NJ → Northeast lanes", owner: "AI Analyst" },
  { time: "08:37", event: "Re-route simulation completed", owner: "Ops Copilot" },
  { time: "09:05", event: "Recommended action sent to fulfillment lead", owner: "Workflow Agent" },
];
