import React, { useState } from 'react';
import { formatCurrency } from '../utils/format';
import { FiMoreVertical, FiShoppingBag, FiNavigation, FiCamera, FiFileText, FiHeart, FiTag } from 'react-icons/fi';

const CATEGORY_ICONS = {
  Food: FiShoppingBag,
  Transport: FiNavigation,
  Leisure: FiCamera,
  Bills: FiFileText,
  Health: FiHeart,
  Others: FiTag
};

const CATEGORY_COLORS = {
  Food: 'bg-green-100 text-green-700',
  Transport: 'bg-blue-100 text-blue-700',
  Leisure: 'bg-purple-100 text-purple-700',
  Bills: 'bg-yellow-100 text-yellow-700',
  Health: 'bg-red-100 text-red-700',
  Others: 'bg-gray-100 text-gray-700'
};

const CategoryList = ({ categories, onCategoryClick, onCategoryMenuClick, selectedCategory }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (e, category) => {
    e.stopPropagation();
    setOpenMenu(openMenu === category ? null : category);
  };

  const handleViewDetails = (category) => {
    setOpenMenu(null);
    if (onCategoryMenuClick) {
      onCategoryMenuClick(category);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
      <div className="space-y-3">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.category];
          const isSelected = selectedCategory === category.category;
          
          return (
            <div
              key={category.category}
              onClick={() => onCategoryClick(category.category)}
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${CATEGORY_COLORS[category.category]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{category.category}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(category.total)}
                  </p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={(e) => handleMenuClick(e, category.category)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiMoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                  {openMenu === category.category && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenu(null)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <div className="py-1">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(category.category);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;

