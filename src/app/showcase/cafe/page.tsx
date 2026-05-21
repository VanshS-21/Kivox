"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useCafe } from "./context";
import CafeHomePage from "./home-view";
import CafeMenuPage from "./menu/view";
import CafeShopPage from "./shop/view";
import CafeCheckoutPage from "./checkout/view";
import OrderSuccessPage from "./order-success/view";
import CafeProductDetailPage from "./product/view";

export default function CafeSPA() {
  const { view } = useCafe();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[80vh] bg-[oklch(0.978_0.008_85)]" />;
  }

  switch (view) {
    case "menu":
      return <CafeMenuPage />;
    case "shop":
      return <CafeShopPage />;
    case "checkout":
      return <CafeCheckoutPage />;
    case "order-success":
      return <OrderSuccessPage />;
    case "product-detail":
      return <CafeProductDetailPage />;
    case "home":
    default:
      return <CafeHomePage />;
  }
}
