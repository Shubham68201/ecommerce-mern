import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUser, FiMail, FiCalendar, FiEdit, FiLock, FiShoppingBag } from 'react-icons/fi';
import Button from '../../components/ui/Button';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              {/* Avatar */}
              <div className="mb-4">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-primary-100 flex items-center justify-center border-4 border-primary-200">
                    <FiUser className="text-primary-600" size={64} />
                  </div>
                )}
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user?.name}
              </h2>

              {/* Email */}
              <p className="text-gray-600 mb-4">{user?.email}</p>

              {/* Role Badge */}
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  user?.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
              </span>

              {/* Member Since */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FiCalendar size={16} />
                  <span className="text-sm">
                    Member since{' '}
                    {new Date(user?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details & Actions */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h3>
                <Link to="/profile/update">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FiEdit size={16} />
                    Edit Profile
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-semibold mt-1">
                    {user?.name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <p className="text-gray-900 font-semibold mt-1">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Account Status
                  </label>
                  <p className="text-green-600 font-semibold mt-1">
                    ✓ Active
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* My Orders */}
                <Link
                  to="/orders"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <FiShoppingBag
                        className="text-blue-600 group-hover:text-white"
                        size={24}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        My Orders
                      </h4>
                      <p className="text-sm text-gray-600">View order history</p>
                    </div>
                  </div>
                </Link>

                {/* Update Profile */}
                <Link
                  to="/profile/update"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <FiEdit
                        className="text-green-600 group-hover:text-white"
                        size={24}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Edit Profile
                      </h4>
                      <p className="text-sm text-gray-600">Update your info</p>
                    </div>
                  </div>
                </Link>

                {/* Change Password */}
                <Link
                  to="/password/update"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <FiLock
                        className="text-yellow-600 group-hover:text-white"
                        size={24}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Change Password
                      </h4>
                      <p className="text-sm text-gray-600">Update password</p>
                    </div>
                  </div>
                </Link>

                {/* Admin Dashboard (if admin) */}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                        <FiUser
                          className="text-purple-600 group-hover:text-white"
                          size={24}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Admin Dashboard
                        </h4>
                        <p className="text-sm text-gray-600">Manage store</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;