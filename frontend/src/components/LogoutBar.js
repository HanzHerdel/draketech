import { AppBar, IconButton, Toolbar } from "@material-ui/core";

import Log from "@material-ui/icons/ExitToAppRounded";
import { useDispatch } from "react-redux";
import { logout } from "../authModule/store/actions";

const LogoutBar = () => {
  const dispatch =useDispatch()
  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton style={{position: 'absolute', right: 24}}  color="inherit" aria-label="logout" onClick={handleLogout}>
          <Log />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default LogoutBar
