import React, { useState, useEffect } from "react";
import { Bell, AlertTriangle, Calendar, Info } from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";

const NotificationItem = ({ notification, onRead }) => {
  const getIcon = () => {
    const type = notification.type?.toLowerCase() || "";

    if (type.includes("alert")) return <AlertTriangle className="text-red-500" size={20} />;
    if (type.includes("reminder")) return <Calendar className="text-blue-500" size={20} />;
    if (type.includes("outage")) return <Info className="text-yellow-500" size={20} />;
    
    return <Bell className="text-gray-500" size={20} />; // Default icon
  };

  return (
    <div
      className={`p-4 rounded-lg mb-4 transition-all ${
        notification.read ? "bg-gray-50 dark:bg-gray-800" : "bg-blue-50 dark:bg-blue-900/20 shadow-md"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p className={`font-medium ${notification.read ? "text-gray-600 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
              {notification.message}
            </p>
            {!notification.read && (
              <button
                onClick={() => onRead(notification._id)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Mark as read
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/notification/unread", { withCredentials: true });
        
        console.log("API Response:", response.data); // Debugging: Check received data
        //console.log(response.data.message)
        setNotifications(Array.isArray(response.data.message) ? response.data.message : []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setNotifications([]);
        setError("Failed to load notifications.");
      }
    };

    fetchUnreadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/notification/${id}/read`, {}, { withCredentials: true });

      // Update state by removing the read notification
      setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError("Failed to update notification.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h1>
          <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
            {notifications.length} unread
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="max-w-3xl mx-auto">
        {console.log(notifications.length)}
          {notifications.length > 0 ? (
            
            notifications.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} onRead={handleMarkAsRead} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">No new notifications</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
