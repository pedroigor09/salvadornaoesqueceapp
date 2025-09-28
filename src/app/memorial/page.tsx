import { ModernSidebar } from "@/components/modern-sidebar";
import { MemorialContent } from "@/components/memorial-content";

export default function Memorial() {
  return (
    <ModernSidebar>
      <div className="h-full">
        <MemorialContent />
      </div>
    </ModernSidebar>
  );
}