const pointsSite = {
  // custumer auth 
  register: "/Authenticate/CustumerRegister",
  // site points
  getTypesTree: "/Site/getTypesTree",
  getCategoriesTree: "/Site/GetCategories",
  getProduct: "/Site/GetProduct",
  getProducts: "/Site/GetProducts",
  // site points
  getUser: "/SiteUser/GetUser",
  rePassword: "/SiteUser/Repassword",
  unActivateUser: "/SiteUser/UnActivateUser",
  updateProfile: "/SiteUser/UpdateProfile",
  verifyMail: "/SiteUser/VerifyMail",
  getCompanyProfile: "/Site/GetCompanyProfile",
  // custumer points
  custumerSite_sendOrder: "/CustumerSite/SendOrder",
  custumerSite_getUserOrders: "/CustumerSite/GetOrders",
  custumerSite_checkOrder: "/CustumerSite/CheckOrder",
  custumerSite_confirmOrder: "/CustumerSite/SendOrder",
  custumerSite_getItemInTheSella: "/CustumerSite/GetUserOrder",
  custumerSite_CraseInOrder: "/CustumerSite/CraseInOrder",
  custumerSite_DecreaseInOrder: "/CustumerSite/DeCraseInOrder",
  custumerSite_AddOrderItem: "/CustumerSite/AddOrderItem",
  custumerSite_AddOrderItems: "/CustumerSite/AddOrderItems",
  custumerSite_DecrementOrderItem: "/CustumerSite/DecrementOrderItem",
  custumerSite_RemoveOrderItem: "/CustumerSite/RemoveOrderItem",
  custumerSite_getFavorite: "/CustumerSite/GetFavorites",
  custumerSite_favorite: "/CustumerSite/Favorite",
  custumerSite_Comment: "/CustumerSite/Comment",
  custumerSite_Rate: "/CustumerSite/Rate",
  // custumer location
  custumerSite_getUserLocation: "/Location/GetUserLocations",
  custumerSite_deleteUserLocation: "/Location/DeleteUserLocation",
  custumerSite_addUpdateUserLocation: "/Location/AddUpdateLocation",
};

export default pointsSite;
