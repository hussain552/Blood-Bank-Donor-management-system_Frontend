import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setError("No email found in localStorage");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("https://blood-bank-donor-management-system.onrender.com/api/profile", {
          params: { emailId: userEmail },
        });

        if (!response.data?.data || response.data.data.length === 0) {
          setError("No profile data found");
        } else {
          setProfileData(response.data.data);
        }
      } catch {
        setError("Failed to fetch profile data");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-red-600 mb-4">
          Donor Profile
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading profile...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : profileData ? (
          <div className="space-y-4">
            {[
              { label: "Name", value: profileData.fullName },
              { label: "Email", value: profileData.emailId },
              { label: "Blood Group", value: profileData.bloodGroup },
              { label: "Phone Number", value: profileData.mobileNumber },
              { label: "Address", value: profileData.address },
              { label: "Last Donation Date", value: formatDate(profileData.postingDate) },
            ].map((field, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-700">{field.label}:</span>
                <span className="text-gray-600">{field.value || "N/A"}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
