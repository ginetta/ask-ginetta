import {
  AuthTypeMetadata,
  getAuthTypeMetadataSS,
  getCurrentUserSS,
} from "@/lib/userSS";
import { redirect } from "next/navigation";
import Image from "next/image";
import { HealthCheckBanner } from "@/components/health/healthcheck";
import { User } from "@/lib/types";
import { Text } from "@tremor/react";
import { RequestNewVerificationEmail } from "./RequestNewVerificationEmail";

export default async function Page() {
  // catch cases where the backend is completely unreachable here
  // without try / catch, will just raise an exception and the page
  // will not render
  let authTypeMetadata: AuthTypeMetadata | null = null;
  let currentUser: User | null = null;
  try {
    [authTypeMetadata, currentUser] = await Promise.all([
      getAuthTypeMetadataSS(),
      getCurrentUserSS(),
    ]);
  } catch (e) {
    console.log(`Some fetch failed for the login page - ${e}`);
  }

  if (!currentUser) {
    if (authTypeMetadata?.authType === "disabled") {
      return redirect("/");
    }
    return redirect("/auth/login");
  }

  if (!authTypeMetadata?.requiresVerification || currentUser.is_verified) {
    return redirect("/");
  }

  return (
    <main>
      <div className="absolute top-10x w-full">
        <HealthCheckBanner />
      </div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="h-16 w-16 mx-auto text-inverted-dark dark:text-inverted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              width="100%"
            >
              <path
                d="M200 216.2c-35.9 0-65-29.1-65-65s29.1-65 65-65 65 29.1 65 65-29.1 65-65 65m0 97.6c-35.9 0-65-29.1-65-65h130c0 35.8-29.1 65-65 65"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="flex">
            <Text className="text-center font-medium text-lg mt-6 w-108">
              Hey <i>{currentUser.email}</i> - it looks like you haven&apos;t
              verified your email yet.
              <br />
              Check your inbox for an email from us to get started!
              <br />
              <br />
              If you don&apos;t see anything, click{" "}
              <RequestNewVerificationEmail email={currentUser.email}>
                here
              </RequestNewVerificationEmail>{" "}
              to request a new email.
            </Text>
          </div>
        </div>
      </div>
    </main>
  );
}
