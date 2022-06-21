const getFloorFromAddress = (address) => {
  if (address?.toLowerCase().includes("floor")) {
    const separatedByComa = address.split(",");

    return {
      modifiedAddress: separatedByComa.slice(0, -1),
      floorInfo: separatedByComa.pop(),
    };
  }

  return { modifiedAddress: address };
};

export default getFloorFromAddress;
