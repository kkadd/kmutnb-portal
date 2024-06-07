import * as React from "react";

export const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.5 14H14.71L14.43 13.73C15.4439 12.554 16.0011 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23192 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99477 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00282 10.7997 3.49479 11.9874C3.98676 13.1752 4.81988 14.1903 5.8888 14.9046C6.95772 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
      fill="currentColor"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    />
  </svg>
);

export const HomeIcon = () => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" fill="currentColor" />
  </svg>
);

export const ServiceIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M16 0H1.99C0.89 0 0 0.9 0 2L0.00999999 16C0.00999999 17.1 0.9 18 2 18H12L18 12V2C18 0.9 17.1 0 16 0ZM4 5H14V7H4V5ZM9 11H4V9H9V11ZM11 16.5V11H16.5L11 16.5Z"
        fill="#969696"
      />
    </svg>
  );
};

export const StaffIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10.5 21C10.5 21 9 21 9 19.5C9 18 10.5 13.5 16.5 13.5C22.5 13.5 24 18 24 19.5C24 21 22.5 21 22.5 21H10.5ZM16.5 12C17.6935 12 18.8381 11.5259 19.682 10.682C20.5259 9.83807 21 8.69347 21 7.5C21 6.30653 20.5259 5.16193 19.682 4.31802C18.8381 3.47411 17.6935 3 16.5 3C15.3065 3 14.1619 3.47411 13.318 4.31802C12.4741 5.16193 12 6.30653 12 7.5C12 8.69347 12.4741 9.83807 13.318 10.682C14.1619 11.5259 15.3065 12 16.5 12Z"
        fill="#969696"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.824 20.9999C7.60163 20.5316 7.49073 20.0182 7.5 19.4999C7.5 17.4674 8.52 15.3749 10.404 13.9199C9.46364 13.6302 8.48392 13.4885 7.5 13.4999C1.5 13.4999 0 17.9999 0 19.4999C0 20.9999 1.5 20.9999 1.5 20.9999H7.824Z"
        fill="#969696"
      />
      <path
        d="M6.75 12C7.74456 12 8.69839 11.6049 9.40165 10.9017C10.1049 10.1984 10.5 9.24456 10.5 8.25C10.5 7.25544 10.1049 6.30161 9.40165 5.59835C8.69839 4.89509 7.74456 4.5 6.75 4.5C5.75544 4.5 4.80161 4.89509 4.09835 5.59835C3.39509 6.30161 3 7.25544 3 8.25C3 9.24456 3.39509 10.1984 4.09835 10.9017C4.80161 11.6049 5.75544 12 6.75 12Z"
        fill="#969696"
      />
    </svg>
  );
};

export const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z"
        fill="#969696"
      />
    </svg>
  );
};

export const AddIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
    </svg>
  );
};

export const SortIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.123 8.44345L14.496 10.5H12.897L15.5805 2.50195H17.4315L20.103 10.5H18.423L17.7945 8.44345H15.123ZM17.478 7.26595L16.5 4.03045H16.4295L15.4515 7.26595H17.478Z"
        fill="#FF644B"
      />
      <path
        d="M19.44 21H13.542V19.9635L17.4105 14.3835V14.3025H13.647V13.002H19.3245V14.0385L15.474 19.6185V19.6995H19.4415V21H19.44ZM6.75 3.75C6.75 3.55109 6.67098 3.36032 6.53033 3.21967C6.38968 3.07902 6.19891 3 6 3C5.80109 3 5.61032 3.07902 5.46967 3.21967C5.32902 3.36032 5.25 3.55109 5.25 3.75V18.4395L3.531 16.719C3.46127 16.6493 3.37849 16.594 3.28738 16.5562C3.19627 16.5185 3.09862 16.4991 3 16.4991C2.90139 16.4991 2.80374 16.5185 2.71263 16.5562C2.62152 16.594 2.53873 16.6493 2.469 16.719C2.39927 16.7887 2.34395 16.8715 2.30622 16.9626C2.26848 17.0537 2.24905 17.1514 2.24905 17.25C2.24905 17.3486 2.26848 17.4463 2.30622 17.5374C2.34395 17.6285 2.39927 17.7113 2.469 17.781L5.469 20.7795L5.4795 20.79C5.62032 20.9273 5.80968 21.0034 6.00635 21.0017C6.20303 21 6.39106 20.9207 6.5295 20.781L9.5295 17.781C9.67033 17.6404 9.74953 17.4496 9.74967 17.2505C9.74981 17.0515 9.67088 16.8606 9.53025 16.7197C9.38962 16.5789 9.1988 16.4997 8.99978 16.4996C8.80076 16.4994 8.60983 16.5784 8.469 16.719L6.75 18.4395V3.75Z"
        fill="#FF644B"
      />
    </svg>
  );
};

