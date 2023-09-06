import "../../scss/styles.scss";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ItemList from "../../components/ItemList/ItemList";

export default function ItemListPage() {
  const [drop, setDrop] = useState(false);

  const handleHover = () => {
    setDrop(!drop);
  };

  return (
    <div className="App">
      {/* <div className="navBar">
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
        <div className="navBarBottom">
          <div>&lt;</div>
          <div>KITCHEN</div>
          <div>BATHROOM</div>
          <div>APPLIANCES</div>
          <div>HARDWARE</div>
          <div>&gt;</div>
        </div>
      </div> */}
      <NavBar />
      <div className="itemList">
        <ItemList />
      </div>
    </div>
  );
}