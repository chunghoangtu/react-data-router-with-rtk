/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Outlet } from "react-router";

import { Navigation } from "@shared/components/Navigation";

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <>
    <Navigation />
    <main className="p-4"><Outlet /></main>
  </>
};
