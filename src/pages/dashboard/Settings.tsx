import Header from '../../components/layout/Header';

const Settings = () => {
    return (
        <div>
            <Header title="Settings" />
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                <p className="text-gray-500 mt-2">Manage your account preferences and configurations.</p>
            </div>
        </div>
    );
};

export default Settings;
