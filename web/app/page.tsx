import { Highlight } from "@/components/highlight";
import { TextAnimate } from "@/components/magicui/text-animate";
import UsersList from "@/components/user-list";
import { getUsers } from "@/lib/api/api";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export default async function HomePage() {
  // Get all users from the API
  const users = await getUsers().catch(() => null);

  // Get the current logged-in user from Supabase
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const currentUser = userData?.user;

  // Simple admin check - just check if the email is admin@upbeat.com
  const isAdmin = currentUser?.email === "admin@upbeat.com";

  // Filter users based on role
  // If admin, show all users; if not, only show the current user
  const filteredUsers =
    users && currentUser
      ? isAdmin
        ? users
        : users.filter((user) => user === currentUser.email)
      : users;

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="mb-4">
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            duration={0.4}
            className="text-5xl font-bold text-cyan-500 dark:text-blue-500"
          >
            UPBEAT
          </TextAnimate>
          <br />
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            duration={0.5}
            delay={0.2}
            className="text-4xl font-bold"
          >
            Learning Assistant
          </TextAnimate>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Personal learning plans and{" "}
          <Highlight className="text-black dark:text-white">
            AI-powered
          </Highlight>{" "}
          assistance for your entrepreneurship journey
        </p>

        {isAdmin && (
          <div className="mt-4 inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
            Admin Access
          </div>
        )}
      </div>

      <Suspense
        fallback={
          <div className="text-center py-8">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <div className="mt-3">Fetching User list</div>
          </div>
        }
      >
        <div className="max-w-4xl mx-auto">
          {filteredUsers ? (
            <UsersList initialUsers={filteredUsers} />
          ) : (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center">
              <p className="font-medium">Unable to fetch user data</p>
              <p className="text-sm mt-1">
                Please ensure the backend FastAPI backend server is running.
              </p>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}
