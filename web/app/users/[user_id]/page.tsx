import { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { getCurrentPhase, getUserData } from "@/lib/api/api";
import UserDashboard from "./user-dashboard";

// Loading component
function PlanSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />

        <div className="flex gap-2 mb-6">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}

// Making sure params are properly handled
export default async function UserPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id: encodedUserId } = await params;
  const user_id = decodeURIComponent(encodedUserId);

  // Fetch data in parallel on the server
  const currentPhasePromise = getCurrentPhase();
  const userDataPromise = getUserData(user_id);

  // Wait for the required data
  const [currentPhase, userData] = await Promise.all([
    currentPhasePromise,
    userDataPromise,
  ]);

  // Pass data to client components
  return (
    <Suspense fallback={<PlanSkeleton />}>
      <UserDashboard
        userData={userData}
        currentPhase={currentPhase}
        userId={user_id}
      />
    </Suspense>
  );
}
