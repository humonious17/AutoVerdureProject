import React, { useState, useRef, useEffect } from "react";
import { X, Move, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ImageCropper = ({ file, onSave, onCancel }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Create object URL for the image file
  const imageUrl = file ? URL.createObjectURL(file) : null;

  // Load image dimensions when file changes
  useEffect(() => {
    if (file) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        // Reset transformations when new image is loaded
        setPosition({ x: 0, y: 0 });
        setScale(1);
        setRotation(0);
      };
      img.src = imageUrl;
    }

    // Cleanup URL when component unmounts or file changes
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [file]);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta) => {
    setScale((prevScale) => {
      const newScale = prevScale + delta;
      return newScale > 0.5 && newScale < 3 ? newScale : prevScale;
    });
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleSave = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Keep canvas at 550x550 for display
    canvas.width = 550;
    canvas.height = 550;

    // Draw background (transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply transformations
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Calculate scaling to fit image within canvas while maintaining aspect ratio
    const scaleFactor = Math.min(
      550 / imageDimensions.width,
      550 / imageDimensions.height
    );

    // Draw image centered
    const img = imageRef.current;
    const scaledWidth = imageDimensions.width * scaleFactor;
    const scaledHeight = imageDimensions.height * scaleFactor;

    ctx.drawImage(
      img,
      -scaledWidth / 2 + position.x / scale,
      -scaledHeight / 2 + position.y / scale,
      scaledWidth,
      scaledHeight
    );

    // Restore context state
    ctx.restore();

    // Convert to blob
    canvas.toBlob(
      async (blob) => {
        const processedFile = new File([blob], file.name, {
          type: file.type || "image/jpeg",
        });
        onSave(processedFile);
      },
      file.type || "image/jpeg",
      1.0
    );
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
          ref={containerRef}
          className="relative w-[550px] h-[550px] overflow-hidden border-2 border-dashed border-gray-300 rounded-lg mb-4 mx-auto"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {file && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Preview"
              className="absolute left-1/2 top-1/2 cursor-move"
              style={{
                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
                maxWidth: "none",
                width: "auto",
                height: "auto",
                maxHeight: "550px",
                objectFit: "contain",
              }}
              draggable="false"
            />
          )}

          <Move className="absolute top-4 left-4 w-6 h-6 text-white drop-shadow-lg pointer-events-none" />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleZoom(-0.1)}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => handleZoom(0.1)}>
            <ZoomIn className="h-4 w-4" />
          </Button>

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
