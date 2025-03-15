"use client";

import MenuOverlay from "./MenuOverlay/MenuOverlay";
import NavBar from "./NavBar/NavBar";

import { AnimatePresence } from "framer-motion";
import { NavigationProvider, useNavigation } from "./state/context";

function Navigation() {
  return (
    <NavigationProvider>
      <NavigationContent />
    </NavigationProvider>
  );
}

function NavigationContent() {
  const {
    state: { isMenuOpen },
  } = useNavigation();

  return (
    <>
      <NavBar />
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            key={"menu"}
          />
        )}
      </AnimatePresence>
    </>
  );
}
export default Navigation;
