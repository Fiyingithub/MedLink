import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  FileText,
  Bell,
  Navigation,
} from "lucide-react";

const UpcomingAppointmentCard = () => {
  const appointment = {
    id: 1,
    doctorName: "Dr. Sarah Martinez",
    specialty: "Cardiologist",
    date: "2025-05-30",
    time: "2:30 PM",
    duration: "45 min",
    type: "Follow-up Consultation",
    location: {
      name: "Heart & Wellness Center",
      address: "1234 Medical Plaza, Suite 205",
      city: "San Francisco, CA 94102",
    },
    phone: "(555) 123-4567",
    notes:
      "Please bring your recent blood work results and current medication list",
    reminderSet: true,
    canReschedule: true,
    status: "pending",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const appointmentDate = new Date(dateString);
    const diffTime = appointmentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    return `In ${Math.ceil(diffDays / 7)} week${
      Math.ceil(diffDays / 7) > 1 ? "s" : ""
    }`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="">
      {/* Header with countdown */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Next Appointment</h2>
            <p className=" text-sm">{getDaysUntil(appointment.date)}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              appointment.status
            )} `}
          >
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-5">
        {/* Doctor info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {appointment.doctorName}
            </h3>
            <p className="text-sm text-gray-600">{appointment.specialty}</p>
          </div>
        </div>

        {/* Appointment details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">
                {formatDate(appointment.date)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">{appointment.time}</p>
              <p className="text-sm text-gray-600">
                {appointment.duration} • {appointment.type}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                {appointment.location.name}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.location.address}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.location.city}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <p className="text-gray-900">{appointment.phone}</p>
          </div>
        </div>

        {/* Special notes */}
        {appointment.notes && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <FileText className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 mb-1">
                  Preparation Notes
                </p>
                <p className="text-sm text-amber-700">{appointment.notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reminder status */}
        {appointment.reminderSet && (
          <div className="flex items-center space-x-2 text-sm text-green-600 mb-4">
            <Bell className="w-4 h-4" />
            <span>Reminder set for 1 hour before</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col space-y-2">
          <button className="flex-1 cursor-pointer bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </button>

          {appointment.canReschedule && (
            <button className="flex-1 cursor-pointer border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Reschedule
            </button>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span>Call Office</span>
          </button>

          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;
