import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  // Authorize and load dashboard data here
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in");
  }

  // If Account is not authorized, redirect to login page
  // If account is authorized, render dashboard page

  return <div>DashboardPage</div>;
};

export default DashboardPage;
