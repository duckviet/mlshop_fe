// app/dashboard/page.tsx

"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <button
        className="btn btn-ghost"
        onClick={(e) => router.push("/CustomerLogin")}
      >
        Open modal
      </button>
      <Button onClick={handleClick} variant="destructive">
        Click Me
      </Button>
      <p className="font-bold text-xl">Dashboard</p>
    </div>
  );
};

export default Dashboard;
