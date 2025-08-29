import axios from 'axios';
import { Briefcase, CheckCircle, Code, FileText, Image, Link as LinkIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Layout } from '../components/Layout';

export const AddWebProject: React.FC = () => {
  const [formData, setFormData] = useState({
    // client
    clientName: "",
    clientEmail: "",
    clientPhone: "",

    // front end display
    title: "",
    description: "",
    technologies: [] as string[],
    image: "",
    url: "",

    // backend
    hostingStartDate: "",
    hostingEndDate: "",
    domainStartDate: "",
    domainEndDate: "",
    contact: "",

    // financial details
    total: 0,
    advance: 0,
    advancePaymentDate: "",
    fullPaymentDate: "",

    // extra features
    extraFunctionalities: [] as string[],
    
    status: "active",
    notes: "",
    publish: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableTechnologies = ['React', 'Node.js', 'Tailwind CSS', 'Express'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Replace with your actual API endpoint
    const payload = {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      title: formData.title,
      publish:formData.publish,
      description: formData.description,
      technologies: formData.technologies,
      image: formData.image,
      url: formData.url,
      contact: formData.contact || formData.clientPhone,
      total: {
        price: Number(formData.total) // convert string/number input to proper number
      },
      advance: Number(formData.advance),
      advancePaymentDate: formData.advancePaymentDate ? new Date(formData.advancePaymentDate).toISOString() : null,
      fullPaymentDate: formData.fullPaymentDate ? new Date(formData.fullPaymentDate).toISOString() : null,
      // extraFunctionalities: formData.extraFunctionalities,
      // status: formData.status,
      // notes: formData.notes
    };
    const response = await axios.post("https://primexbackend.onrender.com/api/web/addwebsite", payload);

    console.log("Server Response:", response.data.success);
    if(response.data.success==true){
    setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }


    // Optionally reset form after successful submission
    // setFormData({
    //   clientName: "",
    //   clientEmail: "",
    //   clientPhone: "",
    //   title: "",
    //   description: "",
    //   technologies: [],
    //   image: "",
    //   url: "",
    //   hostingStartDate: "",
    //   hostingEndDate: "",
    //   domainStartDate: "",
    //   domainEndDate: "",
    //   contact: "",
    //   total: 0,
    //   advance: 0,
    //   advancePaymentDate: "",
    //   fullPaymentDate: "",
    //   extraFunctionalities: [],
    //   status: "active",
    //   notes: "",
    //   publish: false,
    // });

  } catch (error: any) {
    console.error("Error submitting project:", error);
    alert(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);

    // Hide success message after 3 seconds
    
  }
};

  // const existingProjects = storageUtils.getWebProjects();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 mb-20">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <Briefcase className="text-red-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Web Projects</h1>
          </div>
          <p className="text-gray-600">Add a new web development project</p>
          {/* <div className="mt-4 inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
            {existingProjects.length} Projects Added
          </div> */}
        </div>

        {/* Success Message */}
       {showSuccess && (
  <div className="fixed top-5 right-5 z-50 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center space-x-3 shadow-lg animate-slide-in">
    <CheckCircle size={20} />
    <span className="font-medium">Web project added successfully!</span>
  </div>
)}

        {/* Add Project Form */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Project Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 mb-44">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Link *
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>

            {/* Project Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image URL *
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              {formData.image && (
                <div className="mt-3">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                placeholder="Describe the project and its features..."
                required
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Technologies Used *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableTechnologies.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 border-2 rounded-lg transition-all duration-200 ${
                      formData.technologies.includes(tech)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700'
                    }`}
                  >
                    <Code size={16} />
                    <span className="font-medium">{tech}</span>
                  </button>
                ))}
              </div>
              {formData.technologies.length === 0 && (
                <p className="text-red-500 text-sm mt-2">Please select at least one technology</p>
              )}
            </div>
               <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Details</h2>
                <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name*
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Email*
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client ContactNumber*
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Budget*
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="total"
                  value={formData.total}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance*
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  name="advance"
                  value={formData.advance}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance Paid Date*
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
  type="date"
  name="advancePaymentDate"
  value={formData.advancePaymentDate}
  onChange={handleInputChange}
  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
  required
/>
              </div>
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Publish project on website
  </label>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="publish"
      checked={formData.publish}  // bind to boolean
      onChange={(e) =>
        setFormData(prev => ({ ...prev, publish: e.target.checked }))
      }
      className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
    />
    <span className=" text-black font-bold text-md">Yes, publish this project</span>
  </div>
</div>
            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || formData.technologies.length === 0}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Project...</span>
                  </>
                ) : (
                  <>
                    <Briefcase size={20} />
                    <span>Add Web Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Projects
        {existingProjects.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Projects</h3>
            <div className="grid gap-4">
              {existingProjects.slice(-3).reverse().map((project) => (
                <div key={project.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-16 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600">{project.description.substring(0, 60)}...</p>
                    <div className="flex space-x-2 mt-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </Layout>
  );
};