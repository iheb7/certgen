"use client";

import { useMemo } from "react";

interface CertificateData {
  title: string;
  recipientName: string;
  completionDate: string;
  organizationName: string;
  template: "formal" | "casual" | "";
  colorScheme: string;
  borderStyle: string;
}

interface ColorScheme {
  value: string;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface CertificatePreviewProps {
  data: CertificateData;
  colorSchemes: ColorScheme[];
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data, colorSchemes }) => {
  const currentColors = useMemo(() => {
    return colorSchemes.find(scheme => scheme.value === data.colorScheme)?.colors || {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#dbeafe"
    };
  }, [data.colorScheme, colorSchemes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBorderStyles = () => {
    const baseStyles = "w-full h-full absolute inset-0";

    switch (data.borderStyle) {
      case "classic":
        return `${baseStyles} border-8 border-double`;
      case "modern":
        return `${baseStyles} border-2`;
      case "ornate":
        return `${baseStyles} border-4 border-dashed`;
      case "simple":
        return `${baseStyles} border`;
      default:
        return `${baseStyles} border-4 border-double`;
    }
  };

  if (!data.template) {
    return (
      <div className="relative bg-gray-100 shadow-lg transition-all duration-500 hover:shadow-xl flex items-center justify-center" style={{ aspectRatio: "11/8.5" }}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
          <p className="text-lg font-medium">Choose a Template</p>
          <p className="text-sm">Select formal or casual style to see your certificate preview</p>
        </div>
      </div>
    );
  }

  if (data.template === "formal") {
    return (
      <div className="relative bg-white shadow-lg transition-all duration-500 hover:shadow-xl" style={{ aspectRatio: "11/8.5" }}>
        {/* Border */}
        <div
          className={getBorderStyles()}
          style={{ borderColor: currentColors.primary }}
        />

        {/* Content */}
        <div className="relative p-8 h-full flex flex-col justify-center items-center text-center">
          {/* Header Decoration */}
          <div
            className="w-32 h-1 mb-6"
            style={{ backgroundColor: currentColors.secondary }}
          />

          {/* Title */}
          <h1
            className="text-3xl font-serif font-bold mb-4"
            style={{ color: currentColors.primary }}
          >
            {data.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-6">
            This is to certify that
          </p>

          {/* Recipient Name */}
          <h2
            className="text-4xl font-serif font-bold mb-6 border-b-2 pb-2"
            style={{
              color: currentColors.primary,
              borderBottomColor: currentColors.secondary
            }}
          >
            {data.recipientName || "Recipient Name"}
          </h2>

          {/* Achievement Text */}
          <p className="text-lg text-gray-700 mb-8 max-w-lg leading-relaxed">
            has successfully completed the requirements and is hereby awarded this certificate of achievement
          </p>

          {/* Date and Organization */}
          <div className="flex justify-between items-end w-full mt-auto">
            <div className="text-left">
              <div
                className="h-px w-32 mb-2"
                style={{ backgroundColor: currentColors.primary }}
              />
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{formatDate(data.completionDate)}</p>
            </div>

            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentColors.accent }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: currentColors.primary }}
              >
                SEAL
              </div>
            </div>

            <div className="text-right">
              <div
                className="h-px w-32 mb-2 ml-auto"
                style={{ backgroundColor: currentColors.primary }}
              />
              <p className="text-sm text-gray-600">Authorized by</p>
              <p className="font-semibold">{data.organizationName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Casual/Modern template
  return (
      <div className="relative bg-white shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, ${currentColors.primary} 25%, transparent 25%),
                             linear-gradient(-45deg, ${currentColors.primary} 25%, transparent 25%),
                             linear-gradient(45deg, transparent 75%, ${currentColors.primary} 75%),
                             linear-gradient(-45deg, transparent 75%, ${currentColors.primary} 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />

        {/* Border */}
        <div
          className={getBorderStyles()}
          style={{ borderColor: currentColors.secondary }}
        />

        {/* Header Bar */}
        <div
          className="h-16 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})`
          }}
        >
          <h1 className="text-2xl font-sans font-bold text-white">
            {data.title}
          </h1>
        </div>

        {/* Content */}
        <div className="relative p-8 h-full flex flex-col justify-center items-center text-center">
          {/* Achievement Badge */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
            style={{ backgroundColor: currentColors.accent }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentColors.secondary }}
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-4 font-light">
            Awarded to
          </p>

          {/* Recipient Name */}
          <h2
            className="text-4xl font-sans font-bold mb-6"
            style={{ color: currentColors.primary }}
          >
            {data.recipientName || "Recipient Name"}
          </h2>

          {/* Achievement Text */}
          <p className="text-base text-gray-700 mb-8 max-w-md leading-relaxed font-light">
            For outstanding achievement and successful completion of all requirements
          </p>

          {/* Bottom Section */}
          <div className="flex justify-between items-center w-full mt-auto pt-8">
            <div className="text-left">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Date</p>
              <p
                className="font-semibold text-lg"
                style={{ color: currentColors.primary }}
              >
                {formatDate(data.completionDate)}
              </p>
            </div>

            <div
              className="px-6 py-3 rounded-full"
              style={{ backgroundColor: currentColors.accent }}
            >
              <p
                className="font-bold text-sm"
                style={{ color: currentColors.primary }}
              >
                CERTIFIED
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Organization</p>
              <p
                className="font-semibold text-lg"
                style={{ color: currentColors.primary }}
              >
                {data.organizationName}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};


export default CertificatePreview;
