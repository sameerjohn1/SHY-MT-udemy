import { message, Modal } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteNotifications } from "../apiCalls/notifications";
import { SetLoader } from "../redux/loadersSlice";
// import Divider from "./Divider";

const Notifications = ({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotifcation = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotifications(id);
      dispatch(SetLoader(false));

      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => {
          return (
            <div
              className="flex flex-col border border-solid p-2 border-gray-300 rounded cursor-pointer"
              key={notification._id}
            >
              <div className="flex justify-between items-center">
                <div
                  onClick={() => {
                    navigate(notification.onClick);
                    setShowNotifications(false);
                  }}
                >
                  <h1>{notification.title}</h1>
                  {/* <Divider /> */}
                  <span className="text-gray-600">{notification.message}</span>
                  <h1 className="text-gray-500 text-sm">
                    {moment(notification.createdAt).fromNow()}
                  </h1>
                </div>
                <i
                  className="ri-delete-bin-line"
                  onClick={() => {
                    deleteNotifcation(notification._id);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default Notifications;
