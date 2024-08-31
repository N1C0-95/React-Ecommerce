import { NavLink } from "react-router-dom";
import thanksSvg from "../../assets/thanks-page.svg";

export function ThanksPage() {
  return (
    <div>
      
      <div className="flex  items-center justify-center py-10">
        <div className="mx-auto max-w-md overflow-hidden rounded-3xl text-gray-700 shadow-md w-full">
          <div className="h-40 bg-rose-500 pt-10 sm:h-56">
            <img
              className="h-full w-full object-contain"
              src={thanksSvg}
              alt=""
            />
          </div>
          <div className="flex flex-col items-center bg-white px-4 py-10">
            <h2 className="mb-2 text-3xl font-bold text-rose-500 sm:text-4xl">
              THANK YOU
            </h2>
            <p className="mb-8 font-medium text-gray-500">
              Your order is on the way 💸
            </p>
            
              <NavLink to="/catalog" className="btn primary">
                Back to Shop
              </NavLink>
            
          </div>
        </div>
      </div>
    </div>
  );
}
