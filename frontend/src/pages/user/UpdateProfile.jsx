import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearError } from '../../redux/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const { name, email } = formData;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await dispatch(updateProfile({ name, email })).unwrap();
      toast.success('Profile updated successfully!');
      navigate('/profile');
    } /* eslint-disable no-unused-vars */
    catch (err) {
      // Error handled by useEffect
    }
    /* eslint-enable no-unused-vars */

  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Update Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => navigate('/profile')}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="spinner w-5 h-5"></div>
                    Updating...
                  </span>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;