import { useState, useEffect } from "react";
import PaymentProviders from "./PaymentProviders";
import PaymentTerminals from "./PaymentTerminals";
import Payments from "./Payments";

const PAYMENT_PROVIDER_ENTITY_NAME = "paymentprovider";
const PAYMENT_TERMINAL_ENTITY_NAME = "paymentterminal";
const PAYMENT_ENTITY_NAME = "payment";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("paymentProviders");

  return (
    <div>
      <h1>Payments System</h1>

      <div>
        <button onClick={() => setActiveTab("paymentProviders")}>Payment Providers</button>
        <button onClick={() => setActiveTab("paymentTerminals")}>Payment Terminals</button>
        <button onClick={() => setActiveTab("payments")}>Payments</button>
      </div>

      <div>
        {activeTab === "paymentProviders" && <PaymentProviders />}
        {activeTab === "paymentTerminals" && <PaymentTerminals />}
        {activeTab === "payments" && <Payments />}
      </div>
    </div>
  );
}
