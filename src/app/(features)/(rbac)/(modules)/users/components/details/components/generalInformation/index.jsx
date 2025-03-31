const GeneralInformation = ({ details }) => {
    return (
        <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">General Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-1 gap-3">
                    <InfoField label="Permission Name" value={details.name} />
                    <InfoField label="Permission Group" value={details.permissionGroup} valueClassName="text-blue-600" />
                    <InfoField label="Description" value={details.description} />
                    <InfoField label="Created By" value={details.createdBy} />
                    <InfoField label="Last Updated" value={details.lastUpdatedBy} />
                </div>
            </div>
        </div>
    );
};

const InfoField = ({ label, value, valueClassName = "text-gray-800" }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-sm font-medium ${valueClassName}`}>{value}</p>
    </div>
);

export default GeneralInformation;
