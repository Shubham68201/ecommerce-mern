import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/slices/cartSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import CheckoutSteps from '../../components/cart/CheckoutSteps';
import toast from 'react-hot-toast';

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, shippingInfo } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    address: shippingInfo.address || '',
    city: shippingInfo.city || '',
    state: shippingInfo.state || '',
    country: shippingInfo.country || 'India',
    pinCode: shippingInfo.pinCode || '',
    phoneNo: shippingInfo.phoneNo || '',
  });

  const { address, city, state, country, pinCode, phoneNo } = formData;

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!address || !city || !state || !country || !pinCode || !phoneNo) {
      toast.error('Please fill in all fields');
      return;
    }

    if (pinCode.length !== 6) {
      toast.error('Please enter a valid 6-digit PIN code');
      return;
    }

    if (phoneNo.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    dispatch(saveShippingInfo(formData));
    navigate('/order/confirm');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <CheckoutSteps currentStep={1} />

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shipping Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address */}
            <Input
              label="Address"
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="House No., Street, Area"
              required
            />

            {/* City & State */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="City"
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />

              <Input
                label="State"
                type="text"
                name="state"
                value={state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>

            {/* PIN Code & Country */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="PIN Code"
                type="text"
                name="pinCode"
                value={pinCode}
                onChange={handleChange}
                placeholder="6-digit PIN code"
                maxLength="6"
                pattern="[0-9]{6}"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={country}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNo"
              value={phoneNo}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength="10"
              pattern="[0-9]{10}"
              required
            />

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => navigate('/cart')}
                variant="secondary"
                className="flex-1"
              >
                Back to Cart
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Continue to Confirm Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;