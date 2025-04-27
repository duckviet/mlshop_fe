// templates/DashboardTemplate.tsx
import React, { ReactNode } from "react";
import Link from "next/link";

interface DashboardTemplateProps {
  children: ReactNode;
  title: string;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  children,
  title,
}) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{title}</h1>
        <nav>
          <ul className="flex gap-4 flex-col">
            <li>
              <Link href="/dashboard/flight">Flight Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/ticket">Ticket Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/booking">Booking Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardTemplate;
