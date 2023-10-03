"use client";

import { useEffect, useState } from "react";
import { isBrowser, isTablet } from "react-device-detect";
import Web from "./tetris/Web";
import Tablet from "./tetris/Tablet";
import Mobile from "./tetris/Mobile";
import { useVhState } from "@/utils/hook";

export default function TetrisLayout() {
  const [] = useVhState();
  const [deviceDetect, setDeviceDetect] = useState({
    loading: false,
    browser: false,
    tablet: false,
  });

  useEffect(() => {
    setDeviceDetect({ loading: true, browser: isBrowser, tablet: isTablet });
  }, []);

  return deviceDetect.loading ? (
    deviceDetect.browser ? (
      <Web />
    ) : deviceDetect.tablet ? (
      <Tablet />
    ) : (
      <Mobile />
    )
  ) : (
    <div></div>
  );
}
