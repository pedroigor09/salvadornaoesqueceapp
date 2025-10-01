"use client";

import { AlertTriangle } from "lucide-react";

interface LoadingSkeletonProps {}

export function LoadingSkeleton({}: LoadingSkeletonProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Skeleton loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-4 md:p-6 border border-gray-800 animate-pulse">
            <div className="h-10 md:h-12 bg-gray-800 rounded-lg mb-3 md:mb-4" />
            <div className="h-3 md:h-4 bg-gray-800 rounded mb-2" />
            <div className="h-6 md:h-8 bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="bg-gray-900 rounded-xl p-6 border border-red-800 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-400 font-medium">Erro ao carregar dados</p>
        <p className="text-gray-400 text-sm mt-2">{error}</p>
      </div>
    </div>
  );
}