import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion } from 'motion/react';
import { Film, Upload, Loader2, Play, AlertCircle } from 'lucide-react';

const VeoGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!image) {
      setError('Please upload an image first.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Base64 cleanup
      const base64Data = image.split(',')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Animate this medical scene smoothly',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      // Polling for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY || '',
          },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error('Failed to get video download link');
      }
    } catch (err: any) {
      console.error('Veo Error:', err);
      setError(err.message || 'An error occurred during video generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 border border-slate-200">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-medical-blue p-2 rounded-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">AI Medical Visualizer</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">1. Upload Image (Clinic/Medical)</label>
            <div 
              className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-medical-blue transition-colors cursor-pointer bg-white"
              onClick={() => document.getElementById('veo-upload')?.click()}
            >
              {image ? (
                <img src={image} alt="Preview" className="max-h-48 mx-auto rounded-xl" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                </div>
              )}
              <input 
                id="veo-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">2. Animation Prompt (Optional)</label>
            <textarea
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none"
              placeholder="e.g., Animate the medical staff walking through the hallway..."
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">3. Aspect Ratio</label>
            <div className="flex space-x-4">
              <button 
                onClick={() => setAspectRatio('16:9')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${aspectRatio === '16:9' ? 'bg-medical-blue text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                Landscape (16:9)
              </button>
              <button 
                onClick={() => setAspectRatio('9:16')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${aspectRatio === '9:16' ? 'bg-medical-blue text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                Portrait (9:16)
              </button>
            </div>
          </div>

          <button
            onClick={generateVideo}
            disabled={isGenerating || !image}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Video...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Generate Video</span>
              </>
            )}
          </button>

          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden min-h-[300px]">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full h-full object-contain"
            />
          ) : isGenerating ? (
            <div className="text-center text-slate-400 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-medical-blue" />
              <p className="text-sm font-medium">Creating your animation...<br/>This may take a minute.</p>
            </div>
          ) : (
            <div className="text-center text-slate-500 p-8">
              <Film className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Your generated video will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VeoGenerator;
