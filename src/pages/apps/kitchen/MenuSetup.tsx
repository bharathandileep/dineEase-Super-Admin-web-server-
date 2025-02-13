import React, { useState, useRef } from "react";
import { PlusCircle, Image as ImageIcon, X } from "lucide-react";
import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";

// Sample data - replace with actual API data
export const categories: Category[] = [
  {
    id: "1",
    name: "Appetizers",
    subCategories: [
      {
        id: "1-1",
        name: "Soups",
        items: [
          {
            id: "1-1-1",
            name: "Tomato Soup",
            image:
              "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400",
          },
          {
            id: "1-1-2",
            name: "Mushroom Soup",
            image:
              "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400",
          },
        ],
      },
      {
        id: "1-2",
        name: "Salads",
        items: [
          {
            id: "1-2-1",
            name: "Caesar Salad",
            image:
              "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=400",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Main Course",
    subCategories: [
      {
        id: "2-1",
        name: "Pasta",
        items: [
          {
            id: "2-1-1",
            name: "Spaghetti",
            image:
              "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&q=80&w=400",
          },
        ],
      },
    ],
  },
];
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  image: string;
  isCustom: boolean;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  items: PresetMenuItem[];
}

export interface PresetMenuItem {
  id: string;
  name: string;
  image: string;
}

export default function MenuForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [customItem, setCustomItem] = useState<string>("");
  const [isCustomItem, setIsCustomItem] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const currentSubCategory = currentCategory?.subCategories.find(
    (sc) => sc.id === selectedSubCategory
  );
  const currentItem = currentSubCategory?.items.find(
    (item) => item.id === selectedItem
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
    setSelectedItem("");
    setCustomItem("");
    setIsCustomItem(false);
    setPreviewImage("");
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
    setSelectedItem("");
    setCustomItem("");
    setIsCustomItem(false);
    setPreviewImage("");
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemId = e.target.value;
    setSelectedItem(itemId);
    setCustomItem("");
    setIsCustomItem(false);

    const item = currentSubCategory?.items.find((i) => i.id === itemId);
    if (item) {
      setPreviewImage(item.image);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleAddMenu = () => {
    if (
      !selectedCategory ||
      !selectedSubCategory ||
      (!selectedItem && !customItem)
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newMenuItem: MenuItem = {
      id: Date.now().toString(),
      category: currentCategory?.name || "",
      subCategory: currentSubCategory?.name || "",
      name: isCustomItem ? customItem : currentItem?.name || "",
      image: previewImage,
      isCustom: isCustomItem,
    };

    setMenuItems([...menuItems, newMenuItem]);

    // Reset form
    setSelectedItem("");
    setCustomItem("");
    setIsCustomItem(false);
    setPreviewImage("");
  };

  const handleRemoveMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Kitchens", path: "/apps/kitchen/menu-setup" },
          {
            label: "List",
            path: "/apps/kitchen/Menu Setup",
            active: true,
          },
        ]}
        title={"Customers"}
      />

      <div
        className="mb-3"
        style={{ backgroundColor: "#5bd2bc", padding: "10px" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title m-0" style={{ color: "#fff" }}>
            Kitchen Menu Management
          </h3>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <form>
              <div className="mb-3">
                <label htmlFor="categorySelect" className="form-label">
                  Category
                </label>
                <select
                  id="categorySelect"
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCategory && (
                <div className="mb-3">
                  <label htmlFor="subCategorySelect" className="form-label">
                    Sub Category
                  </label>
                  <select
                    id="subCategorySelect"
                    className="form-select"
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                  >
                    <option value="">Select Sub Category</option>
                    {currentCategory?.subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {selectedSubCategory && !isCustomItem && (
                <div className="mb-3">
                  <label htmlFor="itemSelect" className="form-label">
                    Item
                  </label>
                  <select
                    id="itemSelect"
                    className="form-select"
                    value={selectedItem}
                    onChange={handleItemChange}
                  >
                    <option value="">Select Item</option>
                    {currentSubCategory?.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Custom Item Checkbox */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customCheck"
                  checked={isCustomItem}
                  onChange={() => setIsCustomItem(!isCustomItem)}
                />
                <label className="form-check-label" htmlFor="customCheck">
                  Add Custom Item
                </label>
              </div>

              {/* Custom Item Input */}
              {isCustomItem && (
                <div className="mb-3">
                  <label htmlFor="customItem" className="form-label">
                    Custom Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customItem"
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    placeholder="Enter item name"
                  />
                </div>
              )}

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label d-block">Item Image</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="d-none"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-outline-secondary"
                >
                  <ImageIcon className="me-2" />
                  Choose Image
                </button>
              </div>

              {/* Add Menu Button */}
              <button
                type="button"
                onClick={handleAddMenu}
                className="btn btn-primary w-100"
              >
                <PlusCircle className="me-2" />
                Add Menu Item
              </button>
            </form>
          </div>

          {/* Right Column - Preview */}
          <div className="col-md-6">
            <h2 className="h4 mb-4">Preview</h2>

            {/* Preview Image */}
            {previewImage && (
              <div className="mb-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              </div>
            )}

            {/* Menu Items List */}
            <div className="menu-items">
              {menuItems.map((item) => (
                <div key={item.id} className="card mb-3">
                  <div className="card-body">
                    <button
                      onClick={() => handleRemoveMenuItem(item.id)}
                      className="btn-close position-absolute top-0 end-0 m-2"
                      aria-label="Remove item"
                    ></button>

                    <div className="d-flex">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded me-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h5 className="card-title mb-1">{item.name}</h5>
                        <p className="card-text text-muted small">
                          {item.category} &gt; {item.subCategory}
                        </p>
                        {item.isCustom && (
                          <span className="badge bg-primary">Custom Item</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
