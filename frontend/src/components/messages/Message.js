
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetMessage } from "./store/actions";
import Slide from "@material-ui/core/Slide";


export default function LongTextSnackbar() {
  const dispatch = useDispatch();
  const messageReducer = useSelector(({ message }) => message);
  const [open, setopen] = useState(false);
  const [message, setmessage] = useState("");
  useEffect(() => {
    if (messageReducer.show) {
      setmessage(messageReducer.message);
      dispatch(resetMessage());
      setopen(true);
    }
  }, [messageReducer, dispatch]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      message={message}
      autoHideDuration={5000}
      onClose={() => {
        setopen(false);
      }}
      open={open}
      TransitionComponent={Slide}
    ></Snackbar>
  );
}
