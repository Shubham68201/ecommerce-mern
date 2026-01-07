import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearError } from '../../redux/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { oldPassword, newPassword, confirmPassword } = formData;

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

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await dispatch(updatePassword({ oldPassword, newPassword })).unwrap();
      toast.success('Password updated successfully!');
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
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <Input
              label="Current Password"
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
            />

            {/* New Password */}
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />

            {/* Confirm Password */}
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />

            {/* Password Requirements */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">
                Password Requirements:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Must match confirmation password</li>
              </ul>
            </div>

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
                  'Update Password'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;