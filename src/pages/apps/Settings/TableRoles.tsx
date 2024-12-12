import React from 'react';

interface PermissionsTableProps {
  permissions: Array<{
    module: string;
    add: boolean;
    view: boolean;
    update: boolean;
    delete: boolean;
  }>;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions }) => {
  return (
    <div className="permissions-table">
      <h5 className="header-title">Permissions</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Module</th>
            <th>Add</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={index}>
              <td>{permission.module}</td>
              <td>{permission.add ? 'Yes' : 'No'}</td>
              <td>{permission.view ? 'Yes' : 'No'}</td>
              <td>{permission.update ? 'Yes' : 'No'}</td>
              <td>{permission.delete ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
