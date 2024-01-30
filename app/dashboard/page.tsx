'use client';

import ECommerce from "@/components/Dashboard/E-commerce";
import { useUser } from "@/modules/users/domain/user";
import { getCurrentUser } from "@/modules/users/domain/users.actions";
import { authentication, createDirectus } from "@directus/sdk";
import { Metadata } from "next";
import { useEffect } from "react";
import useSWR from "swr";

//export const metadata: Metadata = {
//  title: "TailAdmin | Next.js E-commerce Dashboard Template",
//  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
//};

export default function Home() {

  return (
    <>
      <ECommerce />
    </>
  );
}
