import { HealthCheckBanner } from "@/components/health/healthcheck";
import { User } from "@/lib/types";
import {
  getCurrentUserSS,
  getAuthTypeMetadataSS,
  AuthTypeMetadata,
} from "@/lib/userSS";
import { redirect } from "next/navigation";
import Image from "next/image";
import { EmailPasswordForm } from "../login/EmailPasswordForm";
import { Card, Title, Text } from "@tremor/react";
import Link from "next/link";

const Page = async () => {
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

  // simply take the user to the home page if Auth is disabled
  if (authTypeMetadata?.authType === "disabled") {
    return redirect("/");
  }

  // if user is already logged in, take them to the main app page
  if (currentUser && currentUser.is_active) {
    if (!authTypeMetadata?.requiresVerification || currentUser.is_verified) {
      return redirect("/");
    }
    return redirect("/auth/waiting-on-verification");
  }

  // only enable this page if basic login is enabled
  if (authTypeMetadata?.authType !== "basic") {
    return redirect("/");
  }

  return (
    <main>
      <div className="absolute top-10x w-full">
        <HealthCheckBanner />
      </div>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="h-16 w-16 mx-auto text-inverted">
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
          <Card className="mt-4 w-96">
            <div className="flex">
              <Title className="mb-2 mx-auto font-bold">
                Sign Up for Danswer
              </Title>
            </div>
            <EmailPasswordForm
              isSignup
              shouldVerify={authTypeMetadata?.requiresVerification}
            />

            <div className="flex">
              <Text className="mt-4 mx-auto">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-link font-medium">
                  Log In
                </Link>
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Page;
