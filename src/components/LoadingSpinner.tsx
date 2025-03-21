import Spinner from "../assets/svg/spinner.svg";

export default function LoadingSpinner() {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <img src={Spinner} alt="Loading Spinner" />
    </div>
  );
}
