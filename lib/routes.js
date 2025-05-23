const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/v1"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const Routes = {
  API: {
    USERS: {
      GET_ALL: `${API_BASE_URL}/users`,
      GET_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
      CREATE: `${API_BASE_URL}/users`,
      UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
      DELETE: (id) => `${API_BASE_URL}/users/${id}`,
    },
  },
  Pages: {
    SignIn: "/sign-in",
    SignUp: "/sign-up",
    ResetPassword: "/reset-password",
    App: {
      Home: "/app",
      User: {
        Settings: "/app/profile/settings",
      },
    },
    Auth: {},
  },
}

Routes.Pages.Auth.CallBackURL = BASE_URL + Routes.Pages.App.Home;
Routes.Pages.Auth.RedirectTo = BASE_URL + Routes.Pages.ResetPassword;
