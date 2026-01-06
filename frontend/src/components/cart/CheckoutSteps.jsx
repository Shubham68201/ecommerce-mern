import { FiCheck } from 'react-icons/fi';

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Shipping', path: '/shipping' },
    { number: 2, title: 'Confirm Order', path: '/order/confirm' },
    { number: 3, title: 'Payment', path: '/payment' },
  ];

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                step.number < currentStep
                  ? 'bg-green-500 text-white'
                  : step.number === currentStep
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step.number < currentStep ? (
                <FiCheck size={24} />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step.number <= currentStep
                  ? 'text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-4 transition-colors ${
                step.number < currentStep
                  ? 'bg-green-500'
                  : step.number === currentStep
                  ? 'bg-primary-600'
                  : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;