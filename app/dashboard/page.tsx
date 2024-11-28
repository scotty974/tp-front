"use client";
import {
  deleteUser,
  getAllUsers,
  editUser,
  getAllProducts,
  deleteProduct,
} from "@/lib/service";
import { useEffect, useState } from "react";

function Page() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // State to store selected user for editing
  const [editData, setEditData] = useState<any>({
    username: "",
    email: "",
    role: "",
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // State for editing products
  const [productData, setProductData] = useState<any>({
    name: "",
    description: "",
    price: 0,
    image: "",
    stock: 0,
    category: "",
  });

  const handleUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    setRefresh(true);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setRefresh(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditData({
      username: user.username,
      email: user.email,
      role: user.role,
      password: user.password,
    });
  };

  const handleSaveUser = async () => {
    if (selectedUser) {
      const updatedUser = await editUser(selectedUser._id, editData);
      setRefresh(true);
      setSelectedUser(null); // Close the edit modal
    }
  };

  const handleCancelUser = () => {
    setSelectedUser(null); // Close the edit modal
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category,
    });
  };

  const handleSaveProduct = async () => {
    if (selectedProduct) {
      const updatedProduct = await editProduct(selectedProduct._id, productData);
      setRefresh(true);
      setSelectedProduct(null); // Close the edit modal
    }
  };

  const handleCancelProduct = () => {
    setSelectedProduct(null); // Close the edit modal
  };

  useEffect(() => {
    handleUsers();
    handleProducts();
  }, [refresh]);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h2 className="font-bold text-3xl text-gray-900 mb-6">
        Dashboard des utilisateurs et produits
      </h2>

      {/* Users Table */}
      <div className="overflow-hidden bg-white shadow rounded-lg mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Nom d'utilisateur
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: any) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {user.username}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.role}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-4 py-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="ml-3 px-4 py-2 text-sm font-medium text-red-500 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-3 px-4 text-center text-sm text-gray-600"
                >
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden bg-white shadow rounded-lg mb-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Nom du produit
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Prix
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Catégorie
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product: any) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {product.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {product.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {product.price}€
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {product.stock}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-4 py-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="ml-3 px-4 py-2 text-sm font-medium text-red-500 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-3 px-4 text-center text-sm text-gray-600"
                >
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Modifier l'utilisateur
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) =>
                    setEditData({ ...editData, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={editData.role}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleCancelUser}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Modifier le produit
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom du produit
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prix (€)
                </label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: parseFloat(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  value={productData.stock}
                  onChange={(e) =>
                    setProductData({ ...productData, stock: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <input
                  type="text"
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleCancelProduct}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Sauvegarder
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
