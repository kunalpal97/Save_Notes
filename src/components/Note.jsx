import jsPDF from "jspdf";
import React, { useState } from "react";
import './Note.css'; // Assuming your CSS file is named Note.css

const Note = ({ note, handleDelete, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(note.text);
  const [newHeader, setNewHeader] = useState(note.header);

  const handleSave = () => {
    handleEdit(note.id, newHeader, newText);
    setIsEditing(false);
  };

  const downloadImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Canvas Dimensions
    canvas.width = 800; // Width of the image
    canvas.height = 600; // Height of the image (adjust as needed)

    // Background Color
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header
    ctx.fillStyle = "#000000"; // Black text color
    ctx.font = "bold 24px Arial";
    ctx.fillText(note.header || "Header", 20, 40); // Header at the top-left

    // Date/Time
    ctx.font = "16px Arial";
    const dateText = note.date || new Date().toLocaleString();
    const textWidth = ctx.measureText(dateText).width;
    ctx.fillText(dateText, canvas.width - textWidth - 20, 40); // Date/Time at the top-right

    // Black Line
    ctx.beginPath();
    ctx.moveTo(20, 60); // Line start
    ctx.lineTo(canvas.width - 20, 60); // Line end
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000"; // Black line
    ctx.stroke();

    // Content
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    const lineHeight = 24;
    const contentLines = note.text.split("\n"); // Split content into lines
    let yOffset = 100; // Starting y-position for content
    contentLines.forEach((line) => {
      ctx.fillText(line, 20, yOffset); // Draw each line of content
      yOffset += lineHeight;
    });

    // Convert Canvas to Image and Download
    const imageData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${note.header || "Note"}.png`;
    link.href = imageData;
    link.click();
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(16);

    // Header (left-aligned)
    pdf.text(note.header, 10, 10);

    // Date/Time (right-aligned, shifted left to stay within bounds)
    pdf.setFontSize(12);
    pdf.text(note.date, 150, 10, { align: "right" });

    // Black line below header and date
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(0, 0, 0);
    pdf.line(10, 15, 200, 15);

    // Render content below the line (preserve line breaks)
    pdf.setFont("Helvetica", "normal");
    const contentLines = pdf.splitTextToSize(note.text, 190); // Wrap content within 190 units
    pdf.text(contentLines, 10, 25); // Start content at y=25

    // Save PDF
    pdf.save(`${note.header || "Note"}.pdf`);
  };

  return (
    <div
      id={`note-${note.id}`}
      className="note-container"
    >
      {isEditing ? (
        <div className="note-editing">
          <input
            type="text"
            className="note-header-input"
            value={newHeader}
            onChange={(e) => setNewHeader(e.target.value)}
          />
          <textarea
            className="note-textarea"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button
            className="save-button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="note-view">
          <h3 className="note-header">{note.header}</h3>
          <pre className="note-text">{note.text}</pre> {/* Display text with preserved line breaks */}
          <p className="note-date">Created on: {note.date}</p>
          <div className="note-actions">
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
            <button
              className="download-pdf-button"
              onClick={downloadPDF}
            >
              Download as PDF
            </button>
            <button
              className="download-image-button"
              onClick={downloadImage}
            >
              Download as Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
