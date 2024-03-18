import React from 'react';

function LoadingSkeleton() {
  const sidebarItems = Array.from({ length: 12 }, (_, index) => (
    <div key={index} className="h-8 bg-slate-200 rounded"></div>
  ));

  const mainContentItems = Array.from({ length: 13 }, (_, index) => (
    <div key={index} className={`h-10 bg-slate-200 rounded ${index % 2 === 0 ? 'col-span-2' : 'col-span-1'}`}></div>
  ));

  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <div className="w-1/4 border-r border-blue-300 shadow p-10">
        <div className="animate-pulse space-y-4">
          {sidebarItems}
        </div>
      </div>
      {/* Main Content Skeleton */}
      <div className="flex-1 p-4">
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm min-w-full h-full">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-10 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  {mainContentItems}
                </div>
                <div className="h-10 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
