export const firstCapital = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDocumentName = (str: string) => {
  const documentName = str.split("_");
  const document = documentName.map((document) => firstCapital(document));
  return document.join(" ");
};

export const convertMobileNumber = (mobileNo: string) => {
  if (mobileNo.length === 10) {
    return `(${mobileNo.slice(0, 3)}) ${mobileNo.slice(3, 6)}-${mobileNo.slice(
      6
    )}`;
  } else if (mobileNo.length === 11 && mobileNo[0] === "+")
    return `(${mobileNo.slice(1, 4)}) ${mobileNo.slice(4, 7)}-${mobileNo.slice(
      7
    )}`;
  else return mobileNo;
};

export const renderColor = (str: string) => {
  switch (str) {
    case "missing":
      return "#1976D2";
    case "inProgress":
      return "#ED6C02";
    case "underReview":
      return "#2E7D32";
    default:
      return "#1976D2";
  }
};
