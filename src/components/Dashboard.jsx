// src/App.jsx
import React, { useState } from 'react';

function Dashboard() {
  const [showApplicants, setShowApplicants] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreditCheckModal, setShowCreditCheckModal] = useState(false);
  const [creditCheckLoading, setCreditCheckLoading] = useState(false);
  const [creditCheckResult, setCreditCheckResult] = useState(null);

  const stats = [
    { title: 'Total Loans', value: '0' },
    { title: 'Pending Review', value: '0' },
    { title: 'Approved', value: '0' },
    { title: 'Creditworthy Applicants', value: '4' }
  ];

  const applicants = [
    {
      id: '#52',
      applicant: 'N/A',
      employmentInfo: {
        company: 'PayskulApp',
        department: 'Customer Service',
        state: 'Lagos',
        designation: 'Customer Service Representative'
      },
      loanDetails: {
        amount: '₦35,000',
        tenor: '6 months'
      },
      status: 'PENDING',
      date: '8/27/2025',
      canAfford: false
    },
    {
      id: '#47',
      applicant: 'ese@gmail.com',
      employmentInfo: {
        company: 'Payskul',
        department: 'Tech',
        state: 'Delta',
        designation: 'Mobile'
      },
      loanDetails: {
        amount: '₦10,000',
        tenor: '9 months'
      },
      status: 'OFFER MADE',
      date: '8/26/2025',
      canAfford: false
    },
    {
      id: '#46',
      applicant: 'michael@payskul.com',
      employmentInfo: {
        company: 'Adegoke',
        department: 'Tech',
        state: 'remote',
        designation: 'CTO'
      },
      loanDetails: {
        amount: '₦40,000',
        tenor: '6 months'
      },
      status: 'NEEDS REVIEW',
      date: '8/25/2025',
      canAfford: false
    },
    {
      id: '#41',
      applicant: 'N/A',
      employmentInfo: {
        company: 'Teerifix',
        department: 'management',
        state: 'Lagos',
        designation: 'director'
      },
      loanDetails: {
        amount: '₦410,000',
        tenor: '6 months'
      },
      status: 'OFFER MADE',
      date: '8/21/2025',
      canAfford: false
    }
  ];

  // Helper function for status colors
  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'OFFER MADE': return 'bg-green-100 text-green-800';
      case 'NEEDS REVIEW': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLoadApplicants = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowApplicants(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  const handleCreditCheck = (applicantId) => {
    setSelectedApplicant(applicants.find(app => app.id === applicantId));
    setShowCreditCheckModal(true);
    setCreditCheckLoading(true);
    setCreditCheckResult(null);
    
    // Simulate credit check process
    setTimeout(() => {
      setCreditCheckLoading(false);
      const results = [
        { status: 'success', message: 'Credit check passed! Applicant meets all criteria.' },
        { status: 'warning', message: 'Credit check requires manual review.' },
        { status: 'error', message: 'Credit check failed. Applicant does not meet requirements.' }
      ];
      setCreditCheckResult(results[Math.floor(Math.random() * results.length)]);
    }, 3000);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Add actual logout logic here
    console.log('User logged out');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplicant(null);
  };

  const closeCreditCheckModal = () => {
    setShowCreditCheckModal(false);
    setCreditCheckLoading(false);
    setCreditCheckResult(null);
    setSelectedApplicant(null);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-900 rounded-xl p-6 mb-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold">Payskul Interfacing Dashboard</div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="font-medium">Welcome pygod!</div>
              <button 
                onClick={handleLogout}
                className="opacity-90 hover:opacity-100 text-sm hover:text-red-300 cursor-pointer border-l border-white border-opacity-30 pl-4"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <div className="flex justify-between items-start">
          <div>
            <div className="text-4xl font-bold">Payskul Interfacing Dashboard</div>
            <div className="mt-4 opacity-90 text-gray-500">Manage loan applications and creditworthy applicants</div>
          </div>
        </div>
      </div>

      {/* Stats Grid with Soft Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-gray-600 text-sm mt-1">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Creditworthy Applicants Section - Fixed Layout */}
      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <div className="text-lg font-semibold text-gray-800">Creditworthy Applicants</div>
          {!showApplicants && (
            <button
              onClick={handleLoadApplicants}
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r cursor-pointer active:scale-95 from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center space-x-2 text-sm font-medium transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <span>Load All</span>
              )}
            </button>
          )}
        </div>
        
        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto">
          {/* Table Header - Fixed */}
          <div className="min-w-[1200px]">
            {/* Table Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Applicant</div>
                <div className="col-span-3">Employment Info</div>
                <div className="col-span-2">Loan Details</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Applicant Rows - Fixed */}
            <div className="divide-y divide-gray-100">
              {/* First Applicant - Always Visible */}
              <div className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <span className="font-medium text-gray-800 text-sm">#52</span>
                  </div>
                  
                  <div className="col-span-2">
                    <span className="text-gray-700 text-sm">N/A</span>
                  </div>
                  
                  <div className="col-span-3 space-y-1">
                    <div className="font-medium text-gray-800 text-sm">PayskulApp</div>
                    <div className="text-gray-600 text-xs">Dept: Customer Service</div>
                    <div className="text-gray-600 text-xs">State: Lagos</div>
                    <div className="text-gray-600 text-xs">Designation: Customer Service Representative</div>
                  </div>
                  
                  <div className="col-span-2 space-y-1">
                    <div className="text-gray-800 text-sm">Amount: ₦35,000</div>
                    <div className="text-gray-600 text-xs">Tenor: 6 months</div>
                    <div className="flex items-center text-gray-600 text-xs">
                      Can Afford: <span className="ml-1 text-red-500">❌ No</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      PENDING
                    </span>
                    <button 
                      onClick={() => handleCreditCheck('#52')}
                      className="block w-full text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 bg-green-50 rounded hover:bg-green-100 transition-colors"
                    >
                      CREDIT CHECK
                    </button>
                  </div>
                  
                  <div className="col-span-1">
                    <span className="text-gray-700 text-sm">8/27/2025</span>
                  </div>
                  
                  <div className="col-span-1">
                    <button 
                      onClick={() => handleViewDetails(applicants[0])}
                      className="w-full text-blue-600 hover:text-blue-800 cursor-pointer active:scale-95 text-xs font-medium px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Other Applicants - Show after loading */}
              {showApplicants && applicants.slice(1).map((applicant) => (
                <div key={applicant.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <span className="font-medium text-gray-800 text-sm">{applicant.id}</span>
                    </div>
                    
                    <div className="col-span-2">
                      <span className="text-gray-700 text-sm">{applicant.applicant}</span>
                    </div>
                    
                    <div className="col-span-3 space-y-1">
                      <div className="font-medium text-gray-800 text-sm">{applicant.employmentInfo.company}</div>
                      <div className="text-gray-600 text-xs">Dept: {applicant.employmentInfo.department}</div>
                      <div className="text-gray-600 text-xs">State: {applicant.employmentInfo.state}</div>
                      <div className="text-gray-600 text-xs">Designation: {applicant.employmentInfo.designation}</div>
                    </div>
                    
                    <div className="col-span-2 space-y-1">
                      <div className="text-gray-800 text-sm">Amount: {applicant.loanDetails.amount}</div>
                      <div className="text-gray-600 text-xs">Tenor: {applicant.loanDetails.tenor}</div>
                      <div className="flex items-center text-gray-600 text-xs">
                        Can Afford: <span className="ml-1 text-red-500">❌ No</span>
                      </div>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(applicant.status)}`}>
                        {applicant.status}
                      </span>
                      {applicant.status === 'PENDING' && (
                        <button
                          onClick={() => handleCreditCheck(applicant.id)}
                          className="block w-full text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 bg-green-50 rounded hover:bg-green-100 transition-colors"
                        >
                          CREDIT CHECK
                        </button>
                      )}
                    </div>
                    
                    <div className="col-span-1">
                      <span className="text-gray-700 text-sm">{applicant.date}</span>
                    </div>
                    
                    <div className="col-span-1">
                      <button
                        onClick={() => handleViewDetails(applicant)}
                        className="w-full text-blue-600 hover:text-blue-800 cursor-pointer active:scale-95 text-xs font-medium px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        localhost:8000/dashboard/
      </div>

      {/* Applicant Details Modal */}
      {showModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Applicant Details - {selectedApplicant.id}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong className="text-gray-700">Applicant ID:</strong> <span className="text-gray-600">{selectedApplicant.id}</span></div>
                    <div><strong className="text-gray-700">Email:</strong> <span className="text-gray-600">{selectedApplicant.applicant}</span></div>
                    <div><strong className="text-gray-700">Application Date:</strong> <span className="text-gray-600">{selectedApplicant.date}</span></div>
                    <div><strong className="text-gray-700">Status:</strong> <span className="text-gray-600">{selectedApplicant.status}</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Employment Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong className="text-gray-700">Company:</strong> <span className="text-gray-600">{selectedApplicant.employmentInfo.company}</span></div>
                    <div><strong className="text-gray-700">Department:</strong> <span className="text-gray-600">{selectedApplicant.employmentInfo.department}</span></div>
                    <div><strong className="text-gray-700">State:</strong> <span className="text-gray-600">{selectedApplicant.employmentInfo.state}</span></div>
                    <div><strong className="text-gray-700">Designation:</strong> <span className="text-gray-600">{selectedApplicant.employmentInfo.designation}</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Loan Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong className="text-gray-700">Amount:</strong> <span className="text-gray-600">{selectedApplicant.loanDetails.amount}</span></div>
                    <div><strong className="text-gray-700">Tenor:</strong> <span className="text-gray-600">{selectedApplicant.loanDetails.tenor}</span></div>
                    <div><strong className="text-gray-700">Can Afford:</strong> <span className="text-red-500">No</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Additional Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong className="text-gray-700">Credit Check:</strong> <span className="text-gray-600">Pending</span></div>
                    <div><strong className="text-gray-700">Risk Level:</strong> <span className="text-gray-600">Medium</span></div>
                    <div><strong className="text-gray-700">Recommendation:</strong> <span className="text-gray-600">Needs Review</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 cursor-pointer active:scale-95 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-xl">!</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Confirm Logout</h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeLogoutModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Check Modal */}
      {showCreditCheckModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Credit Check - {selectedApplicant.id}
                </h2>
                <button
                  onClick={closeCreditCheckModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {creditCheckLoading ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Running comprehensive credit check...</p>
                  <p className="text-sm text-gray-500 mt-2">Checking credit history, income verification, and employment status</p>
                </div>
              ) : creditCheckResult ? (
                <div className="text-center py-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    creditCheckResult.status === 'success' ? 'bg-green-100' :
                    creditCheckResult.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-2xl ${
                      creditCheckResult.status === 'success' ? 'text-green-600' :
                      creditCheckResult.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {creditCheckResult.status === 'success' ? '✓' : 
                       creditCheckResult.status === 'warning' ? '!' : '✗'}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    creditCheckResult.status === 'success' ? 'text-green-600' :
                    creditCheckResult.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {creditCheckResult.status === 'success' ? 'Credit Check Passed' :
                     creditCheckResult.status === 'warning' ? 'Manual Review Required' : 'Credit Check Failed'}
                  </h3>
                  <p className="text-gray-600 mb-6">{creditCheckResult.message}</p>
                  <button
                    onClick={closeCreditCheckModal}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;