import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [session, setSession] = useState(() => localStorage.getItem("session"));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  async function getUserData() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=9cc80de4dda05e0a37c69fb4ea529c04&session_id=${session}`
      );

      setUser(data);
      const { data: favoritesData } = await axios.get(
        `https://api.themoviedb.org/3/account/${data.id}/favorite/movies?api_key=9cc80de4dda05e0a37c69fb4ea529c04&session_id=${session}`
      );
      setFavoriteMovies(favoritesData.results || []);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  }

  function isMovieFavorite(movieId) {
    return favoriteMovies.some((movie) => movie.id === movieId);
  }

  async function toggleFavorite(movieId) {
    try {
      // تبدیل movieId به عدد برای اطمینان از سازگاری در مقایسه

      const numericMovieId = Number(movieId);

      // بررسی اینکه آیا فیلم در لیست علاقه‌مندی‌ها وجود دارد

      const isFavorite = favoriteMovies.some(
        (movie) => movie.id === numericMovieId
      );

      if (isFavorite) {

        // اگر فیلم در لیست موجود است، آن را حذف کنید

        await axios.post(
          `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=9cc80de4dda05e0a37c69fb4ea529c04&session_id=${session}`,
          {
            media_type: "movie",
            media_id: numericMovieId,
            favorite: false,
          }
        );

        // به‌روزرسانی لیست علاقه‌مندی‌ها در حالت

        setFavoriteMovies((prev) =>
          prev.filter((movie) => movie.id !== numericMovieId)
        );
        console.log(favoriteMovies)
        toast.success(
          <span>
            Movie <span className="text-red-600">removed</span> from
            favorites!);
          </span>
        );
      } else {

        // اگر فیلم در لیست موجود نیست، آن را اضافه کنید

        await axios.post(
          `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=9cc80de4dda05e0a37c69fb4ea529c04&session_id=${session}`,
          {
            media_type: "movie",
            media_id: numericMovieId,
            favorite: true,
          }
        );

        // به‌روزرسانی لیست علاقه‌مندی‌ها با افزودن فیلم جدید

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/account/${user.id}/favorite/movies?api_key=9cc80de4dda05e0a37c69fb4ea529c04&session_id=${session}`
        );
        setFavoriteMovies(data.results || []);
        console.log(favoriteMovies)
        toast.success("Movie added to favorites!");
      }
    } catch (error) {
      console.error("Error toggling movie in favorites:", error);
      toast.error("Failed to update favorite status.");
    }
  }

  useEffect(() => {
    if (session) {
      getUserData();
    }
  }, [session]);

  async function Login(username, password) {
    try {
      console.log(username, "login");

      // گرفتن توکن اولیه

      const tokenResult = await axios.get(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=9cc80de4dda05e0a37c69fb4ea529c04"
      );

      console.log(tokenResult.data.request_token);

      // اعتبارسنجی توکن با نام کاربری و رمز عبور

      const authorize = await axios.post(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=9cc80de4dda05e0a37c69fb4ea529c04",
        {
          username,
          password,
          request_token: tokenResult.data.request_token,
        }
      );

      console.log(authorize.data);

      // اگر ورود موفقیت آمیز بود، کاربر را در state ذخیره کنید

      setUser({
        username,
        token: authorize.data.request_token,

        // هر اطلاعات دیگری که نیاز دارید می‌توانید اینجا ذخیره کنید

      });
      const session = await axios.post(
        "https://api.themoviedb.org/3/authentication/session/new?api_key=9cc80de4dda05e0a37c69fb4ea529c04",
        {
          request_token: authorize.data.request_token,
        }
      );
      setSession(session.data.session_id);
      localStorage.setItem("session", session.data.session_id);
      toast.success("Successfully Login.");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with a status:", error.response.status);
        toast.error(`Error: ${error.response.data.status_message}`);
      } else if (error.request) {
        console.error("Request was made but no response:", error.request);
        toast.error("No response from server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error("Error during login. Please try again.");
      }
    }
  }

  function LogOutHandler() {
    setUser({});
    setSession(null);
    localStorage.removeItem("session");
    toast.success("Successfully logged out.");
    navigate("/login");
  }
  return (
    <UserContext.Provider
      value={{
        user,
        Login,
        session,
        LogOutHandler,
        favoriteMovies,
        toggleFavorite,
        isMovieFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
