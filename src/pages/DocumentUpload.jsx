import React, { useState, useRef, useEffect } from "react";
import Lottie from "react-lottie-player";
import Webcam from "react-webcam";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as faceapi from "face-api.js";

import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import { ChevronRight } from "@mui/icons-material";

import ocrIDFront from "../assets/ocr_id_front.json";
import ocrPassportFront from "../assets/ocr_passport.json";

// IMPORTANT: do not remove this line as requested
import { useMeQuery } from "../features/api/usersApiSlice";
import toast from "react-hot-toast";

const PassportLottie = () => (
  <Lottie
    loop
    animationData={ocrPassportFront}
    play
    style={{ width: "250px", height: "250px", background: "transparent" }}
  />
);

const LottieAnimation = () => (
  <Lottie
    loop
    animationData={ocrIDFront}
    play
    style={{ width: "250px", height: "250px", background: "transparent" }}
  />
);

const DocumentUpload = ({ idType, onNext }) => {
  // ----------------------------------------------------------------------
  // 1) Fetch user data (KYC) from server
  // ----------------------------------------------------------------------
  const { data: me } = useMeQuery();
  // const lastKycType = me?.kycs?.[me.kycs.length - 1]?.idType?.toLowerCase() || "";

  // ----------------------------------------------------------------------
  // 2) State for capturing front/back
  // ----------------------------------------------------------------------
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [uploadingBack, setUploadingBack] = useState(false);

  const [isFrontConfirmed, setIsFrontConfirmed] = useState(false);
  const [isBackConfirmed, setIsBackConfirmed] = useState(false);

  // Face detection
  const [isScanning, setIsScanning] = useState(false);

  // Camera flip
  const [facingMode, setFacingMode] = useState("user");

  // MUI media query
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [lastKycType, setLastKycType] = useState("");
  useEffect(() => {
    if (me && me.kycs && me.kycs.length > 0) {
      setLastKycType(me.kycs[me.kycs.length - 1].idType.toLowerCase());
    }
  }, [me]);

  // Refs
  const webcamRef = useRef(null);
  const cropperRef = useRef(null);

  // ----------------------------------------------------------------------
  // 3) Load Face-API
  // ----------------------------------------------------------------------
  useEffect(() => {
    async function loadFaceApi() {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        console.log("FaceAPI model loaded");
      } catch (err) {
        console.error("Error loading FaceAPI model", err);
      }
    }
    loadFaceApi();
  }, []);

  // ----------------------------------------------------------------------
  // 4) Face Detection
  // ----------------------------------------------------------------------
  const detectFaceInImage = async (imageDataUrl) => {
    try {
      setIsScanning(true);
      const img = await faceapi.fetchImage(imageDataUrl);
      const detections = await faceapi.detectAllFaces(
        img,
        new faceapi.TinyFaceDetectorOptions()
      );
      setIsScanning(false);
      return detections;
    } catch (err) {
      console.error("Face detection error:", err);
      setIsScanning(false);
      return [];
    }
  };

  // ----------------------------------------------------------------------
  // 5) Handlers: Capture, Toggle Camera
  // ----------------------------------------------------------------------
  const handleCapture = () => {
    const capturedImage = webcamRef.current?.getScreenshot();
    if (capturedImage) {
      setImageSrc(capturedImage);
      setIsCaptureMode(false);
      setShowCropper(true);
    } else {
      console.error("Failed to capture image. Webcam might not be active.");
    }
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // ----------------------------------------------------------------------
  // 6) Handler: Upload from File
  // ----------------------------------------------------------------------
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // ----------------------------------------------------------------------
  // 7) Cropping
  // ----------------------------------------------------------------------
  const handleCropComplete = () => {
    const cropperInstance = cropperRef.current?.cropper;
    if (cropperInstance) {
      const croppedCanvas = cropperInstance.getCroppedCanvas({
        width: 800,
        height: 800,
      });
      const croppedDataUrl = croppedCanvas.toDataURL("image/jpeg", 1.0);
      setCroppedImage(croppedDataUrl);
      setShowCropper(false);
    }
  };

  // ----------------------------------------------------------------------
  // 8) Retake
  // ----------------------------------------------------------------------
  const handleRetake = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setIsCaptureMode(false);
    setShowCropper(false);
  };

  // ----------------------------------------------------------------------
  // 9) Confirm Image (Front or Back)
  // ----------------------------------------------------------------------
  const handleConfirmImage = async () => {
    // (A) If confirming the FRONT image
    if (!uploadingBack) {
      // 1) Face detection on the front
      const detections = await detectFaceInImage(croppedImage);
      if (detections.length === 0) {
        toast.error("No face detected in the front image. Please retake or adjust.");
        return;
      }
      setFrontImage(croppedImage);
      setIsFrontConfirmed(true);

      // 2) If the KYC type requires a back side, set uploadingBack = true
      if (lastKycType === "aadhaar-card" || lastKycType === "voter-id") {
        setUploadingBack(true);
      }
    }
    // (B) Confirming the BACK image
    else {
      setBackImage(croppedImage);
      setIsBackConfirmed(true);
    }

    // Clean up
    setImageSrc(null);
    setCroppedImage(null);
    setShowCropper(false);
  };

  // ----------------------------------------------------------------------
  // 10) Next Button (Finish)
  // ----------------------------------------------------------------------
  const handleNext = () => {
    onNext({ front: frontImage, back: backImage });
  };

  // ----------------------------------------------------------------------
  // 11) Render Logic Helpers
  // ----------------------------------------------------------------------
  const renderAnimation = () => {
    return idType === "passport" ? <PassportLottie /> : <LottieAnimation />;
  };

  // Instruction text for each doc type
  const getInstructionText = () => {
    switch (lastKycType) {
      case "aadhaar-card":
      case "voter-id":
        return `Please upload both the front and back of your ${lastKycType.replace("-", " ")}.`;
      case "dl":
        return "Please upload the front of your Driving License.";
      case "passport":
        return "Please ensure the passport info page is clear.";
      case "pan":
        return "Please ensure your PAN card is clear.";
      default:
        return "Please ensure the document is clearly visible.";
    }
  };

  // Helper: Are we done?
  // True if front is confirmed, and if user needs a back side, the back is also confirmed
  const isDocCaptureComplete =
    isFrontConfirmed &&
    ((lastKycType === "aadhaar-card" || lastKycType === "voter-id")
      ? isBackConfirmed
      : true);

  // ----------------------------------------------------------------------
  // 12) Final JSX
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Paper className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-4">

        {/* 
          Only show the heading & instructions if NOT fully complete 
        */}
        {!isDocCaptureComplete && (
          <>
            <Typography
              variant="h5"
              className="text-center font-semibold mb-6 text-gray-800"
            >
              Document Upload
            </Typography>

            <Box className="mb-4 text-center">
              <Typography variant="body1" color="textSecondary">
                {getInstructionText()}
              </Typography>
            </Box>
          </>
        )}

        {/* Loader while face detection is running */}
        {isScanning && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 500,
              height: 320,
              mb: 3,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              background: "linear-gradient(135deg, #1e3c72, #2a5298)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={60} sx={{ color: "#fff" }} />
              <Typography
                variant="h6"
                sx={{ color: "#fff", mt: 2, fontWeight: "bold" }}
              >
                Please wait...
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", opacity: 0.8 }}
              >
                Detecting face in document
              </Typography>
            </Box>
          </Box>
        )}

        {/* 1) Show Lottie animation if we haven't started capturing front
              and the doc capture isn't complete */}
        {!imageSrc &&
          !isCaptureMode &&
          !isFrontConfirmed &&
          !uploadingBack &&
          !isScanning &&
          !isDocCaptureComplete && (
            <Box className="flex justify-center mb-6">{renderAnimation()}</Box>
          )}

        {/* 2) Show Webcam if capturing */}
        {isCaptureMode && !imageSrc && !isScanning && (
          <div className="relative w-full max-w-md mx-auto">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg shadow-lg"
              videoConstraints={{
                facingMode,
                width: 1280,
                height: 720,
              }}
            />
            <Box className="flex justify-center space-x-4 mt-4">
              <IconButton
                color="success"
                onClick={handleCapture}
                style={{ backgroundColor: "rgba(0,128,0,0.2)" }}
              >
                <CheckCircleIcon style={{ fontSize: "40px", color: "green" }} />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setIsCaptureMode(false)}
                style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
              >
                <CancelIcon style={{ fontSize: "40px", color: "red" }} />
              </IconButton>
              {isSmallScreen && (
                <IconButton
                  onClick={toggleCamera}
                  style={{ backgroundColor: "rgba(0,0,255,0.2)" }}
                >
                  <FlipCameraIosIcon
                    style={{ fontSize: "40px", color: "blue" }}
                  />
                </IconButton>
              )}
            </Box>
          </div>
        )}

        {/* 3) Show 'Upload' or 'Capture' if not capturing 
              and front is not confirmed yet */}
        {!isCaptureMode &&
          !imageSrc &&
          !showCropper &&
          !isFrontConfirmed &&
          !isScanning &&
          !uploadingBack &&
          !isDocCaptureComplete && (
            <Box className="flex justify-center space-x-4 mb-6">
              {isSmallScreen ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  component="label"
                  style={{ borderRadius: "20px", padding: "10px 20px" }}
                >
                  Take
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleUpload}
                  />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    component="label"
                    style={{ borderRadius: "20px", padding: "10px 20px" }}
                  >
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleUpload}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "20px", padding: "10px 20px" }}
                    onClick={() => setIsCaptureMode(true)}
                  >
                    Take
                  </Button>
                </>
              )}
            </Box>
          )}

        {/* 4) Show Cropper if we have an image */}
        {showCropper && imageSrc && !isScanning && (
          <div>
            <Cropper
              src={imageSrc}
              style={{ height: "400px", width: "100%" }}
              autoCropArea={1}
              guides={false}
              ref={cropperRef}
              viewMode={2}
              dragMode="move"
            />
            <Box className="flex justify-center space-x-4 mt-4">
              <Button variant="contained" color="primary" onClick={handleCropComplete}>
                Confirm Crop
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleRetake}>
                Retake
              </Button>
            </Box>
          </div>
        )}

        {/* 5) Show Cropped Preview (front or back) */}
        {croppedImage && !isScanning && (
          <div className="flex flex-col items-center mt-6">
            <img
              src={croppedImage}
              alt="Cropped Preview"
              className="rounded-lg shadow-lg mb-4 w-full max-w-xs"
            />
            <Typography variant="body2" color="textSecondary">
              {uploadingBack ? "Back side preview" : "Front side preview"}
            </Typography>
            <Box className="flex space-x-4 mt-4">
              <IconButton
                color="success"
                onClick={handleConfirmImage}
                style={{ backgroundColor: "rgba(0,128,0,0.2)" }}
              >
                <CheckCircleIcon style={{ fontSize: "30px", color: "green" }} />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleRetake}
                style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
              >
                <CancelIcon style={{ fontSize: "30px", color: "red" }} />
              </IconButton>
            </Box>
          </div>
        )}

        {/* 6) If front is confirmed & user needs back => prompt to upload/capture back */}
        {isFrontConfirmed &&
          uploadingBack &&
          !isBackConfirmed &&
          !imageSrc &&
          !showCropper &&
          !isDocCaptureComplete && (
            <>
              <Box className="mb-4 text-center">
                <Typography variant="body1" color="textSecondary">
                  Now capture/upload the <strong>Back side</strong>.
                </Typography>
              </Box>

              <Box className="flex justify-center space-x-4 mb-6">
                {isSmallScreen ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    component="label"
                    style={{ borderRadius: "20px", padding: "10px 20px" }}
                  >
                    Take
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleUpload}
                    />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      component="label"
                      style={{ borderRadius: "20px", padding: "10px 20px" }}
                    >
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleUpload}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "20px", padding: "10px 20px" }}
                      onClick={() => setIsCaptureMode(true)}
                    >
                      Take
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}

        {/* 7) Show a small success message (optional) if all uploads are complete */}
        {isDocCaptureComplete && (
          <Box className="text-center mb-4 mt-4">
            <Typography variant="body1" color="green">
              Document images captured successfully!
            </Typography>
          </Box>
        )}

        {/* 8) Show Next Button if capture is complete */}
        {isDocCaptureComplete && (
          <div className="flex justify-center pt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className="px-6 py-2 text-white rounded-md hover:bg-blue-600 transition"
              endIcon={<ChevronRight />}
            >
              Next
            </Button>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default DocumentUpload;
