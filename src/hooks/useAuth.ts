// import { useDispatch } from "react-redux";
// import { authTypes, benionMlUrl, requestMethod } from "../../services/helpers";
// import authRequest from "../requests/authRequest";

// const useAuth = () => {
//   const dispatch = useDispatch();

//   const makeAuthRequest = {
//     login: async (user) => {
//       return await authRequest({
//         url: `${benionMlUrl}/auth/login`,
//         method: requestMethod.post,
//         dispatch,
//         type: authTypes.login,
//         data: user,
//       });
//     },
//     register: async (user) => {
//       return await authRequest({
//         url: `${benionMlUrl}/auth/register`,
//         method: requestMethod.post,
//         dispatch,
//         type: authTypes.register,
//         data: user,
//       });
//     },
//     logout: async (token) => {
//       return await authRequest({
//         url: `${benionMlUrl}/auth/logout`,
//         method: requestMethod.post,
//         data: token,
//         dispatch,
//         type: authTypes.logout,
//       });
//     },
//   };
//   return makeAuthRequest;
// };

// export default useAuth;
