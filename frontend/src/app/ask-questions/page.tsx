const Dashboard = () => {
    return (
        <div className="flex flex-1 flex-col w-full">
            <div className="container flex flex-1 flex-col gap-2 w-full">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* Welcome Message */}
                    <div className="px-4 lg:px-6 w-full">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome to Ask Questions
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here you can view and manage your account details. 
                        </p>
                    </div>

                    {/* User Details Placeholder */}
                    <div className="px-4 lg:px-6 w-full">
                        <div className="bg-white shadow-md rounded-lg p-4 w-full">
                            <h2 className="text-xl font-semibold text-gray-700">
                                User Details
                            </h2>
                            <p className="text-gray-600 mt-2">Username: [Sample Username]</p>
                            <p className="text-gray-600">Email: [Sample Email]</p>
                            <p className="text-gray-600">First Name: [Sample First Name]</p>
                            <p className="text-gray-600">Last Name: [Sample Last Name]</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
