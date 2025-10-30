import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { predictDisease } from '../models/cropDiseaseModel';
import { storage, databases } from '../lib/appwrite';
import { useAuth } from '../hooks/useAuth';
import { ID } from 'appwrite';
import { FaCamera, FaUpload, FaCheckCircle, FaExclamationTriangle, FaLeaf, FaMicroscope, FaInfoCircle } from 'react-icons/fa';

const CropScan = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setResult(null);

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const handleScan = async () => {
    if (!selectedFile || !preview) return;

    setLoading(true);
    setError('');

    try {
      // Create image element for TensorFlow.js
      const img = new Image();
      img.src = preview;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Get prediction
      const prediction = await predictDisease(img);

      // Upload image to Appwrite Storage
      setUploading(true);
      const fileId = ID.unique();
      await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId,
        selectedFile
      );

      // Save scan result to database
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'scansdb',
        ID.unique(),
        {
          userId: user.$id,
          imageId: fileId,
          disease: prediction.disease,
          confidence: prediction.confidence,
          solution: prediction.solution,
          imageUrl: storage.getFileView(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            fileId
          )
        }
      );

      setResult(prediction);
    } catch (err) {
      console.error('Scan error:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const resetScan = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-agri-green to-agri-gold rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-full">
              <FaMicroscope className="text-2xl sm:text-3xl lg:text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Crop Disease Scanner</h1>
          <p className="text-green-100 text-sm sm:text-base lg:text-lg">
            Upload or drag & drop a photo of your crop to detect diseases and get treatment recommendations.
          </p>
        </div>
      </div>

      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 hover:shadow-lg ${
            isDragActive
              ? 'border-agri-green bg-gradient-to-br from-agri-green/10 to-agri-gold/10 scale-105'
              : 'border-gray-300 hover:border-agri-green hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-agri-green to-agri-gold p-4 sm:p-6 rounded-full">
                <FaCamera className="text-3xl sm:text-4xl text-white" />
              </div>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {isDragActive ? 'Drop the image here' : 'Upload Crop Image'}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">Drag & drop or click to select a file</p>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-1" />
                JPG
              </span>
              <span className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-1" />
                PNG
              </span>
              <span className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-1" />
                WebP
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Crop preview"
                    className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    <FaLeaf className="inline mr-1 text-agri-green" />
                    Preview
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <FaUpload className="text-agri-green mr-2" />
                    Selected Image
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleScan}
                    disabled={loading || uploading}
                    className="flex-1 bg-gradient-to-r from-agri-green to-agri-gold text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <FaMicroscope className="text-sm" />
                    <span>{loading ? 'Analyzing...' : uploading ? 'Saving...' : 'Scan for Diseases'}</span>
                  </button>
                  <button
                    onClick={resetScan}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-red-300 transition-colors flex items-center justify-center"
                  >
                    <FaExclamationTriangle className="text-sm mr-2" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-3 text-lg" />
                <div className="text-red-800 font-medium">{error}</div>
              </div>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <FaCheckCircle className="text-agri-green text-2xl mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Scan Results</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center mb-3">
                    <FaLeaf className="text-green-600 text-xl mr-3" />
                    <h4 className="font-semibold text-green-800 text-base sm:text-lg">Detected Disease</h4>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">{result.disease}</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-gradient-to-r from-agri-green to-agri-gold h-2 rounded-full"
                        style={{ width: `${Math.round(result.confidence * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Confidence Level</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center mb-3">
                    <FaInfoCircle className="text-blue-600 text-xl mr-3" />
                    <h4 className="font-semibold text-blue-800 text-base sm:text-lg">Recommended Solution</h4>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{result.solution}</p>
                </div>
              </div>
              <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start">
                  <FaLightbulb className="text-yellow-500 text-lg mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm sm:text-base text-yellow-800 font-medium mb-1">Pro tip:</p>
                    <p className="text-sm text-yellow-700">Save this result and consult with local agricultural experts for the best treatment approach.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* How it Works Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center mb-4 sm:mb-6">
          <FaInfoCircle className="text-blue-600 text-xl sm:text-2xl mr-3" />
          <h4 className="font-semibold text-blue-900 text-base sm:text-lg">How it works</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <p className="text-sm sm:text-base text-blue-800 font-medium">Take a clear photo</p>
              <p className="text-xs sm:text-sm text-blue-600">Capture affected plant leaves or fruits</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <p className="text-sm sm:text-base text-blue-800 font-medium">AI Analysis</p>
              <p className="text-xs sm:text-sm text-blue-600">Our AI detects common crop diseases</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <p className="text-sm sm:text-base text-blue-800 font-medium">Get Recommendations</p>
              <p className="text-xs sm:text-sm text-blue-600">Receive treatment and prevention tips</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-agri-green rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <div>
              <p className="text-sm sm:text-base text-blue-800 font-medium">Save Results</p>
              <p className="text-xs sm:text-sm text-blue-600">Access history for future reference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropScan;
