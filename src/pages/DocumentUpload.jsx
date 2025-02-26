// import React, { useState, useRef, useEffect } from "react";
// import Lottie from "react-lottie-player";
// import Webcam from "react-webcam";
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
// import ocrIDFront from "../assets/ocr_id_front.json";
// import ocrPassportFront from "../assets/ocr_passport.json";
// import { ChevronRight } from "@mui/icons-material";
// import { useParams } from "react-router-dom";

// const PassportLottie = () => (
//   <Lottie
//     loop
//     animationData={ocrPassportFront}
//     play
//     style={{ width: "250px", height: "250px", background: "transparent" }}
//   />
// );

// const LottieAnimation = () => (
//   <Lottie
//     loop
//     animationData={ocrIDFront}
//     play
//     style={{ width: "250px", height: "250px", background: "transparent" }}
//   />
// );

// const DocumentUpload = ({ idType, onNext }) => {
//   const [isCaptureMode, setIsCaptureMode] = useState(false);
//   const [showCropper, setShowCropper] = useState(false);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [isImageConfirmed, setIsImageConfirmed] = useState(false);
//   const [facingMode, setFacingMode] = useState("user");
//   // State to hold the detected crop box dimensions
//   const [detectedCropBox, setDetectedCropBox] = useState(null);

//   const isSmallScreen = useMediaQuery("(max-width:600px)");
//   const webcamRef = useRef(null);
//   const cropperRef = useRef(null);
//   const { id } = useParams();
//   console.log(id);

//   const renderAnimation = () =>
//     idType === "passport" ? <PassportLottie /> : <LottieAnimation />;

//   const getInstructionText = () => {
//     switch (idType) {
//       case "adhaar":
//         return "AADHAAR CARD: Please ensure the document is clearly visible without any glare or shadows.";
//       case "passport":
//         return "PASSPORT: Ensure the document is clear and cropped to show only the info page.";
//       case "pan":
//         return "PAN CARD: Ensure visibility without glare or shadows.";
//       default:
//         return "Please ensure the document is clearly visible.";
//     }
//   };

//   // ─── Enhanced Detect Crop Box Using OpenCV ──────────────────────────────
//   // This function now applies dilation/erosion to the Canny output and searches
//   // for the largest quadrilateral. If found, its bounding rectangle is returned.
//   const detectCropBox = (srcImage) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = srcImage;
//       img.onload = () => {
//         // Create a temporary canvas to draw the loaded image
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);

//         try {
//           const cv = window.cv;
//           let src = cv.imread(canvas);
//           let gray = new cv.Mat();
//           cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

//           // Blur to reduce noise
//           let blurred = new cv.Mat();
//           cv.GaussianBlur(
//             gray,
//             blurred,
//             new cv.Size(5, 5),
//             0,
//             0,
//             cv.BORDER_DEFAULT
//           );

//           // Canny edge detection
//           let edged = new cv.Mat();
//           cv.Canny(blurred, edged, 75, 200);

//           // Dilation and erosion to close gaps in edges
//           let kernel = cv.getStructuringElement(
//             cv.MORPH_RECT,
//             new cv.Size(5, 5)
//           );
//           cv.dilate(edged, edged, kernel);
//           cv.erode(edged, edged, kernel);
//           kernel.delete();

//           // Find contours
//           let contours = new cv.MatVector();
//           let hierarchy = new cv.Mat();
//           cv.findContours(
//             edged,
//             contours,
//             hierarchy,
//             cv.RETR_LIST,
//             cv.CHAIN_APPROX_SIMPLE
//           );

//           // Look for the largest quadrilateral
//           let maxQuadArea = 0;
//           let quadContour = null;
//           for (let i = 0; i < contours.size(); i++) {
//             let cnt = contours.get(i);
//             let peri = cv.arcLength(cnt, true);
//             let approx = new cv.Mat();
//             cv.approxPolyDP(cnt, approx, 0.02 * peri, true);
//             if (approx.rows === 4) {
//               let area = cv.contourArea(approx);
//               if (area > maxQuadArea) {
//                 maxQuadArea = area;
//                 if (quadContour) quadContour.delete();
//                 quadContour = approx.clone();
//               }
//             }
//             approx.delete();
//           }

