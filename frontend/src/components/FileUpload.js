import { Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showMessage } from "./messages/store/actions";

const FileUploader = ({ handleFileInput, value }) => {
  const [imageURI, setimageURI] = useState();
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    
    if (!(file.type === "image/png" || file.type === "image/jpeg")) {
      return dispatch(showMessage("Invalid file"));
    }
    //16mb max
    if (file.size>15728640) {
        return dispatch(showMessage("File too big"));
      }
    let reader = new FileReader();
    reader.onload = (ev) => {
      setimageURI(ev.target.result);
      handleFileInput(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Button variant="outlined" component="label">
      {imageURI ? null : "Select image"}
      <input hidden type="file" onChange={handleInput} />
      <img src={imageURI} alt="" />
    </Button>
  );
};

export default FileUploader;
