export const questionTypes = [
  {
    text: "صفحه خوش آمد گویی",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 12a1 1 0 0 0-1-1h-7.59l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L11.41 13H19a1 1 0 0 0 1-1M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3a1 1 0 0 0-2 0v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 0 2 0V5a3 3 0 0 0-3-3"
        ></path>
      </svg>
    ),
    type: "OPENING",
  },
  {
    text: "متن با پاسخ کوتاه",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M13 15.5H3a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2m8-5H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2"
        ></path>
      </svg>
    ),
    type: "SHORT_TEXT",
  },
  {
    text: "متن با پاسخ بلند",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5"
        ></path>
      </svg>
    ),
    type: "LONG_TEXT",
  },
  {
    text: "چندگزینه ای",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          fillRule="evenodd"
        >
          <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
          <path
            fill="currentColor"
            d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 1 0-2 0v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h8a1 1 0 1 0 0-2zm15.358 3.045a1 1 0 0 0 .375-1.363a1.01 1.01 0 0 0-1.364-.375c-.353.2-.694.424-1.03.65a30 30 0 0 0-2.463 1.847c-1.642 1.366-3.614 3.29-5.239 5.718a10 10 0 0 0-1.746-1.784c-.427-.333-.902-.66-1.415-.846h-.001a1 1 0 0 0-.689 1.878c.025.01.37.15.876.545c.578.45 1.376 1.239 2.146 2.557a1 1 0 0 0 1.733-.01c1.584-2.791 3.787-5 5.614-6.52c.91-.757 1.72-1.336 2.298-1.724c.295-.199.595-.394.904-.572Z"
          ></path>
        </g>
      </svg>
    ),
    type: "MULTIPLE_CHOICE",
  },
  {
    text: "چندگزینه ای با شاخص",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m10.85 13.75l.1.8q.025.2.163.325t.337.125h1.1q.2 0 .338-.125t.162-.325l.1-.8q.2-.075.363-.175t.287-.225l.75.325q.175.075.35.025t.275-.225l.55-.95q.1-.175.063-.35t-.188-.3l-.65-.475q.05-.2.05-.4t-.05-.4l.65-.475q.15-.125.188-.3t-.063-.35l-.55-.95q-.1-.175-.275-.225t-.35.025l-.75.325q-.125-.125-.288-.225t-.362-.175l-.1-.8q-.025-.2-.162-.325T12.55 7h-1.1q-.2 0-.337.125t-.163.325l-.1.8q-.2.075-.362.175t-.288.225l-.75-.325Q9.275 8.25 9.1 8.3t-.275.225l-.55.95q-.1.175-.062.35t.187.3l.65.475Q9 10.8 9 11t.05.4l-.65.475q-.15.125-.187.3t.062.35l.55.95q.1.175.275.225t.35-.025l.75-.325q.125.125.288.225t.362.175M12 12.5q-.625 0-1.062-.437T10.5 11t.438-1.062T12 9.5t1.063.438T13.5 11t-.437 1.063T12 12.5m-6 5.2q-1.425-1.3-2.212-3.037T3 11q0-3.75 2.625-6.375T12 2q3.125 0 5.538 1.838t3.137 4.787l1.3 5.125q.125.475-.175.863T21 15h-2v3q0 .825-.587 1.413T17 20h-2v1q0 .425-.288.713T14 22t-.712-.288T13 21v-2q0-.425.288-.712T14 18h3v-4q0-.425.288-.712T18 13h1.7l-.95-3.875q-.575-2.275-2.45-3.7T12 4Q9.1 4 7.05 6.025T5 10.95q0 1.5.613 2.85t1.737 2.4l.65.6V21q0 .425-.288.713T7 22t-.712-.288T6 21zm6.35-4.7"
        ></path>
      </svg>
    ),
    type: "PSYCHOLOGY",
  },
  {
    text: "صفحه خروج",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M320 176v-40a40 40 0 0 0-40-40H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h192a40 40 0 0 0 40-40v-40m64-160l80 80l-80 80m-193-80h273"
        ></path>
      </svg>
    ),
    type: "ENDING",
  },
];