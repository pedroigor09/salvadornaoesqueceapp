import { Navigation } from "@/components/navigation";
import { MemorialContent } from "@/components/memorial-content";

export default function Memorial() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <MemorialContent />
      </main>
    </div>
  );
}