//           let rect;
//           if (quadContour) {
//             rect = cv.boundingRect(quadContour);
//             quadContour.delete();
//           } else {
//             // Fallback: use the bounding rectangle of the largest contour
//             let maxArea = 0;
//             let maxContour = null;
//             for (let i = 0; i < contours.size(); i++) {
//               let cnt = contours.get(i);
//               let area = cv.contourArea(cnt);
//               if (area > maxArea) {
//                 maxArea = area;
//                 maxContour = cnt;
//               }
//             }
//             if (maxContour) {
//               rect = cv.boundingRect(maxContour);
//             } else {
//               rect = { x: 0, y: 0, width: canvas.width, height: canvas.height };
//             }
//           }

//           // Clean up allocated memory
//           src.delete();
//           gray.delete();
//           blurred.delete();
//           edged.delete();
//           contours.delete();
//           hierarchy.delete();

//           resolve(rect);
//         } catch (error) {
//           reject(error);
//         }
//       };
//       img.onerror = (err) => {
//         reject(err);
//       };
//     });
//   };
//   // ─────────────────────────────────────────────────────────────────────

//   // When imageSrc changes, automatically detect the document region
//   useEffect(() => {
//     if (imageSrc) {
//       detectCropBox(imageSrc)
//         .then((rect) => {
//           setDetectedCropBox(rect);
//         })
//         .catch((err) => {
//           console.error("Crop box detection failed:", err);
//           setDetectedCropBox(null);
//         });
//     }
//   }, [imageSrc]);

//   // Capture from webcam (letting the user adjust the crop)
//   const handleCapture = () => {
//     const capturedImage = webcamRef.current?.getScreenshot();
//     if (capturedImage) {
//       console.log("Captured Image:", capturedImage);
//       setImageSrc(capturedImage);
//       setIsCaptureMode(false);
//       setShowCropper(true);
//     } else {
//       console.error("Failed to capture image. Webcam might not be active.");
//     }
//   };

//   const handleUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImageSrc(reader.result);
//         setShowCropper(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCropComplete = () => {
//     const cropperInstance = cropperRef.current?.cropper;
//     if (cropperInstance) {
//       const croppedCanvas = cropperInstance.getCroppedCanvas({
//         width: 800, // Increase resolution for better quality
//         height: 800,
//       });
//       const croppedDataUrl = croppedCanvas.toDataURL("image/jpeg", 1.0);
//       console.log("Cropped Image:", croppedDataUrl);
//       setCroppedImage(croppedDataUrl);
//       setShowCropper(false);
//     } else {
//       console.error("Cropper instance not available");
//     }
//   };

//   const handleRetake = () => {
//     setImageSrc(null);
//     setCroppedImage(null);
//     setIsImageConfirmed(false);
//     setIsCaptureMode(false);
//     setShowCropper(false);
//     setDetectedCropBox(null);
//   };

//   const handleConfirmImage = () => {
//     setIsImageConfirmed(true);
//     setShowCropper(false);
//   };

//   const toggleCamera = () => {
//     setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <Paper className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 space-y-4">
//         <Typography
//           variant="h5"
//           className="text-center font-semibold mb-6 text-gray-800"
//         >
//           Document Upload
//         </Typography>

//         <Box className="mb-4 text-center">
//           <Typography variant="body1" color="textSecondary">
//             {getInstructionText()}
//           </Typography>
//         </Box>

//         {/* Show animation only when no image is loaded and not in capture mode */}
//         {!imageSrc && !isCaptureMode && (
//           <Box className="flex justify-center mb-6">{renderAnimation()}</Box>
//         )}

