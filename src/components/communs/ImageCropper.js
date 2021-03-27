import React, { useState, useEffect, useContext } from "react";
import Cropper from "react-easy-crop";
import { Form, Button } from "react-bootstrap";
import { getCroppedImgWithResize } from "../../base/utils/cropImage";
import * as FiIcons from "react-icons/fi";
// import { GlobalContext } from "../../providers/global";

export default (props) => {
  const [image, setImage] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // const { setGlobal } = useContext(GlobalContext);

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      // setGlobal({ isLoading: true });
      const croppedImage = await getCroppedImgWithResize(
        image,
        croppedAreaPixels
      );
      console.log("donee", { croppedImage });
      //setCroppedImage(croppedImage);
      props.onCroppedImage(croppedImage);
      // setGlobal({ isLoading: false });
    } catch (e) {
      console.error(e);
    }
  };

  const onZoomChange = (z) => {
    console.log(z);

    setZoom(z);
  };

  return (
    <div>
      <div style={{ height: "500px" }}>
        <Cropper
          style={{ height: "450px" }}
          image={image}
          crop={crop}
          cropSize={{ width: 400, height: 400 }}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 4}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "-30px",
        }}
      >
        <Button onClick={showCroppedImage}>
          <FiIcons.FiCopy style={{ fontSize: "16px", marginRight: "5px" }} />
          Salvar
        </Button>
      </div>
    </div>
  );
};
