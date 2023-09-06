import "./NavBar.module.scss";
import { useState } from "react";
import DepListNavBar from "../DepListNavBar/DepListNavBar";
import Hamburger from "../Hamburger/Hamburger";
import HamMenu from "../HamMenu/HamMenu";

export default function NavBar() {
  const [drop, setDrop] = useState(false);

  const handleHover = () => {
    setDrop(!drop);
  };

  return (
    <>
      <div className="navBar">
        <div className="navBarTop">
          <div>LOGO</div>
          <div>SEARCH</div>
          <div>CART</div>
          <div
            className="hamContainer"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          >
            <div className="hamburger">
              <Hamburger />
            </div>
            {drop && <HamMenu />}
          </div>
        </div>
        {/* <div className="navBarBottom">
          <div>&lt;</div>
          <div>KITCHEN</div>
          <div>BATHROOM</div>
          <div>APPLIANCES</div>
          <div>HARDWARE</div>
          <div>&gt;</div>
        </div> */}
        <DepListNavBar />
      </div>
    </>
  );
}