export const UploadIcon = () => {
  return (
    <svg
      width="25"
      height="18"
      viewBox="0 0 27 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.9713 13.75V17.5H3.83198V13.75H0.64209V17.5C0.64209 18.875 2.07754 20 3.83198 20H22.9713C24.7258 20 26.1612 18.875 26.1612 17.5V13.75H22.9713ZM5.42693 6.25L7.6758 8.0125L11.8067 4.7875V15H14.9966V4.7875L19.1275 8.0125L21.3764 6.25L13.4017 0L5.42693 6.25Z"
        fill="#71717A"
      />
    </svg>
  );
};

export const DeleteIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const WarningIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.473 2.34893C13.3245 2.09027 13.1104 1.87538 12.8523 1.72594C12.5942 1.5765 12.3013 1.4978 12.003 1.4978C11.7048 1.4978 11.4118 1.5765 11.1537 1.72594C10.8956 1.87538 10.6815 2.09027 10.533 2.34893L0.24751 19.8494C-0.43799 21.0164 0.38401 22.4999 1.71751 22.4999H22.287C23.6205 22.4999 24.444 21.0149 23.757 19.8494L13.473 2.34893ZM12 7.49993C12.8025 7.49993 13.431 8.19293 13.35 8.99243L12.825 14.2529C12.8074 14.4596 12.7128 14.6521 12.56 14.7924C12.4073 14.9327 12.2074 15.0105 12 15.0105C11.7926 15.0105 11.5927 14.9327 11.44 14.7924C11.2872 14.6521 11.1926 14.4596 11.175 14.2529L10.65 8.99243C10.6312 8.80378 10.652 8.61327 10.7113 8.43318C10.7705 8.25308 10.8668 8.0874 10.994 7.94679C11.1212 7.80619 11.2764 7.69379 11.4497 7.61682C11.623 7.53985 11.8104 7.50003 12 7.49993ZM12.003 16.4999C12.4008 16.4999 12.7824 16.658 13.0637 16.9393C13.345 17.2206 13.503 17.6021 13.503 17.9999C13.503 18.3978 13.345 18.7793 13.0637 19.0606C12.7824 19.3419 12.4008 19.4999 12.003 19.4999C11.6052 19.4999 11.2237 19.3419 10.9424 19.0606C10.661 18.7793 10.503 18.3978 10.503 17.9999C10.503 17.6021 10.661 17.2206 10.9424 16.9393C11.2237 16.658 11.6052 16.4999 12.003 16.4999Z"
        fill="#FF644B"
      />
    </svg>
  );
};

export const AddStaffIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 21C1.5 21 0 21 0 19.5C0 18 1.5 13.5 9 13.5C16.5 13.5 18 18 18 19.5C18 21 16.5 21 16.5 21H1.5ZM9 12C10.1935 12 11.3381 11.5259 12.182 10.682C13.0259 9.83807 13.5 8.69347 13.5 7.5C13.5 6.30653 13.0259 5.16193 12.182 4.31802C11.3381 3.47411 10.1935 3 9 3C7.80653 3 6.66193 3.47411 5.81802 4.31802C4.97411 5.16193 4.5 6.30653 4.5 7.5C4.5 8.69347 4.97411 9.83807 5.81802 10.682C6.66193 11.5259 7.80653 12 9 12Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.25 7.5C20.4489 7.5 20.6397 7.57902 20.7803 7.71967C20.921 7.86032 21 8.05109 21 8.25V10.5H23.25C23.4489 10.5 23.6397 10.579 23.7803 10.7197C23.921 10.8603 24 11.0511 24 11.25C24 11.4489 23.921 11.6397 23.7803 11.7803C23.6397 11.921 23.4489 12 23.25 12H21V14.25C21 14.4489 20.921 14.6397 20.7803 14.7803C20.6397 14.921 20.4489 15 20.25 15C20.0511 15 19.8603 14.921 19.7197 14.7803C19.579 14.6397 19.5 14.4489 19.5 14.25V12H17.25C17.0511 12 16.8603 11.921 16.7197 11.7803C16.579 11.6397 16.5 11.4489 16.5 11.25C16.5 11.0511 16.579 10.8603 16.7197 10.7197C16.8603 10.579 17.0511 10.5 17.25 10.5H19.5V8.25C19.5 8.05109 19.579 7.86032 19.7197 7.71967C19.8603 7.57902 20.0511 7.5 20.25 7.5Z"
        fill="white"
      />
    </svg>
  );
};

export const EditIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 15.9999L11 19.9999H21V15.9999H15ZM12.06 7.1899L3 16.2499V19.9999H6.75L15.81 10.9399L12.06 7.1899ZM5.92 17.9999H5V17.0799L12.06 10.0199L12.98 10.9399L5.92 17.9999ZM18.71 8.0399C18.8027 7.94738 18.8763 7.83749 18.9264 7.71652C18.9766 7.59555 19.0024 7.46586 19.0024 7.3349C19.0024 7.20393 18.9766 7.07424 18.9264 6.95327C18.8763 6.8323 18.8027 6.72241 18.71 6.6299L16.37 4.2899C16.1825 4.10389 15.9291 3.99951 15.665 3.99951C15.4009 3.99951 15.1475 4.10389 14.96 4.2899L13.13 6.11989L16.88 9.86989L18.71 8.0399Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowDownIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z"
        fill="black"
      />
    </svg>
  );
};

