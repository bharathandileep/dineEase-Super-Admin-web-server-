import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Building, Calendar } from 'lucide-react';
import { getEmployeeById } from "../../../server/admin/employeemanagment";


interface Employee {
  _id: string;
  username: string;
  email: string;
  phone_number: string;
  designation: string;
  aadhar_number?: string;
  pan_number?: string;
  employee_status: string;
  profile_picture?: string;
  address: {
    street_address: string;
    city: string;
    district?: string;
    state: string;
    pincode: string;
    country: string;
  };
}


const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (id) {
          const data = await getEmployeeById(id);
          setEmployee(data);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Employee not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-gray-600">
          <li>
            <Link to="/employees" className="hover:text-blue-600">
              Employees
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span>/</span>
            <span className="text-gray-900">{employee.username}</span>
          </li>
        </ol>
      </nav>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              {employee.profile_picture ? (
                <img
                  src={employee.profile_picture}
                  alt={employee.username}
                  className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="h-16 w-16 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {employee.username}
              </h1>
              <div className="flex flex-col space-y-2 text-white/90">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Building className="h-5 w-5" />
                  <span>{employee.designation}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>{employee.phone_number}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                to={`/employees/edit/${employee._id}`}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Aadhaar Number</label>
              <p className="text-gray-900">{employee.aadhar_number}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">PAN Number</label>
              <p className="text-gray-900">{employee.pan_number}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Employee Status</label>
              <span className={`px-2 py-1 text-sm rounded-full ${
                employee.employee_status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {employee.employee_status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Address Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Street Address</label>
              <p className="text-gray-900">{employee.address.street_address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">City</label>
                <p className="text-gray-900">{employee.address.city}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">District</label>
                <p className="text-gray-900">{employee.address.district}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">State</label>
                <p className="text-gray-900">{employee.address.state}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Pincode</label>
                <p className="text-gray-900">{employee.address.pincode}</p>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Country</label>
              <p className="text-gray-900">{employee.address.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;