//         {/* Show webcam when capture mode is active and no image is available */}
//         {isCaptureMode && !imageSrc ? (
//           <div className="relative w-full max-w-md">
//             <Webcam
//               ref={webcamRef}
//               audio={false}
//               screenshotFormat="image/jpeg"
//               className="w-full rounded-lg shadow-lg"
//               videoConstraints={{
//                 facingMode,
//                 width: 1280,
//                 height: 720,
//               }}
//             />
//             <Box className="flex justify-center space-x-4 mt-4">
//               <IconButton
//                 color="success"
//                 onClick={handleCapture}
//                 style={{ backgroundColor: "rgba(0,128,0,0.2)" }}
//               >
//                 <CheckCircleIcon style={{ fontSize: "40px", color: "green" }} />
//               </IconButton>
//               <IconButton
//                 color="error"
//                 onClick={() => setIsCaptureMode(false)}
//                 style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
//               >
//                 <CancelIcon style={{ fontSize: "40px", color: "red" }} />
//               </IconButton>
//               {isSmallScreen && (
//                 <IconButton
//                   onClick={toggleCamera}
//                   style={{ backgroundColor: "rgba(0,0,255,0.2)" }}
//                 >
//                   <FlipCameraIosIcon
//                     style={{ fontSize: "40px", color: "blue" }}
//                   />
//                 </IconButton>
//               )}
//             </Box>
//           </div>
//         ) : (
//           <>
//             {/* Only show file input / capture buttons when no image is confirmed and cropper is not visible */}
//             {!isImageConfirmed && !showCropper && (
//               <Box className="flex justify-center space-x-4 mb-6">
//                 {isSmallScreen ? (
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     component="label"
//                     style={{ borderRadius: "20px", padding: "10px 20px" }}
//                   >
//                     Take
//                     <input
//                       type="file"
//                       accept="image/*"
//                       hidden
//                       onChange={handleUpload}
//                     />
//                   </Button>
//                 ) : (
//                   <>
//                     <Button
//                       variant="outlined"
//                       color="secondary"
//                       component="label"
//                       style={{ borderRadius: "20px", padding: "10px 20px" }}
//                     >
//                       Upload
//                       <input
//                         type="file"
//                         accept="image/*"
//                         hidden
//                         onChange={handleUpload}
//                       />
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       style={{ borderRadius: "20px", padding: "10px 20px" }}
//                       onClick={() => setIsCaptureMode(true)}
//                     >
//                       Take
//                     </Button>
//                   </>
//                 )}
//               </Box>
//             )}

//             {/* Show the Cropper if an image is available */}
//             {showCropper && imageSrc && (
//               <div>
//                 <Cropper
//                   src={imageSrc}
//                   style={{ height: "400px", width: "100%" }}
//                   autoCropArea={1}
//                   guides={false}
//                   ref={cropperRef}
//                   viewMode={2} // restrict crop box within image boundaries
//                   dragMode="move"
//                   ready={() => {
//                     if (detectedCropBox && cropperRef.current) {
//                       const cropper = cropperRef.current.cropper;
//                       const imageData = cropper.getImageData();
//                       // Calculate scale factor between displayed image and its natural size
//                       const scale = imageData.width / imageData.naturalWidth;
//                       // Set crop box based on detected document region
//                       cropper.setCropBoxData({
//                         left: detectedCropBox.x * scale,
//                         top: detectedCropBox.y * scale,
//                         width: detectedCropBox.width * scale,
//                         height: detectedCropBox.height * scale,
//                       });
//                     }
//                   }}
//                 />
//                 <Box className="flex justify-center space-x-4 mt-4">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleCropComplete}
//                   >
//                     Confirm Crop
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={handleRetake}
//                   >
//                     Retake
//                   </Button>
//                 </Box>
//               </div>
//             )}

//             {croppedImage && (
//               <div className="flex flex-col items-center mt-6">
//                 <img
//                   src={croppedImage}
//                   alt="Cropped Preview"
//                   className="rounded-lg shadow-lg mb-4 w-full max-w-xs"
//                 />
//                 <Typography variant="body2" color="textSecondary">
//                   Cropped Preview
//                 </Typography>
//                 <Box className="flex space-x-4 mt-4">
//                   <IconButton
//                     color="success"
//                     onClick={handleConfirmImage}
//                     style={{ backgroundColor: "rgba(0,128,0,0.2)" }}
//                   >
//                     <CheckCircleIcon
//                       style={{ fontSize: "30px", color: "green" }}
//                     />
//                   </IconButton>
//                   <IconButton
//                     color="error"
//                     onClick={handleRetake}
//                     style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
//                   >
//                     <CancelIcon style={{ fontSize: "30px", color: "red" }} />
//                   </IconButton>
//                 </Box>
//               </div>
//             )}
//           </>
//         )}

