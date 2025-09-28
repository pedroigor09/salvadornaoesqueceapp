import { Navigation } from "@/components/navigation";
import { DashboardContent } from "@/components/dashboard-content";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <DashboardContent />
      </main>
    </div>
  );
}
