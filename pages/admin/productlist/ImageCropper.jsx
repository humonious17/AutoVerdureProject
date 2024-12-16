import React, { useState, useRef, useEffect } from "react";
import { X, Move, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Croppie from "croppie";
import "croppie/croppie.css";

const ImageCropper = ({ file, onSave, onCancel }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const croppieRef = useRef(null);
  const fileInputRef = useRef(null);
  const [croppieInstance, setCroppieInstance] = useState(null);

  const croppieOptions = {
    showZoomer: true,
    enableOrientation: true,
    mouseWheelZoom: "ctrl",
    viewport: {
      width: 624,
      height: 550,
      type: "square",
    },
    boundary: {
      width: 624,
      height: 550,
    },
  };

  useEffect(() => {
    // Initialize Croppie when component mounts
    if (croppieRef.current) {
      const c = new Croppie(croppieRef.current, croppieOptions);
      setCroppieInstance(c);
    }

    // Cleanup Croppie instance when component unmounts
    return () => {
      if (croppieInstance) {
        croppieInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Bind file to Croppie when file changes
    if (file && croppieInstance) {
      const reader = new FileReader();
      reader.onload = (e) => {
        croppieInstance.bind({
          url: e.target.result,
          zoom: 1,
        });
        setIsFileUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  }, [file, croppieInstance]);

  const handleRotate = () => {
    if (croppieInstance) {
      croppieInstance.rotate(90);
    }
  };

  const handleZoom = (delta) => {
    if (croppieInstance) {
      const currentZoom = croppieInstance.get().zoom;
      const newZoom = currentZoom + delta;

      // Limit zoom between 0.5 and 3
      if (newZoom >= 0.5 && newZoom <= 3) {
        croppieInstance.setZoom(newZoom);
      }
    }
  };

  const handleSave = () => {
    if (croppieInstance) {
      croppieInstance
        .result("blob")
        .then((blob) => {
          const processedFile = new File([blob], file.name, {
            type: file.type || "image/jpeg",
          });
          onSave(processedFile);
        })
        .catch((error) => {
          console.error("Error processing image:", error);
        });
    }
  };

  return (
    <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CardContent className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Adjust Image</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div
          ref={croppieRef}
          className="relative w-[624px] h-[550px] overflow-hidden border-2 border-dashed border-gray-300 rounded-lg mb-4 mx-auto"
        />

        <div className="flex items-center justify-center gap-4">
          <ZoomOut
            className="h-4 w-4 text-gray-500 cursor-pointer"
            onClick={() => handleZoom(-0.1)}
          />
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={croppieInstance ? croppieInstance.get().zoom : 1}
            onChange={(e) =>
              croppieInstance &&
              croppieInstance.setZoom(parseFloat(e.target.value))
            }
            className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <ZoomIn
            className="h-4 w-4 text-gray-500 cursor-pointer"
            onClick={() => handleZoom(0.1)}
          />

          <Button variant="outline" size="icon" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCropper;
