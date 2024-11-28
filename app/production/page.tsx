"use client";

import { useState, useEffect } from "react";
import { getAllProducts, createProducts } from "@/lib/service"; // Import des services

function Page() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: null,
    category: '', // Nouvelle propriété pour la catégorie
  });
  
  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response);
    };
    fetchProducts();
  }, []);

  // Ouvrir la modal avec les informations du produit (modifier)
  const openModal = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null, // reset image input
      category : product.category
    });
    setIsModalOpen(true);
  };

  // Ouvrir la modal pour ajouter un nouveau produit
  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: null,
      category: ""
    });
    setIsAddModalOpen(true);
  };

  // Fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setCurrentProduct(null);
  };

  // Gérer la soumission du formulaire pour ajouter ou modifier un produit
  const handleSubmit = async () => {
    try {
      if (isAddModalOpen) {
        // Appeler l'API pour ajouter un produit
        const newProduct: any = await createProducts(formData);
        setProducts([...products, newProduct]); // Ajouter le produit à la liste
      } else if (isModalOpen) {
        // Appeler l'API pour mettre à jour le produit
        const updatedProduct = await updateProduct(currentProduct.id, formData);
        setProducts(
          products.map((product:any) =>
            product.id === currentProduct.id ? updatedProduct : product
          )
        );
      }
      closeModal(); // Fermer la modal après ajout ou modification
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou modification du produit:",
        error
      );
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Gestion des produits</h1>

      <button
        onClick={openAddModal}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-6"
      >
        Ajouter un produit
      </button>

      <table className="mt-6 min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Prix</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Image</th> {/* Nouvelle colonne pour l'image */}
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.price} €</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                ) : (
                  <span>Aucune image</span>
                )}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => openModal(product)}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isAddModalOpen ? "Ajouter un produit" : "Modifier le produit"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du produit
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nom"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prix (€)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Prix"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Stock"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Catégorie"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image du produit
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files?.[0] })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSubmit}
                >
                  {isAddModalOpen ? "Ajouter" : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Page;
