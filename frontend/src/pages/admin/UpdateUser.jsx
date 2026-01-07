import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import toast from 'react-hot-toast';
import { FiUser, FiUpload } from 'react-icons/fi';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (user?.avatar?.url) {
      setAvatarPreview(user.avatar.url);
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const { data } = await API.get(`/admin/user/${id}`);
      setUser(data.user);
      setFormData({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch user');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setUpdating(true);

    try {
      const updateData = { ...formData };

      // Add avatar if changed
      if (avatar) {
        updateData.avatar = {
          public_id: user?.avatar?.public_id || `avatar_${Date.now()}`,
          url: avatar,
        };
      }

      await API.put(`/admin/user/${id}`, updateData);
      toast.success('User updated successfully');
      navigate('/admin/users');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Update User
          </h1>
          <p className="text-gray-600">
            Modify user information and permissions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                {/* Avatar with Upload */}
                <div className="mb-4">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt={user.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-100"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full mx-auto bg-primary-100 flex items-center justify-center border-4 border-gray-100">
                      <FiUser className="text-primary-600" size={48} />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="admin-avatar-upload"
                  />
                  <label
                    htmlFor="admin-avatar-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700 transition-colors text-sm"
                  >
                    <FiUpload size={16} />
                    Change Photo
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG or GIF (Max 5MB)
                  </p>
                </div>

                {/* Current Info */}
                <div className="space-y-3 text-left">
                  <div>
                    <p className="text-sm text-gray-600">Current Name</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Email</p>
                    <p className="font-semibold text-gray-900 break-all">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Role</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role === 'admin' ? '👑 Admin' : 'User'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User ID</p>
                    <p className="text-xs text-gray-900 font-mono break-all">
                      {user._id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Card */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Warning:</strong> Changing a user's role or avatar will
                    immediately affect their account.
                  </p>
                </div>
              </div>
            </div>

            {/* View Activity Button */}
            <div className="mt-6">
              <Link
                to={`/admin/user/${id}/activity`}
                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View User Activity
              </Link>
            </div>
          </div>

          {/* Update Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Update User Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter user's full name"
                  required
                />

                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter user's email"
                  required
                />

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>User:</strong> Can browse, purchase, and manage their own orders
                    <br />
                    <strong>Admin:</strong> Full access to all management features
                  </p>
                </div>

                {/* Role Change Warning */}
                {formData.role !== user.role && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-blue-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>Role Change Detected:</strong> You are changing
                          this user's role from{' '}
                          <span className="font-semibold">{user.role}</span> to{' '}
                          <span className="font-semibold">{formData.role}</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => navigate('/admin/users')}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={updating}
                    className="flex-1"
                  >
                    {updating ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="spinner w-5 h-5"></div>
                        Updating...
                      </span>
                    ) : (
                      'Update User'
                    )}
                  </Button>
                </div>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Additional Information
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    • Users will be notified of any changes to their account via
                    email
                  </p>
                  <p>
                    • Password cannot be changed from this interface. Users must
                    reset their own passwords
                  </p>
                  <p>
                    • Admin roles have full access to the admin dashboard and all
                    management features
                  </p>
                  <p>
                    • Changes take effect immediately after saving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;