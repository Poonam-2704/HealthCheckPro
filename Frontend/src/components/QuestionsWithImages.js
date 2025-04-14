import React from "react";
import "./Questions.css";
import { imageArray } from "../utils/imageImports";

export const QuestionsWithImages = () => {
  return (
    <div className="questions-container">
      <h2>Question Images</h2>
      <div className="image-grid">
        {imageArray.map((image, index) => (
          <div key={index} className="image-item">
            <img 
              src={image} 
              alt={`Question visual ${index + 1}`} 
              className="grid-image"
              onError={(e) => {
                e.target.src = '/placeholder.jpg';
                e.target.alt = 'Placeholder image';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};