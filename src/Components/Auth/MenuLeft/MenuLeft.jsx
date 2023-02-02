import React, { useEffect, useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { isUserAdmin } from "../../../Utils/Api";
import "./MenuLeft.scss";

function MenuLeft(props) {
  const { user, location } = props;
  const [activeMenu, setActiveMenu] = useState("home");
  const [userAdmin, setUserAdmin] = useState(false);

  console.log(userAdmin);

  useEffect(() => {
    isUserAdmin(user.uid).then((response) => {
      setUserAdmin(response);
    });
  }, [user]);

  const handlerMenu = (e, menu) => {
    console.log(menu);
    setActiveMenu(menu.name);
  };

  return (
    <Menu className="menu-left" vertical>
      <div className="top">
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeMenu === "home"}
          onClick={handlerMenu}
        >
          <Icon name="home" /> perfil
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/artist"
          name="artists"
          active={activeMenu === "artists"}
          onClick={handlerMenu}
        >
          <Icon name="music" /> asd
        </Menu.Item>
      </div>
      {userAdmin && (
        <div className="footer">
          <Menu.Item>
            <Icon name="plus square outline" /> Settings
          </Menu.Item>
          <Menu.Item>
            <Icon name="plus square outline" /> Cerrar Sesion
          </Menu.Item>
        </div>
      )}
    </Menu>
  );
}

export default MenuLeft;
