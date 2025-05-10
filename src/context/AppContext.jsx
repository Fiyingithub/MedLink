// /* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";
import { showNotification } from "../utilities/Notification/Noty";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const ContextProvider = (props) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayColor, setOverlayColor] = useState("");

  const showOverlay = (color = "flushOrange-600") => {
    setOverlayColor(color);
    setIsOverlayVisible(true);
  };
  const hideOverlay = () => setIsOverlayVisible(false);

  function formatNumberWithCommas(number) {
    // console.log(typeof number)
    number = Number(number);
    var res = number.toLocaleString(undefined, { maximumFractionDigits: 0 });
    // console.log("resulting number",res);
    return res;
  }

  const contextValue = {
    showNotification,
    isOverlayVisible,
    overlayColor,
    showOverlay,
    hideOverlay,
    formatNumberWithCommas,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
