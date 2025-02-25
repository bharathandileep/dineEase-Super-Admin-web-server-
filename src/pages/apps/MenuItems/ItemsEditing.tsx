
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FileUploader from "../../../components/FileUploader";
import { FormInput } from "../../../components/";
import { getItemById, updateItem } from "../../../server/admin/items";
import { getAllCategories, getSubcategoriesByCategory } from "../../../server/admin/menu";

const EditFoodItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [item, setItem] = useState<{ item_name: string; category: string; subcategory: string; item_description: string; item_image?: string } | null>(null);
  const [itemImage, setItemImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ _id: string; category: string }[]>([]);
  const [subcategories, setSubcategories] = useState<{ _id: string; subcategoryName: string }[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await getItemById(id);
        if (response.status) {
          setItem(response.data.categories);
          setSelectedCategoryId(response.data.category || "");
        } else {
          toast.error("Failed to load item details.");
        }
      } catch (error) {
        toast.error("Error fetching item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories( { page: 1, limit: 100 } );
      if (response.status) setCategories(response.data.categories);
      
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchSubcategories = async () => {
        const response = await getSubcategoriesByCategory(selectedCategoryId);
        if (response.status) setSubcategories(response.data.categories);
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [selectedCategoryId]);

  const schema = yup.object().shape({
    item_name: yup.string().required("Item name is required"),
    category: yup.string().required("Category is required"),
    subcategory: yup.string().required("Subcategory is required"),
    item_description: yup.string().required("Description is required"),
  });

  const { handleSubmit, register, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (item) {
      setValue("item_name", item.item_name);
      setValue("category", item.category);
      setValue("subcategory", item.subcategory);
      setValue("item_description", item.item_description);
      setValue("item_image", item.item_image);
    }
  }, [item, setValue]);

  const onSubmit = async (data: any) => {
    console.log(itemImage);
    
    try {
      const formData = new FormData();
      formData.append("item_name", data.item_name);
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("item_description", data.item_description);
      
      if (itemImage) {
        formData.append("item_image", itemImage);
      }

      console.log("FormData:", formData);
      console.log("Item ID:", id);

      const response = await updateItem(id, formData);
      if (response.status) {
        toast.success("Item updated successfully!");
        navigate("/apps/kitchen/listing");
      } else {
        toast.error("Failed to update item.");
      }
    } catch (error) {
      toast.error("Error updating item.");
    }
  };

  return (
    <div className="container py-2">
      <Card className="mb-2">
        <Card.Body>
          <h3 className="text-uppercase">Edit Food Item</h3>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <FormInput name="item_name" label="Item Name" register={register} errors={errors} control={control} />
                  
                  <FormInput name="category" label="Category" register={register} errors={errors} control={control} type="select" onChange={(e) => setSelectedCategoryId(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id} selected={item?.category === cat._id}>
                        {cat.category}
                      </option>
                    ))}
                  </FormInput>

                  <FormInput name="subcategory" label="Subcategory" register={register} errors={errors} control={control} type="select">
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id} selected={item?.subcategory === sub._id}>
                        {sub.subcategoryName}
                      </option>
                    ))}
                  </FormInput>

                  <FormInput type="textarea" rows="3" name="item_description" label="Item Description" register={register} errors={errors} control={control} />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <h5 className="text-uppercase mt-0 mb-3">Product Images</h5>
                  
                  {item?.item_image && (
                    <div className="mb-3">
                      <img src={item.item_image} alt="Current Item" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    </div>
                  )}
                  
                  <FileUploader onFileUpload={(files) => setItemImage(files[0])} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body className="text-center">
                  <Button variant="light" className="me-2" onClick={() => navigate("/apps/kitchen/listing")}>Cancel</Button>
                  <Button type="submit" variant="success">Update</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </form>
      )}
    </div>
  );
};

export default EditFoodItem;