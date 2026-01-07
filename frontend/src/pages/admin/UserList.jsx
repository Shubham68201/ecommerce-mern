import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import Loader from '../../components/ui/Loader';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiSearch, FiUser } from 'react-icons/fi';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/admin/users');
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/admin/user/${id}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Users Management
          </h1>
          <p className="text-gray-600">
            Manage all registered users ({users?.length || 0} users)
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredUsers && filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      User
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Role
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Joined
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      {/* User */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {user.avatar?.url ? (
                            <img
                              src={user.avatar.url}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <FiUser className="text-primary-600" />
                            </div>
                          )}
                          <p className="font-semibold text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6">
                        <p className="text-gray-900">{user.email}</p>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {user.role === 'admin' ? '👑 Admin' : 'User'}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/admin/user/${user._id}`}>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <FiEdit size={18} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            disabled={user.role === 'admin'}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {searchTerm ? 'No users found' : 'No users yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;