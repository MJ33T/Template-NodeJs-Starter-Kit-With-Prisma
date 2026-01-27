// dependencies.js
let ioInstance;

const setIoInstance = (io) => {
  ioInstance = io;
};

const getIoInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.io instance not set!");
  }
  return ioInstance;
};

export { getIoInstance, setIoInstance };
