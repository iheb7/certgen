"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CertificatePreview from "src/components/CertificationPreview";
import { Download, ChevronRight, ChevronLeft, FileText, Palette, Eye, Layout, User } from "lucide-react";

interface CertificateData {
  title: string;
  recipientName: string;
  completionDate: string;
  organizationName: string;
  template: "formal" | "casual" | "";
  colorScheme: string;
  borderStyle: string;
}

const steps = [
  {
    id: 1,
    title: "Template Selection",
    description: "Choose your certificate template style",
    icon: Layout
  },
  {
    id: 2,
    title: "Certificate Info",
    description: "Enter certificate title and organization",
    icon: FileText
  },
  {
    id: 3,
    title: "Recipient Details",
    description: "Add recipient name and completion date",
    icon: User
  },
  {
    id: 4,
    title: "Styling Options",
    description: "Customize colors, borders, and design",
    icon: Palette
  },
 
];

export default function CertificateGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [certificateData, setCertificateData] = useState<CertificateData>({
    title: "Certificate of Completion",
    recipientName: "",
    completionDate: new Date().toISOString().split('T')[0],
    organizationName: "Your Organization",
    template: "",
    colorScheme: "blue",
    borderStyle: "classic"
  });

  const certificateRef = useRef<HTMLDivElement>(null);

  const updateCertificateData = (field: keyof CertificateData, value: string) => {
    setCertificateData(prev => ({ ...prev, [field]: value }));
  };


  const colorSchemes = [
    { value: "blue", label: "Professional Blue", colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#dbeafe" } },
    { value: "gold", label: "Golden Elegance", colors: { primary: "#b45309", secondary: "#d97706", accent: "#fef3c7" } },
    { value: "green", label: "Success Green", colors: { primary: "#15803d", secondary: "#22c55e", accent: "#dcfce7" } },
    { value: "purple", label: "Royal Purple", colors: { primary: "#7c3aed", secondary: "#a855f7", accent: "#f3e8ff" } },
    { value: "red", label: "Achievement Red", colors: { primary: "#dc2626", secondary: "#ef4444", accent: "#fee2e2" } }
  ];

  const borderStyles = [
    { value: "classic", label: "Classic Border" },
    { value: "modern", label: "Modern Minimalist" },
    { value: "ornate", label: "Ornate Design" },
    { value: "simple", label: "Simple Line" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return certificateData.template !== ""; 
      case 2:
        return certificateData.title.trim() !== "" &&
               certificateData.organizationName.trim() !== "";
      case 3:
        return certificateData.recipientName.trim() !== "";
      case 4:
        return true; 
      case 5:
        return true; // Review step
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Template Selection
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Choose Your Certificate Template</h3>
              <p className="text-gray-600">Select the template that best fits your certificate's purpose and style.</p>
            </div>

            <RadioGroup
              value={certificateData.template}
              onValueChange={(value: "formal" | "casual") => updateCertificateData("template", value)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-6 border-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer ${
                  certificateData.template === "formal" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}>
                  <RadioGroupItem value="formal" id="formal" className="sr-only" />
                  <Label htmlFor="formal" className="cursor-pointer">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="border-4 border-blue-600 border-double w-24 h-20 flex items-center justify-center">
                          <span className="text-blue-600 font-serif text-xs">FORMAL</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg">Formal/Corporate</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Traditional design with elegant borders, serif fonts, and official styling.
                        Perfect for academic achievements, professional certifications, and corporate awards.
                      </p>
                    </div>
                  </Label>
                </div>

                <div className={`p-6 border-2 rounded-lg  ${
                  certificateData.template === "casual" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                }`}>
                  <RadioGroupItem value="casual" id="casual" className="sr-only" />
                  <Label htmlFor="casual" className="cursor-pointer">
                    <div className="text-center">
                      <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                        <div className="border-2 border-green-600 w-24 h-20 flex items-center justify-center rounded">
                          <span className="text-green-600 font-sans text-xs">MODERN</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg">Casual/Modern</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Contemporary design with clean lines, sans-serif fonts, and modern styling.
                        Ideal for workshops, online courses, and creative achievements.
                      </p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        );

      case 2:
        // Certificate Information
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Certificate Information</h3>
              <p className="text-gray-600">Enter the basic information for your certificate.</p>
            </div>

            <div>
              <Label htmlFor="title">Certificate Title *</Label>
              <Input
                id="title"
                value={certificateData.title}
                onChange={(e) => updateCertificateData("title", e.target.value)}
                placeholder="e.g., Certificate of Completion, Certificate of Achievement"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Choose a title that reflects the type of achievement or completion.
              </p>
            </div>

            <div>
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={certificateData.organizationName}
                onChange={(e) => updateCertificateData("organizationName", e.target.value)}
                placeholder="e.g., ABC University, XYZ Training Institute"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                The name of the organization or institution issuing this certificate.
              </p>
            </div>
          </div>
        );

      case 3:
        // Recipient Details
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Recipient Details</h3>
              <p className="text-gray-600">Add the recipient's information and completion date.</p>
            </div>

            <div>
              <Label htmlFor="recipientName">Recipient Name *</Label>
              <Input
                id="recipientName"
                value={certificateData.recipientName}
                onChange={(e) => updateCertificateData("recipientName", e.target.value)}
                placeholder="Enter the full name of the recipient"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the complete name as it should appear on the certificate.
              </p>
            </div>

            <div>
              <Label htmlFor="completionDate"></Label>
              <Input
                id="completionDate"
                type="date"
                value={certificateData.completionDate}
                onChange={(e) => updateCertificateData("completionDate", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                The date when the achievement was completed or when the certificate is issued.
              </p>
            </div>
          </div>
        );

      case 4:
        // Styling Options
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">Styling Options</h3>
              <p className="text-gray-600">Customize the appearance of your certificate.</p>
            </div>

            <div>
              <Label htmlFor="colorScheme">Color Scheme</Label>
              <Select
                value={certificateData.colorScheme}
                onValueChange={(value) => updateCertificateData("colorScheme", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorSchemes.map((scheme) => (
                    <SelectItem key={scheme.value} value={scheme.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: scheme.colors.primary }}
                        />
                        {scheme.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Choose a color scheme that matches your organization's branding or preference.
              </p>
            </div>

            <div>
              <Label htmlFor="borderStyle">Border Style</Label>
              <Select
                value={certificateData.borderStyle}
                onValueChange={(value) => updateCertificateData("borderStyle", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {borderStyles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Select a border style that complements your chosen template.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🎨 Design Preview</h4>
              <p className="text-sm text-blue-700">
                You can see how your styling choices affect the certificate in the live preview on the right.
                Try different combinations to find the perfect look!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificate Generator</h1>
          <p className="text-lg text-gray-600 mb-4">Create beautiful certificates with live preview</p>
          <div className="max-w-2xl mx-auto text-sm text-gray-500">
            <p>Follow our 5-step process to create your professional certificate: choose template, enter details, customize design.</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8 overflow-x-auto pb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : isCompleted
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 bg-white text-gray-400'
                      }`}
                    >
                      <StepIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="mt-2">
                      <p className={`text-xs md:text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="sm:hidden">Step {step.id}</span>
                        <span className="hidden sm:inline">{step.title}</span>
                      </p>
                      <p className="text-xs text-gray-400 max-w-20 md:max-w-24 hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-all duration-300 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="space-y-6 animate-in slide-in-from-left duration-700">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-blue-600 text-sm font-medium">
                    Step {currentStep} of {steps.length}
                  </span>
                </CardTitle>
                <div>
                  <h2 className="text-xl font-semibold">{steps[currentStep - 1].title}</h2>
                  <p className="text-gray-600">{steps[currentStep - 1].description}</p>
                </div>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceedToNextStep()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2"
                >
                  Start Over
                </Button>
              )}
            </div>

            {/* Validation Messages for each step*/}
            {((currentStep === 1 && !canProceedToNextStep()) ||
              (currentStep === 2 && !canProceedToNextStep()) ||
              (currentStep === 3 && !canProceedToNextStep())) && (
              <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                Please complete all required fields (*) to continue to the next step.
              </div>
            )}
          </div>

          {/* Preview window */}
          <div className="lg:sticky lg:top-4">
            <Card className="transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificateData.template ? (
                  <div ref={certificateRef} className="transition-all duration-300">
                    <CertificatePreview
                      data={certificateData}
                      colorSchemes={colorSchemes}
                    />
                  </div>
                ) : (
                  <div className="aspect-[11/8.5] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Layout className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Select a template to see preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