//         {isImageConfirmed && (
//           <div className="flex justify-center pt-6">
//             <button
//               type="button"
//               onClick={() => onNext(croppedImage)}
//               className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//             >
//               Next <ChevronRight className="ml-1" />
//             </button>
//           </div>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default DocumentUpload;

import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
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
import Lottie from "react-lottie-player";
import * as faceapi from "face-api.js";
import toast from "react-hot-toast";

// Example Lottie animations
import ocrIDFront from "../assets/ocr_id_front.json";
import ocrPassportFront from "../assets/ocr_passport.json";
import { useMeQuery } from "../features/api/usersApiSlice";

const MINIMUM_SCANNING_TIME = 2000; // 2 seconds

const scanningOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(30,58,138,0.85))",
  backdropFilter: "blur(5px)",
};

const PassportLottie = () => (
  <Lottie
    loop
    animationData={ocrPassportFront}
    play
    style={{ width: "240px", height: "240px", background: "transparent" }}
  />
);

const IDFrontLottie = () => (
  <Lottie
    loop
    animationData={ocrIDFront}
    play
    style={{ width: "240px", height: "240px", background: "transparent" }}
  />
);

const DocumentUpload = ({ onNext }) => {
  const [imageSrc, setImageSrc] = useState(null); // raw image from webcam/file
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null); // final cropped output
  const [isCaptureMode, setIsCaptureMode] = useState(false);
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedCropBox, setDetectedCropBox] = useState(null);
  const [idType, setIdType] = useState(null);
  const { data: me } = useMeQuery();
  
  useEffect(() => {
    if (me) {
      setIdType(me.kycs[me.kycs.length - 1].idType.toLowerCase());
    }
  }, [me]);
  
  console.log(idType);
  const [facingMode, setFacingMode] = useState("environment");
  const webcamRef = useRef(null);
  const cropperRef = useRef(null);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // Use your provided useEffect to load the tiny face detector:
  useEffect(() => {
    async function loadModels() {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        // Load additional models if needed.
      } catch (error) {
        console.error("Error loading face detection models:", error);
      }
    }
    loadModels();
  }, []);

  const getInstructionText = () => {
    if (idType === "passport")
      return "PASSPORT: Make sure the info page is fully visible, with minimal glare.";
    if (idType === "aadhaar-card")
      return "AADHAAR: Ensure the card is clearly visible with no shadows.";
    if (idType === "pan")
      return "PAN CARD: Please ensure readability of all details.";
    if (idType === "dl")
      return "DRIVING LICENSE: Ensure the front side is fully visible.";
    if (idType === "voter-id")
      return "VOTER ID: Ensure the front side is fully visible.";
    return "Ensure the document is fully visible and free from glare or shadows.";
  };

  const renderAnimation = () => {
    if (idType === "passport") return <PassportLottie />;
    return <IDFrontLottie />;
  };

  const detectCropBox = (srcImage) =>
    new Promise((resolve, reject) => {
      if (!window.cv) {
        reject(new Error("OpenCV not loaded. Ensure 'cv' is available on window."));
        return;
      }
      const img = new Image();
      img.src = srcImage;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        try {
          const cv = window.cv;
          let src = cv.imread(canvas);
          let gray = new cv.Mat();
          cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
          let blurred = new cv.Mat();
          cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
          let edged = new cv.Mat();
          cv.Canny(blurred, edged, 75, 200);
          let kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5));
          cv.dilate(edged, edged, kernel);
          cv.erode(edged, edged, kernel);
          kernel.delete();
          let contours = new cv.MatVector();
          let hierarchy = new cv.Mat();
          cv.findContours(edged, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
          let maxQuadArea = 0;
          let quadContour = null;
          for (let i = 0; i < contours.size(); i++) {
            let cnt = contours.get(i);
            let peri = cv.arcLength(cnt, true);
            let approx = new cv.Mat();
            cv.approxPolyDP(cnt, approx, 0.02 * peri, true);
            if (approx.rows === 4) {
              let area = cv.contourArea(approx);
              if (area > maxQuadArea) {
                maxQuadArea = area;
                if (quadContour) quadContour.delete();
                quadContour = approx.clone();
              }
            }
            approx.delete();
          }
          let rect;
          if (quadContour) {
            rect = cv.boundingRect(quadContour);
            quadContour.delete();
          } else {
            let maxArea = 0;
            let maxContour = null;
            for (let i = 0; i < contours.size(); i++) {
              let cnt = contours.get(i);
              let area = cv.contourArea(cnt);
              if (area > maxArea) {
                maxArea = area;
                maxContour = cnt;
              }
            }
            if (maxContour) {
              rect = cv.boundingRect(maxContour);
            } else {
              rect = { x: 0, y: 0, width: canvas.width, height: canvas.height };
            }
          }
          src.delete();
          gray.delete();
          blurred.delete();
          edged.delete();
          contours.delete();
          hierarchy.delete();
          resolve(rect);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = (err) => reject(err);
    });

  useEffect(() => {
    if (imageSrc) {
      detectCropBox(imageSrc)
        .then((rect) => setDetectedCropBox(rect))
        .catch((err) => {
          console.error("Crop box detection failed:", err);
          setDetectedCropBox(null);
        });
    }
  }, [imageSrc]);

  const handleCapture = () => {
    const capturedImage = webcamRef.current?.getScreenshot();
    if (capturedImage) {
      setImageSrc(capturedImage);
      setIsCaptureMode(false);
      setShowCropper(true);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const handleCropComplete = async () => {
    if (!cropperRef.current) return;
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas({ width: 800, height: 800 });
    const croppedDataUrl = croppedCanvas.toDataURL("image/jpeg", 1.0);

    setIsScanning(true);
    const startTime = Date.now();

    const image = new Image();
    image.src = croppedDataUrl;
    try {
      await new Promise((res, rej) => {
        image.onload = res;
        image.onerror = rej;
      });
    } catch (err) {
      toast.error("Error loading cropped image. Please try again.");
      setIsScanning(false);
      return;
    }

    // For passport or aadhaar-card, require face detection:
    if (idType === "passport" || idType === "aadhaar-card") {
      const detection = await faceapi.detectSingleFace(
        image,
        new faceapi.TinyFaceDetectorOptions()
      );
      const elapsed = Date.now() - startTime;
      if (elapsed < MINIMUM_SCANNING_TIME) {
        await new Promise((r) => setTimeout(r, MINIMUM_SCANNING_TIME - elapsed));
      }
      if (!detection) {
        toast.error("No face detected in the document. Please retake or recapture.");
        setIsScanning(false);
        return;
      }
    }

    setIsScanning(false);
    setShowCropper(false);
    setCroppedImage(croppedDataUrl);
  };

  const handleRetake = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setShowCropper(false);
    setIsCaptureMode(false);
    setIsImageConfirmed(false);
    setDetectedCropBox(null);
  };

  const handleConfirmImage = () => {
    setIsImageConfirmed(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 mt-4"
      style={{ background: "linear-gradient(to bottom right, #1E3A8A, #1F2937)" }}
    >
      <Paper
        className="w-full max-w-lg p-6 relative"
        elevation={5}
        style={{
          borderRadius: "1.25rem",
          backgroundColor: "#ffffffee",
          backdropFilter: "blur(8px)",
        }}
      >
        {isScanning && (
          <Box sx={scanningOverlayStyle}>
            <CircularProgress size={70} thickness={5} sx={{ color: "#fff" }} />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mt: 3,
                fontWeight: "bold",
                textShadow: "0 0 8px rgba(0,0,0,0.5)",
              }}
            >
              Scanning Document...
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                opacity: 0.85,
                mt: 1,
                fontStyle: "italic",
                textShadow: "0 0 6px rgba(0,0,0,0.3)",
              }}
            >
              Please wait
            </Typography>
          </Box>
        )}

        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "#1E3A8A",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          Document Upload
        </Typography>

        {!imageSrc && !isCaptureMode && (
          <>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="body1" sx={{ color: "#4B5563", fontSize: 16 }}>
                {getInstructionText()}
              </Typography>
            </Box>
            <Box className="flex justify-center mb-6">{renderAnimation()}</Box>
          </>
        )}

        {/* On mobile, show only one button ("Take") which triggers a file input */}
        {!imageSrc && !showCropper && !isImageConfirmed && !isCaptureMode && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            {isSmallScreen ? (
              <Button
                variant="contained"
                color="primary"
                component="label"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  px: 3,
                  fontWeight: 500,
                }}
              >
                Take
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={handleUpload}
                />
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    px: 3,
                    fontWeight: 500,
                  }}
                >
                  Upload
                  <input type="file" accept="image/*" hidden onChange={handleUpload} />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    px: 3,
                    fontWeight: 500,
                  }}
                  onClick={() => setIsCaptureMode(true)}
                >
                  Take
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Webcam mode (only for desktop here) */}
        {!isSmallScreen && isCaptureMode && !imageSrc && !isScanning && (
          <div className="relative w-full mx-auto" style={{ maxWidth: "640px" }}>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full rounded-xl shadow-lg"
              videoConstraints={{ facingMode }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              <IconButton
                color="success"
                onClick={handleCapture}
                sx={{
                  backgroundColor: "rgba(16,185,129,0.2)",
                  "&:hover": { backgroundColor: "rgba(16,185,129,0.4)" },
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40, color: "green" }} />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setIsCaptureMode(false)}
                sx={{
                  backgroundColor: "rgba(239,68,68,0.2)",
                  "&:hover": { backgroundColor: "rgba(239,68,68,0.4)" },
                }}
              >
                <CancelIcon sx={{ fontSize: 40, color: "red" }} />
              </IconButton>
              <IconButton
                onClick={toggleCamera}
                sx={{
                  backgroundColor: "rgba(59,130,246,0.2)",
                  "&:hover": { backgroundColor: "rgba(59,130,246,0.4)" },
                }}
              >
                <FlipCameraIosIcon sx={{ fontSize: 40, color: "#3B82F6" }} />
              </IconButton>
            </Box>
          </div>
        )}

        {showCropper && imageSrc && !isScanning && (
          <>
            <Cropper
              src={imageSrc}
              style={{ height: "360px", width: "100%", marginTop: "1rem" }}
              autoCropArea={1}
              guides={false}
              ref={cropperRef}
              viewMode={2}
              dragMode="move"
              background={false}
              ready={() => {
                if (detectedCropBox && cropperRef.current) {
                  const cropper = cropperRef.current.cropper;
                  const imageData = cropper.getImageData();
                  const scale = imageData.width / imageData.naturalWidth;
                  cropper.setCropBoxData({
                    left: detectedCropBox.x * scale,
                    top: detectedCropBox.y * scale,
                    width: detectedCropBox.width * scale,
                    height: detectedCropBox.height * scale,
                  });
                }
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCropComplete}
                sx={{ textTransform: "none", borderRadius: 999 }}
              >
                Confirm Crop
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRetake}
                sx={{ textTransform: "none", borderRadius: 999 }}
              >
                Retake
              </Button>
            </Box>
          </>
        )}

        {croppedImage && !isImageConfirmed && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            <img
              src={croppedImage}
              alt="Cropped Preview"
              style={{ borderRadius: "0.75rem", maxWidth: "220px", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
            />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Cropped Preview
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton
                color="success"
                onClick={handleConfirmImage}
                sx={{
                  backgroundColor: "rgba(16,185,129,0.2)",
                  "&:hover": { backgroundColor: "rgba(16,185,129,0.4)" },
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 30, color: "green" }} />
              </IconButton>
              <IconButton
                color="error"
                onClick={handleRetake}
                sx={{
                  backgroundColor: "rgba(239,68,68,0.2)",
                  "&:hover": { backgroundColor: "rgba(239,68,68,0.4)" },
                }}
              >
                <CancelIcon sx={{ fontSize: 30, color: "red" }} />
              </IconButton>
            </Box>
          </Box>
        )}

        {isImageConfirmed && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onNext(croppedImage)}
              endIcon={<ChevronRight />}
              sx={{ borderRadius: 999, textTransform: "none", px: 4, fontWeight: 500 }}
            >
              Next
            </Button>
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default DocumentUpload;