export const CampaignIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 11V13H22V11H18ZM16 17.61C16.96 18.32 18.21 19.26 19.2 20C19.6 19.47 20 18.93 20.4 18.4C19.41 17.66 18.16 16.72 17.2 16C16.8 16.54 16.4 17.08 16 17.61ZM20.4 5.6C20 5.07 19.6 4.53 19.2 4C18.21 4.74 16.96 5.68 16 6.4C16.4 6.93 16.8 7.47 17.2 8C18.16 7.28 19.41 6.35 20.4 5.6ZM4 9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15H5V19H7V15H8L13 18V6L8 9H4ZM9.03 10.71L11 9.53V14.47L9.03 13.29L8.55 13H4V11H8.55L9.03 10.71ZM15.5 12C15.5 10.67 14.92 9.47 14 8.65V15.34C14.92 14.53 15.5 13.33 15.5 12Z"
        fill="white"
      />
    </svg>
  );
};

export const AddCircleIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
        fill="#afafaf"
      />
    </svg>
  );
};

export const HelpIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z"
        fill="#afafaf"
      />
    </svg>
  );
};

export const BookIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM19 11H9V9H19V11ZM15 15H9V13H15V15ZM19 7H9V5H19V7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ArrowRightIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H15.4395L12.219 8.031C12.0782 7.89017 11.9991 7.69917 11.9991 7.5C11.9991 7.30084 12.0782 7.10983 12.219 6.969C12.3598 6.82817 12.5508 6.74905 12.75 6.74905C12.9492 6.74905 13.1402 6.82817 13.281 6.969L17.781 11.469C17.8508 11.5387 17.9063 11.6214 17.9441 11.7126C17.9819 11.8037 18.0013 11.9014 18.0013 12C18.0013 12.0987 17.9819 12.1963 17.9441 12.2875C17.9063 12.3786 17.8508 12.4613 17.781 12.531L13.281 17.031C13.1402 17.1718 12.9492 17.2509 12.75 17.2509C12.5508 17.2509 12.3598 17.1718 12.219 17.031C12.0782 16.8902 11.9991 16.6992 11.9991 16.5C11.9991 16.3008 12.0782 16.1098 12.219 15.969L15.4395 12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12Z"
        fill="black"
      />
    </svg>
  );
};

export const MenuIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3.75C1.5 3.15326 1.73705 2.58097 2.15901 2.15901C2.58097 1.73705 3.15326 1.5 3.75 1.5H8.25C8.84674 1.5 9.41903 1.73705 9.84099 2.15901C10.2629 2.58097 10.5 3.15326 10.5 3.75V8.25C10.5 8.84674 10.2629 9.41903 9.84099 9.84099C9.41903 10.2629 8.84674 10.5 8.25 10.5H3.75C3.15326 10.5 2.58097 10.2629 2.15901 9.84099C1.73705 9.41903 1.5 8.84674 1.5 8.25V3.75ZM13.5 3.75C13.5 3.15326 13.7371 2.58097 14.159 2.15901C14.581 1.73705 15.1533 1.5 15.75 1.5H20.25C20.8467 1.5 21.419 1.73705 21.841 2.15901C22.2629 2.58097 22.5 3.15326 22.5 3.75V8.25C22.5 8.84674 22.2629 9.41903 21.841 9.84099C21.419 10.2629 20.8467 10.5 20.25 10.5H15.75C15.1533 10.5 14.581 10.2629 14.159 9.84099C13.7371 9.41903 13.5 8.84674 13.5 8.25V3.75ZM1.5 15.75C1.5 15.1533 1.73705 14.581 2.15901 14.159C2.58097 13.7371 3.15326 13.5 3.75 13.5H8.25C8.84674 13.5 9.41903 13.7371 9.84099 14.159C10.2629 14.581 10.5 15.1533 10.5 15.75V20.25C10.5 20.8467 10.2629 21.419 9.84099 21.841C9.41903 22.2629 8.84674 22.5 8.25 22.5H3.75C3.15326 22.5 2.58097 22.2629 2.15901 21.841C1.73705 21.419 1.5 20.8467 1.5 20.25V15.75ZM13.5 15.75C13.5 15.1533 13.7371 14.581 14.159 14.159C14.581 13.7371 15.1533 13.5 15.75 13.5H20.25C20.8467 13.5 21.419 13.7371 21.841 14.159C22.2629 14.581 22.5 15.1533 22.5 15.75V20.25C22.5 20.8467 22.2629 21.419 21.841 21.841C21.419 22.2629 20.8467 22.5 20.25 22.5H15.75C15.1533 22.5 14.581 22.2629 14.159 21.841C13.7371 21.419 13.5 20.8467 13.5 20.25V15.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ClockIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
    </svg>
  );
};
