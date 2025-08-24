"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../ui/button";

export default function CartPlayer({ selectedPlayer, card, setCard }) {
  const cardRef = useRef();

  const downloadPDF = async () => {
    const element = document.getElementById("player-card");

    if (!element) return console.error("Element not found");

    // Add PDF-friendly colors
    element.classList.add("pdf-colors");

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 3, // Increased scale for better quality with larger card
      backgroundColor: "#ffffff",
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    element.classList.remove("pdf-colors");

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4"); // Landscape orientation for the card format

    // Calculate dimensions to maintain aspect ratio
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 210; // A4 width in landscape
    const pdfHeight = 148; // Your specified height
    
    // Center the image on the page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const xOffset = (pageWidth - pdfWidth) / 2;
    const yOffset = (pageHeight - pdfHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, pdfWidth, pdfHeight);
    pdf.save("player-card.pdf");
  };

  return (
    <div>
      {card && selectedPlayer && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Player Card with specified dimensions */}
            <div 
              id="player-card" 
              className="bg-white relative"
              style={{
                width: "210mm",
                height: "148mm",
                minWidth: "210mm",
                minHeight: "148mm",
                maxWidth: "210mm",
                maxHeight: "148mm",
              }}
            >
              {/* Close button - positioned absolutely within the card */}
              <button
                className="absolute top-2 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-200 z-10"
                style={{ backgroundColor: "rgb(239, 68, 68)" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "rgb(220, 38, 38)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "rgb(239, 68, 68)"}
                onClick={() => setCard(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Header */}
              <div className="relative p-4" style={{ backgroundColor: "rgb(139, 92, 246)" }}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex-1 text-left">
                    <h1 className="text-sm font-semibold">
                      Association Sportive des Forces Armées Royales
                    </h1>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <img
                      src="/icons/yJpdiI6ImppUmljS0l5ZTlUOHNTNnJEakpYWGc9PSIsInZhbHV.png"
                      alt="icon"
                      className="w-16 h-16"
                      crossOrigin="anonymous"
                    />
                  </div>

                  <div className="flex-1 text-right">
                    <h1 className="text-sm font-semibold">
                      الجمعية الرياضية للقوات المسلحة الملكية
                    </h1>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex p-4 gap-4" style={{ height: "calc(100% - 80px)" }}>
                {/* Left side - Photo and Number */}
                <div className="w-1/3 flex flex-col">
                  <div className="flex-1 mb-3">
                    {selectedPlayer.additional?.imageUrl ? (
                      <img
                        src={selectedPlayer.additional.imageUrl}
                        alt={selectedPlayer.personal.fullName}
                        className="w-full h-full object-cover rounded-lg"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <img
                        src="/icons/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                        alt={selectedPlayer.personal.fullName}
                        className="w-full h-full object-cover rounded-lg"
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                  <div className="flex justify-center items-center py-2 text-lg font-bold border rounded-lg" style={{ backgroundColor: "rgb(249, 250, 251)" }}>
                    <span className="mr-2">N°</span>
                    <span>{selectedPlayer.personal.cin}</span>
                  </div>
                </div>

                {/* Right side - Player Information */}
                <div className="w-2/3 px-4 py-2 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm font-medium">Nom Complet</span>
                      <span className="font-bold text-lg">{selectedPlayer.personal.fullName.toUpperCase()}</span>
                      <span className="text-sm font-medium">الاسم الكامل</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm font-medium">Né le</span>
                      <span className="font-semibold">
                        {new Date(selectedPlayer.personal.birthDate).toLocaleDateString("fr-MA")}
                      </span>
                      <span className="text-sm font-medium">تاريخ الميلاد</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm font-medium">Position</span>
                      <span className="font-semibold">{selectedPlayer.football.position}</span>
                      <span className="text-sm font-medium">المركز</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm font-medium">Président</span>
                      <span className="font-semibold">سفيان بوعناية</span>
                      <span className="text-sm font-medium">رئيس الجمعية</span>
                    </div>
                  </div>

                  {/* Footer section */}
                  <div className="mt-auto pt-4">
                    <div className="text-center text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
                      بطاقة لاعب رسمية - Carte Officielle du Joueur
                    </div>
                    <div className="mt-2 text-center text-xs" style={{ color: "rgb(156, 163, 175)" }}>
                      Season 2024/2025
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button - Outside the card */}
            <div className="p-4 border-t w-full" style={{ backgroundColor: "rgb(249, 250, 251)" }}>
              <Button
                onClick={downloadPDF}
                className="w-full flex items-center justify-center px-6 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg"
                style={{ backgroundColor: "rgb(139, 92, 246)" }}
              >
                تحميل بطاقة اللاعب
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}