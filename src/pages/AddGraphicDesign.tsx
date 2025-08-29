import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Palette, FileText, Image, CheckCircle } from 'lucide-react';
import { storageUtils } from '../utils/storage';
import { GraphicDesign } from '../types';

export const AddGraphicDesign: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const designCategories = ['Logos', 'T-Shirt Design', 'Social Media Posts', 'Branding Materials', 'Print Design'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const design: GraphicDesign = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    storageUtils.saveGraphicDesign(design);
    
    setShowSuccess(true);
    setFormData({
      title: '',
      category: '',
      image: ''
    });
    setIsSubmitting(false);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const existingDesigns = storageUtils.getGraphicDesigns();
  const designsByCategory = designCategories.reduce((acc, category) => {
    acc[category] = existingDesigns.filter(design => design.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Palette className="text-purple-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Graphic Designs</h1>
          </div>
          <p className="text-gray-600">Showcase your creative graphic design work</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
            {existingDesigns.length} Designs Added
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {designCategories.map((category) => (
            <div key={category} className="bg-white rounded-lg p-4 border border-red-100 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {designsByCategory[category] || 0}
              </div>
              <div className="text-sm text-gray-600 font-medium">{category}</div>
            </div>
          ))}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center space-x-3">
            <CheckCircle size={20} />
            <span className="font-medium">Graphic design added successfully!</span>
          </div>
        )}

        {/* Add Design Form */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Design</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Design Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Title *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter design title"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                required
              >
                <option value="">Select a category</option>
                {designCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Design Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Design Image URL *
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="https://example.com/design.jpg"
                  required
                />
              </div>
              {formData.image && (
                <div className="mt-3 flex justify-center">
                  <img 
                    src={formData.image} 
                    alt="Design preview" 
                    className="w-64 h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Adding Design...</span>
                  </>
                ) : (
                  <>
                    <Palette size={20} />
                    <span>Add Graphic Design</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Designs */}
        {existingDesigns.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Designs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {existingDesigns.slice(-8).reverse().map((design) => (
                <div key={design.id} className="group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 border border-gray-200 hover:shadow-lg transition-all duration-200">
                    <img 
                      src={design.image} 
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">{design.title}</h4>
                  <p className="text-xs text-gray-600">{design.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};