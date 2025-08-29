import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Calendar, FileText, Image, CheckCircle, Plus, X } from 'lucide-react';
import { storageUtils } from '../utils/storage';
import { Event } from '../types';

export const AddEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    images: [] as string[],
    mainImage: '',
    description: '',
    date: ''
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const eventCategories = ['Corporate Events', 'Weddings', 'Product Launches', 'Social Events', 'Conferences'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
        mainImage: prev.mainImage || newImageUrl.trim() // Set as main image if it's the first one
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    const imageToRemove = formData.images[index];
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      mainImage: prev.mainImage === imageToRemove ? (prev.images[0] || '') : prev.mainImage
    }));
  };

  const setAsMainImage = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, mainImage: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const event: Event = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    storageUtils.saveEvent(event);
    
    setShowSuccess(true);
    setFormData({
      name: '',
      category: '',
      images: [],
      mainImage: '',
      description: '',
      date: ''
    });
    setIsSubmitting(false);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const existingEvents = storageUtils.getEvents();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Events Coverage</h1>
          </div>
          <p className="text-gray-600">Document and showcase your event coverage</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
            {existingEvents.length} Events Covered
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center space-x-3">
            <CheckCircle size={20} />
            <span className="font-medium">Event added successfully!</span>
          </div>
        )}

        {/* Add Event Form */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Event</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  placeholder="Enter event name"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                required
              >
                <option value="">Select a category</option>
                {eventCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Images
              </label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={imageUrl} 
                          alt={`Event image ${index + 1}`}
                          className={`w-full h-24 object-cover rounded-lg border-2 ${
                            formData.mainImage === imageUrl ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setAsMainImage(imageUrl)}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Main
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                        {formData.mainImage === imageUrl && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                placeholder="Describe the event, your role, and key highlights..."
                required
              />
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
                    <span>Adding Event...</span>
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    <span>Add Event</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Recent Events */}
        {existingEvents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h3>
            <div className="grid gap-4">
              {existingEvents.slice(-3).reverse().map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={event.mainImage || event.images[0]} 
                    alt={event.name}
                    className="w-16 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-600">{event.category} • {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.images.length} images</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};