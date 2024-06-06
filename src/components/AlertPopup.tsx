interface AlertProps {
  text: string
}

const AlertPopup = ({ text }: AlertProps) => {
  return (
    <div
      className="font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100"
      data-dismissible="alert">
      <div className="mr-12">{text}</div>
      <div
        className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
        data-dismissible-target="alert">
        <button
          role="button"
          className="w-max rounded-lg p-1"
          data-alert-dimissible="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default AlertPopup
