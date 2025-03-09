const PaymentReceipt = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Payment Receipt</h2>
        <p className="text-gray-700">Here you can view your payment details.</p>
  
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <p><strong>Transaction ID:</strong> #123456789</p>
          <p><strong>Amount Paid:</strong> ₹500</p>
          <p><strong>Date:</strong> March 8, 2025</p>
          <p><strong>Status:</strong> <span className="text-green-600 font-bold">Completed</span></p>
        </div>
      </div>
    );
  };
  
  export default PaymentReceipt;
  